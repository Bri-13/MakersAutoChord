import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/* -------------------------
   CHORD REGEX
------------------------- */

const CHORD_LINE_REGEX =
  /^(?:\s*[A-G](?:#|b)?(?:m|maj7|maj|min|dim|aug|sus\d*)?(?:\/[A-G](?:#|b)?)?\s*)+$/;

const SINGLE_CHORD_REGEX =
  /^[A-G](?:#|b)?(?:m|maj7|maj|min|dim|aug|sus\d*)?(?:\/[A-G](?:#|b)?)?$/;

export default function RiptideScreen() {
  const router = useRouter();

  const [bpm, setBpm] = useState("110");
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChordIndex, setActiveChordIndex] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);

  const swing = useRef(new Animated.Value(0)).current;

  const scrollRef = useRef<ScrollView>(null);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);
  const chordTimer = useRef<NodeJS.Timeout | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth - 40;
  const barWidth = 60;

  /* -------------------------
     AUTO SCROLL
  ------------------------- */

  const FAST_SCROLL_INTERVAL = 50; // before countdown ends
  const SLOW_SCROLL_INTERVAL = 120; // after countdown

  const startAutoScroll = (intervalMs: number) => {
    stopAutoScroll();
    autoScrollInterval.current = setInterval(() => {
      setScrollOffset((prev) => {
        const next = prev + 1;
        scrollRef.current?.scrollTo({ y: next, animated: false });
        return next;
      });
    }, intervalMs);
  };

  const stopAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  };

  /* -------------------------
     METRONOME + CHORD TIMER
  ------------------------- */

  const CHORD_BEATS = 4;

  const startChordHighlighting = () => {
    const beatDuration = (60 / parseFloat(bpm)) * 1000;
    const chordDuration = beatDuration * CHORD_BEATS;

    chordTimer.current = setInterval(() => {
      setActiveChordIndex((prev) =>
        prev + 1 < allChords.length ? prev + 1 : prev
      );
    }, chordDuration);
  };

  const stopChordHighlighting = () => {
    if (chordTimer.current) {
      clearInterval(chordTimer.current);
      chordTimer.current = null;
    }
  };

  const startMetronome = () => {
    const beatDuration = (60 / parseFloat(bpm)) * 1000;
    setIsPlaying(true);

    Animated.loop(
      Animated.sequence([
        Animated.timing(swing, {
          toValue: 1,
          duration: beatDuration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(swing, {
          toValue: 0,
          duration: beatDuration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    setActiveChordIndex(0);

    // ---- COUNTDOWN ----
    const countdownDelay = 10000;
    const countdownDuration = 3000;
    const totalDelay = countdownDelay + countdownDuration;

    const countdownTimeout = setTimeout(() => {
      setCountdown(3);

      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null) return null;
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }, countdownDelay);

    // start chord switching + slow scroll AFTER countdown finishes
    setTimeout(() => {
      setCountdown(null);
      startChordHighlighting();
      startAutoScroll(SLOW_SCROLL_INTERVAL);
    }, totalDelay);

    scrollRef.current?.scrollTo({ y: 0, animated: true });
    setScrollOffset(0);

    // start FAST auto-scroll initially
    setTimeout(() => startAutoScroll(FAST_SCROLL_INTERVAL), 300);
  };

  const stopMetronome = () => {
    setIsPlaying(false);
    swing.stopAnimation();
    swing.setValue(0);
    stopAutoScroll();
    stopChordHighlighting();
    setCountdown(null);
  };

  const toggleMetronome = () => {
    isPlaying ? stopMetronome() : startMetronome();
  };

  /* -------------------------
     LYRICS STRING
  ------------------------- */

  const lyrics = `[Intro]
Am G C C
Am G C C

[Verse 1]
Am              G                C
I was scared of dentists and the dark
Am              G                C
I was scared of pretty girls and starting conversations
    Am         G               C
Oh, all my friends are turning green
           Am          G                 C
You're the magician's assistant in their dreams

[Pre-chorus]
  Am   G    C
A-ooh, ooh, ooh
  Am    G            C
A-oh, ohoh, and they come unstuck

[Chorus]
Am    G                   C
Lady, running down to the riptide, taken away
       Am         G               C
To the dark side, I wanna be your left hand man
  Am       G                        C
I love you when you're singing that song, and I got a lump
      Am             G                       C
In my throat, 'cause you're gonna sing the words wrong

[Verse 2]
Am                G                   C
There's this movie that I think you'll like
     Am             G                C
This guy decides to quit his job and heads to New York City
     Am       G            C
This cowboy's running from himself
    Am                G                C
And she's been living on the highest shelf

[Pre-chorus]
  Am   G    C
A-ooh, ooh, ooh
  Am    G            C
A-oh, ohoh, and they come unstuck

[Chorus]
Am    G                   C
Lady, running down to the riptide, taken away
       Am         G               C
To the dark side, I wanna be your left hand man
  Am       G                        C
I love you when you're singing that song, and I got a lump
      Am             G                          C
In my throat, 'cause you're gonna sing the words wrong

[Interlude]
  (C)
e|-------3---------|
B|-3h5-5-------5---|
G|-----------5-----|
D|-----------------| x4
A|-----------------|
E|-----------------|

[Bridge]
Am                         G
I just wanna, I just wanna know
C                                  Fmaj7
If you're gonna, if you're gonna stay
Am                             G
I just gotta, I just gotta know
C                                Fmaj7
I can't have it, I can't have it any other way

[Pre-chorus] (strum once and hold)
  Am          G                C
I swear she's destined for the screen
Am               G                 C
Closest thing to Michelle Pfeiffer that you've ever seen, oh

[Chorus]
Am    G                   C
Lady, running down to the riptide, taken away
       Am         G               C
To the dark side, I wanna be your left hand man
  Am       G                        C
I love you when you're singing that song, and I got a lump
      Am             G                       C
In my throat, 'cause you're gonna sing the words wrong`;

  /* -------------------------
     FLATTEN ALL CHORDS
  ------------------------- */

  const allChords = lyrics
    .split("\n")
    .filter((line) => CHORD_LINE_REGEX.test(line))
    .flatMap((line) =>
      line
        .split(/\s+/)
        .filter((token) => SINGLE_CHORD_REGEX.test(token))
    );

  let chordCounter = 0;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={{ flex: 1 }}>
        <ScrollView ref={scrollRef} contentContainerStyle={{ paddingBottom: 180 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20, marginLeft: 15 }}>
            <Text style={{ fontSize: 18 }}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Riptide</Text>
          <Text style={styles.subtitle}>Vance Joy</Text>

          <View style={styles.metroBox}>
            <Text style={styles.metroLabel}>Metronome</Text>

            <View style={[styles.barContainer, { width: containerWidth }]}>
              <Animated.View
                style={[
                  styles.bar,
                  {
                    transform: [
                      {
                        translateX: swing.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, containerWidth - barWidth],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>

            <TextInput
              value={bpm}
              onChangeText={setBpm}
              keyboardType="numeric"
              style={styles.bpmInput}
              placeholder="Enter BPM"
            />
          </View>

          <Text style={styles.sectionTitle}>All Chords</Text>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("@/assets/images/riptide-chords.png")}
              style={{ width: 320, height: 100 }}
            />
          </View>

          <Text style={styles.sectionTitle}>Strumming Patterns</Text>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("@/assets/images/riptide-strumming.png")}
              style={{ width: 370, height: 180 }}
            />
          </View>

          <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
            {lyrics.split("\n").map((line, index) => {
              const isChordLine = CHORD_LINE_REGEX.test(line);
              const tokens = line.split(/(\s+)/);

              return (
                <Text key={index} style={styles.lyricsBlock}>
                  {isChordLine
                    ? tokens.map((token, i) => {
                        if (SINGLE_CHORD_REGEX.test(token)) {
                          const isActive = chordCounter === activeChordIndex;
                          chordCounter++;

                          return (
                            <Text
                              key={i}
                              style={[
                                styles.chord,
                                isActive && styles.activeChord,
                              ]}
                            >
                              {token}
                            </Text>
                          );
                        }
                        return token;
                      })
                    : line || " "}
                </Text>
              );
            })}
          </ScrollView>
        </ScrollView>

        <TouchableOpacity style={styles.startButton} onPress={toggleMetronome}>
          <Text style={styles.startText}>{isPlaying ? "Stop" : "Start"}</Text>
        </TouchableOpacity>

        {countdown !== null && (
          <View style={styles.countdownOverlay}>
            <Text style={styles.countdownText}>{countdown}</Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    marginBottom: 20,
  },
  title: { fontSize: 28, fontWeight: "700", textAlign: "center", marginTop: 10 },
  subtitle: { fontSize: 16, textAlign: "center", color: "#777", marginBottom: 20 },
  metroBox: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    marginBottom: 20,
  },
  metroLabel: { fontSize: 20, fontWeight: "600", marginBottom: 20 },
  barContainer: {
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 20,
  },
  bar: {
    width: 60,
    height: 20,
    backgroundColor: "#000",
    borderRadius: 10,
  },
  bpmInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: "40%",
    textAlign: "center",
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 25,
    marginLeft: 20,
    marginBottom: 5,
  },
  lyricsBlock: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 10,
    lineHeight: 18,
  },
  chord: { fontWeight: "700" },
  activeChord: {
    backgroundColor: "#FF9800",
    paddingHorizontal: 2,
    borderRadius: 4,
  },
  startButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 16,
    backgroundColor: "black",
    borderRadius: 10,
  },
  startText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  countdownOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  countdownText: {
    fontSize: 120,
    fontWeight: "900",
    color: "#000",
  },
});
