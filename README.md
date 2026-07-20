# Discussion Forum Frontend

A modern, responsive, and feature-rich discussion forum application built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. This application integrates with the Dicoding Forum API and implements global state management using **Redux Toolkit**.

---

## 📋 Project Checklist Status

Here is the status of the requirements defined for this discussion forum frontend submission:

### 1. Core Functionality
- [x] **Authentication**: Complete and secure forms for **Register** and **Login**.
- [x] **Protected Actions**: Core interactions (creating threads, posting comments, upvoting/downvoting) are protected and require a logged-in user.
- [x] **Discussion Threads List**: Displays thread titles, body snippets, creation timestamps, comment counts, and creator avatars with names.
- [x] **Thread Details & Comments**: Dedicated detailed page showing full thread contents, list of comments with author names, avatars, and creation times.
- [x] **User Actions**: Create new threads and post comments directly from the UI.
- [x] **Loading Indicator**: Integrates a loading bar at the top of the viewport when communicating with the REST API.

### 2. Code Quality & Standards
- [x] **ESLint & Prettier**: Configured with strict ESLint settings (based on `eslint-config-airbnb` & `typescript-eslint`) and fully lint-free.
- [x] **React Strict Mode**: Enabled inside [main.tsx](file:///home/afigo/projects/dicoding/submission/Menjadi-React-Web-Developer/discussion-forum-frontend-new/discussion-forum-frontend/src/main.tsx) to ensure code reliability and highlight potential issues.
- [x] **Clean Code Conventions**: Conforms to professional JavaScript/TypeScript and React coding standards.

### 3. Application Architecture
- [x] **Global State Management**: Powered by **Redux Store** via Redux Toolkit.
- [x] **Thunk Middlewares**: Absolutely no direct REST API fetches inside `useEffect` or component lifecycles. All side-effects and network requests are delegated to **Redux Thunk** actions.
- [x] **Separation of Concerns**: Clean project structure separating UI features (`src/features`) from state modules (`src/states`).
- [x] **Modular & Reusable Components**: Elements such as buttons, inputs, thread items, and comment items are separated into modular components.

### 4. Advanced Features (Bonus Achievements)
- [x] **Votes System**: Users can upvote and downvote threads (and comments) with visual color state changes and updated counts. Implements **Optimistic Updates** to ensure a blazing-fast UI.
- [x] **Leaderboard Page**: A dedicated leaderboard page displaying top contributors, their profile details, and accumulated activity scores.
- [x] **Local Category Filter**: Dynamically filter active threads by their `#category` tag in real-time.

---

## 🛠️ Technology Stack

- **Core**: React 19, TypeScript, Vite
- **State Management**: Redux Toolkit, React Redux
- **Routing**: React Router DOM (v7)
- **Styling**: Tailwind CSS (v4)
- **Icons**: Lucide React
- **Loading Progress**: Redux Loading Bar (`@dimasmds/react-redux-loading-bar`)
- **Linting & Formatting**: ESLint, Prettier

---

## 📂 Project Structure

```text
src/
├── components/          # Shared components (e.g. Loading indicator)
├── features/            # Feature-based folder structure
│   ├── auth/            # Pages & components for Register / Login
│   ├── leaderboard/     # Leaderboard module page & components
│   └── threads/         # Dashboard list, detailed pages & inputs
├── hooks/               # Custom hooks
├── states/              # Redux slices, states, store configuration, and Thunk actions
├── types/               # TypeScript interfaces & types
└── utils/               # Axios / Fetch client and API endpoints configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** or **Bun** installed.

### 2. Environment Setup
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```
Ensure the API endpoint is configured properly:
```env
VITE_PUBLIC_API=https://forum-api.dicoding.dev/v1
```

### 3. Installation
Install the project dependencies:
```bash
npm install
# or if you are using bun
bun install
```

### 4. Development Server
Run the local Vite development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 5. Build for Production
To build the application:
```bash
npm run build
```

### 6. Linting
Verify code compliance and formatting:
```bash
npm run lint
```
