import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function DMajor() {
  const [bpm, setBpm] = useState("120");
  const [isPlaying, setIsPlaying] = useState(false);
  const swing = useRef(new Animated.Value(0)).current;

  const [containerWidth, setContainerWidth] = useState(0);
  const barWidth = 60;

  // ----------------------------------------
  // 🔹 Load all 8 images into an array
  // ----------------------------------------
  const images = [
    require("@/assets/images/d-major-1.png"),
    require("@/assets/images/d-major-2.png"),
    require("@/assets/images/d-major-3.png"),
    require("@/assets/images/d-major-4.png"),
    require("@/assets/images/d-major-5.png"),
    require("@/assets/images/d-major-6.png"),
    require("@/assets/images/d-major-7.png"),
    require("@/assets/images/d-major-8.png"),
  ];

  // 🔹 Track which image is currently shown
  const [imageIndex, setImageIndex] = useState(0);

  // 🔹 Cycle through all 8 images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);

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
  };

  const stopMetronome = () => {
    setIsPlaying(false);
    swing.stopAnimation();
    swing.setValue(0);
  };

  const toggleMetronome = () => {
    isPlaying ? stopMetronome() : startMetronome();
  };

  const onContainerLayout = (e) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      <Text style={styles.title}>D Major Scale</Text>

      <Text style={styles.notesLabel}>
        Notes: D – E – F# – G – A – B – C# – D
      </Text>

      {/* 🔹 This image automatically switches every 2 seconds */}
      <Image
        source={images[imageIndex]}
        style={styles.image}
        resizeMode="contain"
      />

      {/* METRONOME */}
      <View style={styles.metroWrapper}>
        <Text style={styles.metroLabel}>Metronome</Text>

        <View style={styles.track} onLayout={onContainerLayout}>
          {containerWidth > 0 && (
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
          )}
        </View>

        <TextInput
          value={bpm}
          onChangeText={setBpm}
          keyboardType="numeric"
          style={styles.bpmInput}
          placeholder="Enter BPM"
        />

        <TouchableOpacity style={styles.startButton} onPress={toggleMetronome}>
          <Text style={styles.startText}>{isPlaying ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginVertical: 10,
    textAlign: "center",
  },
  notesLabel: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20,
    color: "#444",
    textAlign: "center",
  },
  image: {
    width: "170%",
    height: undefined,
    aspectRatio: 3.2,
    marginBottom: 30,
  },
  metroWrapper: {
    width: "90%",
    alignItems: "center",
    marginTop: 20,
  },
  metroLabel: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
  },
  track: {
    height: 20,
    width: "100%",
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 10,
    width: "40%",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 15,
  },
  startButton: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    backgroundColor: "black",
    borderRadius: 10,
  },
  startText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
});
