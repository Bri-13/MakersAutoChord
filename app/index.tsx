import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const router = useRouter();
  const beachImage = require("@/assets/images/beach.jpg");

  const majorScales = [
    "C Major",
    "G Major",
    "D Major",
    "A Major",
    "E Major",
    "B Major",
    "F# Major",
    "F Major",
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#777" />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <FeatureButton icon="heart-outline" label="Favorites" />
          <FeatureButton icon="time-outline" label="History" />
          <FeatureButton
            icon="list-outline"
            label="All Songs"
            onPress={() => router.push("/songs")}
          />
        </View>

        {/* ✅ FEATURED CARD (FULLY CLICKABLE) */}
        <TouchableOpacity
          style={styles.featuredCard}
          activeOpacity={0.85}
          onPress={() => router.push("/songs/riptide")}
        >
          <Image source={beachImage} style={styles.featuredImage} />

          <View style={styles.featuredTextContainer}>
            <Text style={styles.featuredTitle}>Riptide</Text>
            <Text style={styles.featuredArtist}>by Vance Joy</Text>
          </View>
        </TouchableOpacity>

        {/* Songs Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Songs</Text>
          <Ionicons name="chevron-forward" size={20} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {songData.map((song, index) => (
            <SongCard key={index} song={song} />
          ))}
        </ScrollView>

        {/* Scales Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Scales</Text>
          <Ionicons name="chevron-forward" size={20} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {majorScales.map((scale, index) => {
            const isDMajor = scale === "D Major";

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={isDMajor ? 0.7 : 1}
                onPress={() => {
                  if (isDMajor) router.push("/scales/d-major");
                }}
                style={styles.scaleBox}
              >
                <Text style={styles.scaleText}>{scale}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <NavIcon icon="home" />
        <NavIcon icon="compass" />
        <NavIcon icon="musical-notes" onPress={() => router.push("/songs")} />
        <NavIcon icon="person" />
      </View>
    </View>
  );
}

/* ---------- Components ---------- */

const FeatureButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.featureButton} onPress={onPress}>
    <Ionicons name={icon} size={18} />
    <Text>{label}</Text>
  </TouchableOpacity>
);

const SongCard = ({ song }) => (
  <View style={styles.songCard}>
    <Image source={song.cover} style={styles.cover} />
    <Text style={styles.bpm}>BPM: {song.bpm}</Text>
    <Text style={styles.artist}>{song.artist}</Text>
    <Text style={styles.songTitle}>{song.title}</Text>
  </View>
);

const NavIcon = ({ icon, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Ionicons name={icon} size={28} />
  </TouchableOpacity>
);

/* ---------- Data ---------- */

const songData = [
  {
    title: "Hey There Delilah",
    artist: "Plain White T's",
    cover: require("@/assets/images/hey_there_song_cover.jpg"),
    bpm: 104,
  },
  {
    title: "Counting Stars",
    artist: "OneRepublic",
    cover: require("@/assets/images/counting-stars-cover.jpg"),
    bpm: 128,
  },
  {
    title: "Stitches",
    artist: "Shawn Mendes",
    cover: require("@/assets/images/stitches-cover.jpg"),
    bpm: 150,
  },
];

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 12,
    marginTop: 15,
  },
  searchInput: { marginLeft: 10, fontSize: 16 },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 15,
  },

  featureButton: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  featuredCard: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  featuredImage: {
    width: "100%",
    height: 170,
  },
  featuredTextContainer: {
    position: "absolute",
    bottom: 12,
    left: 12,
  },
  featuredTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  featuredArtist: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginHorizontal: 20,
  },
  sectionTitle: { fontSize: 20, fontWeight: "600" },

  songCard: {
    width: 170,
    marginLeft: 20,
    marginTop: 10,
  },
  cover: {
    width: "100%",
    height: 170,
    borderRadius: 12,
  },
  bpm: { marginTop: 8, color: "#777", fontSize: 12 },
  artist: { marginTop: 4, fontWeight: "500" },
  songTitle: { fontSize: 15, fontWeight: "600" },

  scaleBox: {
    width: 150,
    height: 120,
    backgroundColor: "#F3F3F3",
    borderRadius: 12,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  scaleText: { fontSize: 16, fontWeight: "600" },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
});
