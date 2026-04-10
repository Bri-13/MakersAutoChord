# AutoChord 🚀

AutoChord is a mobile application built with **React Native using Expo** that helps users learn chord progressions and existing songs. The app is designed to make learning guitar easier by providing quick access to chords, progressions, and songs in an interactive interface.

---

## Features

- Generate chord progressions automatically  
- Explore different songs  
- UI built with React Native (Expo)  
- Fast and responsive interface  
- Useful for musicians and beginners  

---

## Tech Stack

- React Native
- JavaScript / TypeScript
- Expo APIs

---

## Installation 📦

### 1. Clone the repository

```bash
git clone https://github.com/Bri-13/MakersAutoChord.git
cd MakersAutoChord
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

---

## Running the App

Start the Expo development server:

```bash
npx expo start
```

Then:

- Press **i** → open iOS simulator (Mac only)  
- Press **a** → open Android emulator  
- Or scan the QR code using the **Expo Go app**

---

## Requirements

Make sure you have:

- Node.js (v16+ recommended)
- npm or yarn
- Expo CLI (optional):

```bash
npm install -g expo-cli
```

- Expo Go app (iOS/Android)

---

## Project Structure 📁

```
MakersAutoChord/
├── assets/          
├── components/      
├── screens/         
├── App.js           
├── package.json     
└── ...
```

---

## Dependencies

Main dependencies (installed via `package.json`):

- react
- react-native
- expo

Other possible dependencies:

- expo-status-bar  
- expo-constants  
- react-navigation  

Run `npm install` to install all dependencies.

---

## How It Works

The app includes major and minor scales as well as existing songs.
This allows users to quickly create musical ideas and experiment with different sounds.
It can be paired with the automated fret board so that users can first learn how to strum
in rhythm before learning the fingering for chords.