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

export default function DreamsScreen() {
  const router = useRouter();

  // States
  const [bpm, setBpm] = useState("120");
  const [isPlaying, setIsPlaying] = useState(false);

  // Animation
  const swing = useRef(new Animated.Value(0)).current;

  // Auto-scroll
  const scrollRef = useRef(null);
  const autoScrollInterval = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth - 40;
  const barWidth = 60;

  // -------------------------
  // AUTO-SCROLL FUNCTIONS
  // -------------------------
  const startAutoScroll = () => {
    if (!scrollRef.current) return;

    const speed = 20; // px per second

    autoScrollInterval.current = setInterval(() => {
      setScrollOffset((prev) => {
        const newOffset = prev + 1;

        scrollRef.current.scrollTo({
          y: newOffset,
          animated: false,
        });

        return newOffset;
      });
    }, 1000 / speed);
  };

  const stopAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  };

  // -------------------------
  // METRONOME FUNCTIONS
  // -------------------------
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

    // Scroll to TOP instead of lyrics
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }

    // Start auto scroll from the top
    setTimeout(() => {
      setScrollOffset(0);
      startAutoScroll();
    }, 300);
  };

  const stopMetronome = () => {
    setIsPlaying(false);

    swing.stopAnimation();
    swing.setValue(0);

    stopAutoScroll();
  };

  const toggleMetronome = () => {
    isPlaying ? stopMetronome() : startMetronome();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back */}
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20, marginLeft: 15 }}>
          <Text style={{ fontSize: 18 }}>←</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Dreams</Text>
        <Text style={styles.subtitle}>Fleetwood Mac</Text>

        {/* Metronome */}
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

        {/* All Chords */}
        <Text style={[styles.sectionTitle, { marginTop: 5, marginBottom: 5 }]}>
          All Chords
        </Text>
        <View style={{ alignItems: "center", marginVertical: 0 }}>
          <Image
            source={require("@/assets/images/dreams-chords.png")}
            style={{ width: 320, height: 100, resizeMode: "contain" }}
          />
        </View>

        {/* Strumming */}
        <Text style={[styles.sectionTitle, { marginTop: 12, marginBottom: 5 }]}>
          Strumming Patterns
        </Text>
        <View style={{ alignItems: "center", marginVertical: 0 }}>
          <Image
            source={require("@/assets/images/dreams-strumming.png")}
            style={{ width: 320, height: 120, resizeMode: "contain" }}
          />
        </View>

        {/* Lyrics */}
        <Text style={styles.sectionTitle}>Lyrics</Text>

        <View style={styles.lyricsBox}>
            <Text style={styles.lyricLine}><Text style={styles.chordInline}>[Intro]</Text></Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>F</Text>     <Text style={styles.chordInline}>G</Text>      <Text style={styles.chordInline}>F</Text>      <Text style={styles.chordInline}>G</Text>
          </Text>

          <Text style={styles.lyricLine}><Text style={styles.chordInline}>[Verse]</Text></Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>F</Text>            <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>Now here you go again</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>F</Text>               <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>You say you want your freedom</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>F</Text>            <Text style={styles.chordInline}>G</Text>                 <Text style={styles.chordInline}>F</Text>        <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>Well, who am I to keep you down?</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>F</Text>             <Text style={styles.chordInline}>G</Text>                 <Text style={styles.chordInline}>F</Text>                 <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>It's only right that you should play the way you feel it</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>F</Text>       <Text style={styles.chordInline}>G</Text>             <Text style={styles.chordInline}>F</Text>
          </Text>
          <Text style={styles.lyricLine}>But listen carefully to the sound</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>G</Text>                  <Text style={styles.chordInline}>F</Text>                    <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>Of your loneliness, like a heartbeat, drives you mad</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>F</Text>           <Text style={styles.chordInline}>G</Text>                    <Text style={styles.chordInline}>F</Text>      <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>In the stillness of remembering what you had</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>F</Text>           <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>And what you lost</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>F</Text>           <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>And what you had</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>F</Text>           <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>And what you lost</Text>

          <Text style={styles.lyricLine}><Text style={styles.chordInline}>[Chorus]</Text></Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>Fmaj7</Text>          <Text style={styles.chordInline}>G6</Text>               <Text style={styles.chordInline}>Fmaj7</Text>          <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>Oh  thunder only happens when it's raining</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>Fmaj7</Text>         <Text style={styles.chordInline}>G6</Text>                    <Text style={styles.chordInline}>Fmaj7</Text>          <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>Players only love you when they're playing</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>Fmaj7</Text>             <Text style={styles.chordInline}>G6</Text>               <Text style={styles.chordInline}>Fmaj7</Text>      <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>Say women they will come and they will go</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>Fmaj7</Text>             <Text style={styles.chordInline}>G6</Text>                  <Text style={styles.chordInline}>Fmaj7</Text>        <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>When the rain washes you clean, you'll know</Text>
          <Text style={styles.lyricLine}><Text style={styles.chordInline}>Fmaj7</Text>You'll know</Text>

          <Text style={styles.lyricLine}><Text style={styles.chordInline}>[Instrumental Break]</Text></Text>
          <Text style={styles.lyricLine}>
            |<Text style={styles.chordInline}>Fmaj7</Text>| <Text style={styles.chordInline}>G</Text>    | <Text style={styles.chordInline}>G</Text>    | <Text style={styles.chordInline}>F</Text>    |
          </Text>
          <Text style={styles.lyricLine}>
            | <Text style={styles.chordInline}>Am</Text>    | <Text style={styles.chordInline}>G</Text>    | <Text style={styles.chordInline}>G</Text>    | <Text style={styles.chordInline}>F</Text>    |
          </Text>

          <Text style={styles.lyricLine}><Text style={styles.chordInline}>[Verse]</Text></Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>F</Text>          <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>Now here I go again</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>F</Text>               <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>I see your crystal visions</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>F</Text>          <Text style={styles.chordInline}>G</Text>             <Text style={styles.chordInline}>F</Text>          <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>I keep my visions to myself</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>F</Text>           <Text style={styles.chordInline}>G</Text>                <Text style={styles.chordInline}>F</Text>                 <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>It's only me who wants to wrap around you dreams and,</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>F</Text>             <Text style={styles.chordInline}>G</Text>                    <Text style={styles.chordInline}>F</Text>
          </Text>
          <Text style={styles.lyricLine}>Have you any dreams you'd like to sell</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>G</Text>               <Text style={styles.chordInline}>F</Text>                    <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>Dreams of loneliness like a heartbeat drives you mad</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>F</Text>             <Text style={styles.chordInline}>G</Text>                    <Text style={styles.chordInline}>F</Text>           <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>In the stillness of remembering what you had</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>F</Text>           <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>And what you lost</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>F</Text>           <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>And what you had</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>F</Text>           <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>Ooh, and what you lost</Text>

          <Text style={styles.lyricLine}><Text style={styles.chordInline}>[Chorus]</Text></Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>Fmaj7</Text>           <Text style={styles.chordInline}>G6</Text>               <Text style={styles.chordInline}>Fmaj7</Text>          <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>Oh,  thunder only happens when it's raining</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>Fmaj7</Text>         <Text style={styles.chordInline}>G6</Text>                     <Text style={styles.chordInline}>Fmaj7</Text>          <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>Players only love you when they're playing</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>Fmaj7</Text>             <Text style={styles.chordInline}>G6</Text>               <Text style={styles.chordInline}>Fmaj7</Text>       <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>Say, women, they will come and they will go</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>Fmaj7</Text>             <Text style={styles.chordInline}>G6</Text>                  <Text style={styles.chordInline}>Fmaj7</Text>         <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>When the rain washes you clean, you'll know</Text>
          <Text style={styles.lyricLine}><Text style={styles.chordInline}>Fmaj7</Text>You'll know</Text>

          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>Fmaj7</Text>            <Text style={styles.chordInline}>G6</Text>             <Text style={styles.chordInline}>Fmaj7</Text>          <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>Oh,  thunder only happens when it's raining</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>Fmaj7</Text>         <Text style={styles.chordInline}>G6</Text>                     <Text style={styles.chordInline}>Fmaj7</Text>          <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>Players only love you when they're playing</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>Fmaj7</Text>             <Text style={styles.chordInline}>G6</Text>               <Text style={styles.chordInline}>Fmaj7</Text>       <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>Say, women, they will come and they will go</Text>
          <Text style={styles.lyricLine}>
            <Text style={styles.chordInline}>Fmaj7</Text>             <Text style={styles.chordInline}>G6</Text>                  <Text style={styles.chordInline}>Fmaj7</Text>         <Text style={styles.chordInline}>G</Text>
          </Text>
          <Text style={styles.lyricLine}>When the rain washes you clean, you'll know</Text>
          <Text style={styles.lyricLine}><Text style={styles.chordInline}>Fmaj7</Text>You'll know</Text>
          <Text style={styles.lyricLine}><Text style={styles.chordInline}>Fmaj7</Text> <Text style={styles.chordInline}>G</Text>You will know</Text>
          <Text style={styles.lyricLine}><Text style={styles.chordInline}>Fmaj7</Text>Ahh, you'll know</Text>
        </View>
      </ScrollView>

      {/* Bottom Start/Stop Button */}
      <TouchableOpacity style={styles.startButton} onPress={toggleMetronome}>
        <Text style={styles.startText}>{isPlaying ? "Stop" : "Start"}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

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
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 25,
    marginLeft: 20,
  },

  lyricsBox: { marginHorizontal: 20, marginTop: 10 },
  lyricLine: { fontSize: 16, marginTop: 6, lineHeight: 24 },
  chordInline: { fontWeight: "bold", color: "#000" },

  startButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 16,
    backgroundColor: "black",
    borderRadius: 10,
  },
  startText: { textAlign: "center", color: "white", fontSize: 20, fontWeight: "600" },
});
