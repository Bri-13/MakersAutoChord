import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SongsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.header}>Songs</Text>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {["All", "Pop", "Country", "Blues", "Jazz"].map((cat, i) => (
            <View key={i} style={[styles.category, i === 0 && styles.categoryActive]}>
              <Text style={[styles.categoryText, i === 0 && styles.categoryTextActive]}>
                {cat}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Song list */}
        {songs.map((song, i) => (
          <View key={i} style={styles.songRow}>
            <Image source={song.cover} style={styles.cover} />
            <View style={{ flex: 1 }}>
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.artist}>{song.artist}</Text>
            </View>

            <TouchableOpacity
              style={styles.playButton}
              onPress={() => {
                if (song.title === "Dreams") {
                  router.push("/songs/dreams");
                }
                if (song.title === "Smoke on the Water") {
                  router.push("/songs/smoke-on-the-water");
                }
              }}
            >
              <Text style={styles.playText}>Play</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ⭐ UPDATED SONG LIST
const songs = [
  {
    title: "Hey There Delilah",
    artist: "Plain White T's",
    cover: require("@/assets/images/hey_there_song_cover.jpg"),
  },
  {
    title: "Counting Stars",
    artist: "OneRepublic",
    cover: require("@/assets/images/counting-stars-cover.jpg"),
  },
  {
    title: "Stitches",
    artist: "Shawn Mendes",
    cover: require("@/assets/images/stitches-cover.jpg"),
  },
  {
    title: "Little Things",
    artist: "One Direction",
    cover: require("@/assets/images/take-me-home.jpg"),
  },
  {
    title: "Riptide",
    artist: "Vance Joy",
    cover: require("@/assets/images/riptide-cover.jpg"),
  },
  {
    title: "Lover Girl",
    artist: "Laufey",
    cover: require("@/assets/images/laufey-cover.jpg"),
  },
  {
    title: "Water Fountain",
    artist: "Alec Benjamin",
    cover: require("@/assets/images/water-fountain-cover.jpg"),
  },
  {
    title: "Dreams",
    artist: "Fleetwood Mac",
    cover: require("@/assets/images/dreams.jpg"),
  },

  // ⭐ NEW SONG ADDED HERE
  {
    title: "Smoke on the Water",
    artist: "Deep Purple",
    cover: require("@/assets/images/smoke-on-the-water.jpg"),
  },

  {
    title: "Trampoline",
    artist: "SHAED & Zayn",
    cover: require("@/assets/images/trampoline-cover.jpg"),
  },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: { marginTop: 20, marginLeft: 20, fontSize: 28, fontWeight: "700" },

  categories: { marginTop: 20, paddingHorizontal: 20 },
  category: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F2F2F2",
    marginRight: 10,
  },
  categoryActive: { backgroundColor: "#000" },
  categoryText: { color: "#333", fontWeight: "500" },
  categoryTextActive: { color: "#fff" },

  songRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  cover: { width: 55, height: 55, borderRadius: 6, marginRight: 15 },
  songTitle: { fontSize: 16, fontWeight: "600" },
  artist: { fontSize: 14, color: "#777" },

  playButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#000",
    borderRadius: 10,
  },
  playText: { color: "#fff", fontWeight: "600" },
});
