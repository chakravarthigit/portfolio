# 🌀 Tailtx – Gesture-Controlled Shorts Scroller

**Tailtx** is a gesture-powered mobile app that lets users scroll through **YouTube Shorts, Instagram Reels, or TikTok videos** using **tilt up/down gestures**. No touch, no tap — just tilt and chill.

---

## 🚀 Features

- 🔽 **Tilt Down = Next Video**
- 🔼 **Tilt Up = Previous Video**
- 🌀 Seamless, hands-free scrolling
- ⚡ Fully offline experience – no backend or camera required
- 🧭 Responsive and intuitive tilt-based control

---

## 🌟 Ideal For

- Watching videos while lying down
- Hands-busy situations like eating or resting
- Accessibility-focused users
- Experimental gesture UX experiences

---

## 🧠 Tech Stack

| Area              | Stack / Tools                           |
|-------------------|------------------------------------------|
| Framework         | React Native CLI                         |
| Gesture Detection | Device Motion Sensors (Gyroscope / Accelerometer) |
| Video Playback    | WebView or Deep Linking to Shorts/Reels  |
| State Management  | Local React State / Zustand (if needed)  |
| Backend           | ❌ None – fully frontend-only             |

---

## ⚙️ How It Works

1. Tailtx uses the device’s **motion sensors** to detect **tilt direction**.
2. On **tilt down**, it scrolls to the **next** short video.
3. On **tilt up**, it scrolls to the **previous** one.
4. Works with embedded videos via WebView or links (e.g., YouTube Shorts).

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/tailtx.git
cd tailtx
npm install
npx react-native run-android
# or
npx react-native run-ios
