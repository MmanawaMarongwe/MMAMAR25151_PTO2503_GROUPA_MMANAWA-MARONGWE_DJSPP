# 🎧 DJS06: React Podcast App – Global State, Playback & Persistence

## Project Overview

In this project, a fully featured podcast application is developed as the final evolution of the React Podcast Explorer. Building on dynamic routing and show detail navigation, this version introduces global state management, persistent user interactions, uninterrupted audio playback, and production deployment practices.

Users can browse podcast shows, explore seasons and episodes, play audio across routes without interruption, favourite episodes, and personalise their experience through theme preferences — all while maintaining a responsive and seamless single‑page application experience.

The project demonstrates the ability to manage complex shared state, coordinate asynchronous behaviour across components, and implement production‑ready React architecture.

---

## Core Objectives

- Implement **global state management** using React Context API.
- Create a **persistent global audio player** that continues playback across routes.
- Enable **episode favouriting** with localStorage persistence.
- Implement a **recommended shows carousel** for improved discovery.
- Add a **light/dark theme toggle** with saved user preference.
- Configure **SPA deployment routing** to prevent refresh 404 errors.
- Handle asynchronous state safely during navigation and playback.
- Maintain a fully **responsive UI** across mobile, tablet, and desktop devices.

---

## Deliverables

### 1. Global Audio Playback System

- Single shared audio player accessible across the entire application.
- Playback continues when navigating between pages.
- Displays episode metadata including title, season, and episode.
- Uses a unique `trackId` to correctly replay episodes.
- Playback state persisted using `localStorage`.
- Browser confirmation prompt shown when leaving during playback.

---

### 2. Episode Favourites System

- Users can favourite or unfavourite individual episodes.
- Favourites stored persistently using `localStorage`.
- Episodes grouped by show for structured data management.
- Dedicated Favourites page for easy access.
- Sorting options include:
  - Title A–Z / Z–A
  - Newest added / Oldest added

---

### 3. Recommended Shows Carousel

- Horizontally scrollable carousel implemented using Swiper.js.
- Displays recommended podcasts with images and genre tags.
- Swipe and arrow navigation supported.
- Responsive breakpoints adjust visible items by screen size.
- Automatically excludes the currently viewed show when applicable.

---

### 4. Theme Toggle & Personalisation

- Light and Dark mode support using CSS variables.
- Theme preference stored in `localStorage`.
- Instant global UI updates across all components.

---

### 5. Production Deployment Configuration

- Application deployed to **Vercel**.
- SPA rewrite rule prevents 404 errors on refresh for dynamic routes.
- Routes such as `/show/:id` load correctly in production.

Example configuration:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

### 6. Responsive Design

- Mobile‑first layout adjustments.
- Episode and content layouts adapt for smaller screens.
- Carousel breakpoints optimise viewing across devices.

---

## Technical Concepts Demonstrated

- React Context API for shared global state
- Persistent state using localStorage
- Controlled side effects with `useEffect`
- Memoization using `useMemo`
- Dynamic routing with React Router
- Functional state updates
- Separation of logic and presentation components
- Production SPA deployment practices

---

## Local Development Setup

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project folder:

```bash
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## Panel Review Preparation

Prepared to explain:

- How global audio playback persists across routes
- Why Context API was chosen over prop drilling
- How favourites are grouped and updated immutably
- How memoization improves rendering performance
- How localStorage persistence is safely initialized
- How SPA routing fallback works in production deployment
- How asynchronous playback and navigation states are coordinated

---

This project demonstrates the ability to design and implement a production‑ready React application featuring shared global state, persistent user interactions, optimized rendering patterns, and professional deployment configuration.

# 🎧 React Podcast Explorer

## 🚀 Overview

This React podcast explorer app is a **podcast browsing and listening application** that allows users to browse shows, explore seasons and episodes, play podcast audio across pages, favourite episodes, and personalise their experience with theme preferences.

Building on earlier podcast browsing functionality, this version introduces **global state management**, **persistent audio playback**, **episode favourites**, and **production deployment configuration**. The application fetches podcast data from an external API and maintains a **consistent and uninterrupted user experience**, ensuring playback, favourites, and UI preferences persist while navigating between routes.

---

## 🌐 Live Demo

You can view the deployed application here:

👉 **Live Demo:** <https://codecastapp.vercel.app/>

The application is deployed as a single‑page React application with routing rewrites configured to ensure dynamic routes load correctly in production.

---

## ✨ Features

- **Global Audio Player**: Play podcast episodes with uninterrupted playback across pages.
- **Episode Favourites**: Favourite or unfavourite episodes and access them from a dedicated favourites view.
- **Recommended Carousel**: Discover new podcasts through a responsive, horizontally scrollable recommendations carousel.
- **Theme Toggle**: Switch between light and dark modes with preferences saved between sessions.
- **Dynamic Routing**: Each podcast show has its own dedicated detail page.
- **Persistent State**: Playback state, favourites, and theme settings are stored using localStorage.
- **Responsive Design**: Optimised layouts for mobile, tablet, and desktop devices.
- **Loading & Error States**: Clear feedback during data fetching or failures.

---

## 🛠️ Tech Stack

- **React** (functional components & hooks)
- **React Router** (dynamic routing)
- **JavaScript (ES6+)**
- **Fetch API**
- **React Context API** (global state management)
- **Swiper.js** (carousel implementation)
- **CSS3** (responsive styling)
- **Vercel** (deployment & SPA routing configuration)

---

## 📖 How to Use

1. Start the application locally or access the live demo.
2. Browse podcasts from the homepage.
3. Select a podcast to open its **show detail page**.
4. Explore seasons and episodes.
5. Play episodes using the global audio player.
6. Favourite episodes for quick access later.
7. Toggle between light and dark themes at any time.

---

## ⚙️ Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate into the project directory:

   ```bash
   cd DJS06
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser:

   ```
   http://localhost:5173
   ```

---

## 🧪 Code Quality

- Clean and modular React component structure.
- Centralised global state management using React Context.
- Separation of logic and presentation components.
- Major components documented with **JSDoc comments**.
- Consistent formatting across JavaScript, JSX, HTML, and CSS files.

---

## 🎯 Future Improvements

- Add listening progress tracking per episode.
- Introduce playback queue functionality.
- Improve accessibility and keyboard navigation support.
- Add UI animations and transitions for enhanced interaction.
# 🎧 React Podcast Explorer

## 🚀 Overview

This React podcast explorer app is a **podcast browsing and listening application** that allows users to browse shows, explore seasons and episodes, play podcast audio across pages, favourite episodes, and personalise their experience with theme preferences.

This project (DJSPP) focuses on **global state management**, **persistent audio playback**, **episode favourites**, **recommendation discovery**, and **production-ready routing**. The application fetches podcast data from an external API and maintains a **consistent and uninterrupted single‑page experience**, ensuring playback, favourites, and UI preferences persist while navigating between routes.

## 🌐 Live Demo

👉 **Live Demo:** <live-demo-url>

Deployed as a single‑page React application with routing rewrites configured so dynamic routes load correctly in production.

## ✨ Features

- **Global Audio Player**: Persistent player that continues playback across routes and displays active episode metadata.
- **Episode Favourites**: Favourite/unfavourite episodes with a dedicated favourites view and persistent storage.
- **Favourites Sorting**: Sort favourites by Title A–Z / Z–A and Newest added / Oldest added.
- **Recommended Carousel**: Responsive, horizontally scrollable recommendations carousel (Swiper.js) with swipe + arrow navigation.
- **Theme Toggle**: Light/dark mode using CSS variables, saved between sessions.
- **Dynamic Routing**: Dedicated show detail pages with stable navigation.
- **Persistent State**: Playback state, favourites, and theme settings stored using localStorage.
- **Loading & Error States**: Clear feedback during data fetching or failures.
- **Responsive Design**: Mobile‑first layouts that adapt across mobile, tablet, and desktop.

## 🛠️ Tech Stack

- **React** (functional components & hooks)
- **React Router** (dynamic routing)
- **JavaScript (ES6+)**
- **Fetch API**
- **React Context API** (global state management)
- **Swiper.js** (carousel implementation)
- **CSS3** (responsive styling)
- **Vercel** (deployment & SPA routing configuration)

## 📖 How to Use

1. Open the live demo or start the app locally.
2. Browse podcasts from the homepage.
3. Select a podcast to open its **show detail page**.
4. Expand seasons to explore episodes.
5. Play episodes using the global audio player.
6. Favourite episodes for quick access later.
7. Toggle between light and dark themes at any time.

## ⚙️ Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate into the project directory:

   ```bash
   cd DJSPP
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser:

   ```
   http://localhost:5173
   ```

## 🧪 Code Quality

- Clean and modular React component structure.
- Centralised global state using React Context (avoids prop drilling).
- Controlled side effects with `useEffect` (e.g., persistence + playback sync).
- Memoization using `useMemo` where appropriate to reduce unnecessary re-renders.
- Separation of logic and presentation components for maintainability.
- Major components and utilities documented with **JSDoc comments**.
- Consistent formatting across JavaScript, JSX, HTML, and CSS files.

## 📌 Assignment Requirements Covered

- **Global state management** implemented using React Context API.
- **Persistent global audio playback** across routes with episode metadata.
- **Favourites system** with localStorage persistence and structured grouping.
- **Favourites sorting** (title + date added).
- **Recommendation carousel** implemented with Swiper.js and responsive breakpoints.
- **Theme toggle** with stored user preference.
- **SPA deployment routing** configured to prevent refresh 404s on dynamic routes.
- **Responsive UI** across device sizes.
- **Loading/error/empty states** handled gracefully during async fetching.

## 🎯 Future Improvements

- Add listening progress tracking per episode.
- Introduce playback queue functionality.
- Improve accessibility and keyboard navigation support.
- Add UI animations and transitions for enhanced interaction.