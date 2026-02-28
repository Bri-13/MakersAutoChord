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

export default function SmokeScreen() {
  const router = useRouter();

  // States
  const [bpm, setBpm] = useState("114");
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  // Animation
  const swing = useRef(new Animated.Value(0)).current;

  // Images array
  const images = [
    require("@/assets/images/smoke1.png"),
    require("@/assets/images/smoke2.png"),
    require("@/assets/images/smoke3.png"),
    require("@/assets/images/smoke4.png"),
    require("@/assets/images/smoke5.png"),
    require("@/assets/images/smoke6.png"),
    require("@/assets/images/smoke7.png"),
    require("@/assets/images/smoke8.png"),
    require("@/assets/images/smoke9.png"),
    require("@/assets/images/smoke10.png"),
    require("@/assets/images/smoke11.png"),
    require("@/assets/images/smoke12.png"),
  ];

  // ⏱️ Per-image durations
  const imageDurations = [
    263, // 1. G5   – eighth
    263, // 2. Bb5  – eighth
    526, // 3. C5   – quarter

    263, // 4. G5   – eighth
    263, // 5. Bb5  – eighth
    263, // 6. Db5  – eighth
    526, // 7. C5   – quarter

    263, // 8. G5   – eighth
    263, // 9. Bb5  – eighth
    526, // 10. C5  – quarter
    263, // 11. Bb5 – eighth
    526, // 12. G5  – quarter
  ];

  // Screen dimensions
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth - 40;
  const barWidth = 60;

  // Image timeout ref
  const imageTimeout = useRef(null);

  // -------------------------
  // IMAGE ROTATION (FIXED)
  // -------------------------
  const startImageRotation = () => {
    // Always begin at image 0
    setImageIndex(0);

    const rotate = () => {
      setImageIndex((prev) => {
        const nextIndex = (prev + 1) % images.length;
        const nextDuration = imageDurations[nextIndex];

        console.log(
          `Switching to image ${nextIndex + 1} — duration: ${nextDuration}ms`
        );

        // Schedule next switch
        imageTimeout.current = setTimeout(rotate, nextDuration);

        return nextIndex;
      });
    };

    // 👉 Start on image #1 WITHOUT instantly switching
    if (!imageTimeout.current) {
      console.log(
        `Starting on image 1 — duration: ${imageDurations[0]}ms`
      );
      imageTimeout.current = setTimeout(rotate, imageDurations[0]);
    }
  };

  const stopImageRotation = () => {
    if (imageTimeout.current) {
      clearTimeout(imageTimeout.current);
      imageTimeout.current = null;
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

    startImageRotation();
  };

  const stopMetronome = () => {
    setIsPlaying(false);
    swing.stopAnimation();
    swing.setValue(0);
    stopImageRotation();
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
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginTop: 20, marginLeft: 15 }}
        >
          <Text style={{ fontSize: 18 }}>←</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Smoke on the Water</Text>
        <Text style={styles.subtitle}>Deep Purple</Text>

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

        {/* Lyrics */}
        <Text style={styles.sectionTitle}>Lyrics</Text>
        <View style={styles.lyricsBox}>
          <Text style={styles.lyricLine}>[Intro/Main Riff]</Text>
        </View>

        {/* Image Rotator */}
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <Image
            source={images[imageIndex]}
            style={{ width: 320, height: 180, resizeMode: "contain" }}
          />
        </View>
      </ScrollView>

      {/* Start/Stop */}
      <TouchableOpacity style={styles.startButton} onPress={toggleMetronome}>
        <Text style={styles.startText}>{isPlaying ? "Stop" : "Start"}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

// -----------------------------
// STYLES
// -----------------------------
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
  bar: { width: 60, height: 20, backgroundColor: "#000", borderRadius: 10 },
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
  sectionTitle: { fontSize: 22, fontWeight: "700", marginTop: 25, marginLeft: 20 },
  lyricsBox: { marginHorizontal: 20, marginTop: 10 },
  lyricLine: { fontSize: 16, marginTop: 6, lineHeight: 24 },
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
});
