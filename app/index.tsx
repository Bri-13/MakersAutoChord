import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#0d0d0d" />
      <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" />
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
          <Ionicons name="chevron-forward" size={20} color="#c0392b" />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {songData.map((song, index) => (
            <SongCard key={index} song={song} />
          ))}
        </ScrollView>

        {/* Scales Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Scales</Text>
          <Ionicons name="chevron-forward" size={20} color="#c0392b" />
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
        <NavIcon icon="home" active={true} />
        <NavIcon icon="compass" />
        <NavIcon icon="musical-notes" onPress={() => router.push("/songs")} />
        <NavIcon icon="person" />
      </View>
    </View>
    </SafeAreaView>
  );
}

/* ---------- Components ---------- */

type FeatureButtonProps = { icon: string; label: string; onPress?: () => void };
const FeatureButton = ({ icon, label, onPress }: FeatureButtonProps) => (
  <TouchableOpacity style={styles.featureButton} onPress={onPress}>
    <Ionicons name={icon as any} size={18} color="#fff" />
    <Text style={styles.featureButtonText}>{label}</Text>
  </TouchableOpacity>
);

type SongData = { title: string; artist: string; cover: any; bpm: number };
const SongCard = ({ song }: { song: SongData }) => (
  <View style={styles.songCard}>
    <Image source={song.cover} style={styles.cover} />
    <Text style={styles.bpm}>BPM: {song.bpm}</Text>
    <Text style={styles.artist}>{song.artist}</Text>
    <Text style={styles.songTitle}>{song.title}</Text>
  </View>
);

type NavIconProps = { icon: string; onPress?: () => void; active?: boolean };
const NavIcon = ({ icon, onPress, active = false }: NavIconProps) => (
  <TouchableOpacity onPress={onPress}>
    <Ionicons name={icon as any} size={28} color={active ? "#c0392b" : "#888"} />
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

const ACCENT = "#c0392b";
const BG = "#0d0d0d";
const CARD_BG = "#1a1a1a";
const SURFACE = "#1e1e1e";
const TEXT_PRIMARY = "#f0f0f0";
const TEXT_SECONDARY = "#888";
const BORDER = "#2a2a2a";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  safeArea: { flex: 1, backgroundColor: BG },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: SURFACE,
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 12,
    marginTop: 15,
    borderWidth: 1,
    borderColor: BORDER,
  },
  searchInput: { marginLeft: 10, fontSize: 16, color: TEXT_PRIMARY, flex: 1 },

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
    borderWidth: 1.5,
    borderColor: ACCENT,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  featureButtonText: {
    color: TEXT_PRIMARY,
    fontSize: 14,
    fontWeight: "500",
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
    color: "#ddd",
    fontSize: 14,
    marginTop: 4,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 30,
    marginHorizontal: 20,
  },
  sectionTitle: { fontSize: 20, fontWeight: "600", color: TEXT_PRIMARY },

  songCard: {
    width: 170,
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: CARD_BG,
    borderRadius: 12,
    overflow: "hidden",
  },
  cover: {
    width: "100%",
    height: 170,
  },
  bpm: { marginTop: 8, marginHorizontal: 10, color: TEXT_SECONDARY, fontSize: 12 },
  artist: { marginTop: 4, marginHorizontal: 10, fontWeight: "500", color: "#aaa" },
  songTitle: { fontSize: 15, fontWeight: "600", color: TEXT_PRIMARY, marginHorizontal: 10, marginBottom: 10 },

  scaleBox: {
    width: 150,
    height: 120,
    backgroundColor: CARD_BG,
    borderRadius: 12,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: BORDER,
  },
  scaleText: { fontSize: 16, fontWeight: "600", color: TEXT_PRIMARY },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#111",
    borderTopWidth: 1,
    borderColor: "#222",
  },
});