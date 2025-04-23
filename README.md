# 🌟 Pokémon Manager

A fullstack application for browsing, searching, and managing your favorite Pokémon.

🎮 **Live Demo**: [https://pokemon-app.vercel.app/](https://pokemon-app-fawn.vercel.app)  
🛠️ **Live API**: [https://pokemon-fullstack-app-production.up.railway.app/](https://pokemon-fullstack-app-production.up.railway.app/)

![Pokémon Manager](https://live.staticflickr.com/65535/54466371262_1ac3f291cb_c.jpg)

<div style="display: flex; justify-content: space-around; align-items:center">
<img src="https://live.staticflickr.com/65535/54468239186_c21fdd30b3_k.jpg" width="33%" height=90%/>
<img src="https://live.staticflickr.com/65535/54468591295_3bae189421_b.jpg" width="16.5%" height=90%/>
<img src="https://live.staticflickr.com/65535/54468496628_684d3923e9_b.jpg" width="16.5%" height=90%/>
<img src="https://live.staticflickr.com/65535/54468496448_a80d29754a_k.jpg" width="33%" height=90%/>
</div>>

---

## 📚 Overview & Approach

Pokemon Manager is a fullstack project designed to combine a professional development structure with a focus on user experience.

I focused on building a **scalable but simple** app:

- Frontend built with **React + Vite**, styled with **TailwindCSS** and **Shadcn UI**.
- Backend built with **NestJS** integrating **PokeAPI** and managing favorites using **MongoDB Atlas**.
- Smooth animations with **Framer Motion**, global state with **Redux Toolkit**.

I intentionally kept the architecture clean without overengineering, aiming to:

- Keep the project easily **extensible** (for example, moving to **Next.js** for SSR or **React Query** for server state caching).
- Prioritize **performance, responsiveness**, and **clean code**.

This project can scale naturally with minimal changes if needed.

---

## 👩‍💻 Tech Stack

### Frontend

- **React 19** (with Vite)
- **TypeScript**
- **TailwindCSS + Shadcn/ui**
- **Redux Toolkit** (for local state)
- **Axios** (API requests)
- **Framer Motion** (animations)

### Backend

- **NestJS** (Node.js Framework)
- **MongoDB With Mongoose** (Database)
- **PokeAPI** (Pokémon Data Source)
- **Axios** (for external API communication)

---

## 📊 Features

- ✨ **Pokémon Browsing**: View the original 150 Pokémon.
- 👀 **Infinite Scroll**: Smoothly loads more cards as you scroll.
- 🔍 **Search**: Search Pokémon by name with debounced input.
- ⭐ **Favorites**: Mark Pokémon as favorites and manage them.
- 📋 **Detail View**: Stats, moves, and evolution chain.
- 🌓 **Dark Mode**: Built-in theme toggle.
- 🔄 **Optimistic Updates**: Instant UI updates for favorite changes.
- 📱 **Responsive**: Fully responsive across devices.

---

## 📚 Setup Instructions

### Prerequisites

- Node.js (v18+)
- npm (or yarn)

### 1. Clone the Repository

```bash
git clone https://github.com/ronfried1/pokemon-app.git
cd pokemon-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:

```env
PORT=4000
POKEAPI_BASE_URL=https://pokeapi.co/api/v2
MAX_ALLOWED_POKEMON=150
MONGODB_URI=your-mongodb-atlas-uri
USE_LOCAL_MONGODB=false
USE_MEMORY_DB=false
```

Run the backend server:

```bash
npm run start:dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file inside `/frontend`:

```env
VITE_API_URL=http://localhost:4000
```

Run the frontend dev server:

```bash
npm run dev
```

The app will be running at [http://localhost:5173](http://localhost:5173)

---

## 🧪 API Testing with Postman

A Postman collection is included in the project to help test backend endpoints quickly.

### 📂 Location

You’ll find the file here:

> _`/postman/pokemon-app-api.postman_collection.json`_

---

### 🚀 How to Use

1. Open [Postman](https://www.postman.com/).
2. Click **Import** > **File**.
3. Select `pokemon-app-api.postman_collection.json`.
4. Update the base URL in the environment or requests (e.g., `http://localhost:4000`).

---

### 📋 Included Requests

- ✅ Get all Pokémon
- 🔍 Search Pokémon by name
- ⭐ Toggle favorite status
- 📊 Get detailed Pokémon info

---

## 📅 Future Improvements

- Move to **Next.js** for server-side rendering and API routes.
- Introduce **React Query** for caching and server state management.
- Add **Authentication** for personal collections.
- Implement **Redis** for backend caching.

---

## 🔑 License

MIT

---

## 📄 Acknowledgements

- [PokeAPI](https://pokeapi.co/) for all the Pokémon data.
- [Shadcn/ui](https://ui.shadcn.com/) for the UI components.
- [Framer Motion](https://www.framer.com/motion/) for animations.

---

# Thank you for reviewing the project! 🚀
