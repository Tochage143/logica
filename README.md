

# 🧠 Knowledge Management System

A dynamic and modern web-based platform to write, organize, and visualize your notes and journals with:

- Markdown editing ✍️
- Interactive Graph View 🌐
- Encrypted file-based storage 🔐
- File-system style structure 📁
- Fully responsive design 💻📱

Built using **Next.js**, **MongoDB**, and **NextAuth** for secure user authentication.

---

## Screenshot

<p align="center"> <img src="Screenshot\Screenshot 2025-07-12 153633.png">
<img src="Screenshot\Screenshot 2025-07-12 153700.png">
<img src="Screenshot\Screenshot 2025-07-12 153714.png"> 
</p>

## 🔑 Features

- ✅ **Markdown Support** – Clean and distraction-free editing with Markdown.
- 🔐 **Encrypted Storage** – Keeps your notes secure and private.
- 🧩 **Graph View** – Visualize connections between your notes like Obsidian.
- 🗂️ **File System Storage** – Organized folders and note hierarchy.
- 🌐 **Web-Based & Cross-Device** – Works anywhere, from any device.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Tochage143/logica
cd knowledge-management-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env.local` file

In the root of your project, create a `.env.local` file and add the following:

```env
JWT_SECRET=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
MONGODB_URI=mongodb://localhost:27017/test
```

> ⚠️ Make sure MongoDB is running locally on port `27017`, or update the `MONGODB_URI` accordingly.

---

### 4. Run the development server

```bash
npm run dev
```

Now open [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

---

### 📁 Project Structure

```
📦 LOGICA/
 ┣ 📂.git/                  # Git config folder
 ┣ 📂.next/                 # Next.js build output
 ┣ 📂node_modules/          # Installed dependencies
 ┣ 📂public/                # Static assets like images and favicon
 ┣ 📂src/                   # Source code
 ┃ ┣ 📂app/                 # App router (Next.js 13+)
 ┃ ┣ 📂components/          # Reusable UI components
 ┃ ┣ 📂Database/            # DB connection & utilities
 ┃ ┣ 📂hooks/               # Custom React hooks
 ┃ ┣ 📂lib/                 # Utility functions & helpers
 ┃ ┣ 📂Model/               # Mongoose or Prisma models
 ┃ ┣ 📂pages/               # Pages (for API routes or legacy routing)
 ┃ ┣ 📂styles/              # Global and module CSS/SCSS files
 ┃ ┗ 📄middleware.ts        # Middleware for auth, rate limit, etc.
 ┣ 📄.env                   # Environment variables
 ┣ 📄.gitignore             # Git ignore rules
 ┣ 📄components.json        # Component config/registry
 ┣ 📄eslint.config.mjs      # ESLint config
 ┣ 📄next-env.d.ts          # Next.js TypeScript support
 ┣ 📄next.config.ts         # Next.js custom config
 ┣ 📄package.json           # NPM package info & scripts
 ┣ 📄package-lock.json      # Dependency lock file
 ┣ 📄postcss.config.mjs     # PostCSS config for Tailwind or others
 ┣ 📄README.md              # Project overview and instructions
 ┗ 📄tsconfig.json          # TypeScript config
```

---

## 🛡️ Auth & Security

This project uses **NextAuth.js** for authentication. Sessions are secured using `JWT_SECRET` and `NEXTAUTH_SECRET`.

You can plug in Google, GitHub, or custom credentials easily in `[...]nextauth.js`.

---

## 💡 Future Ideas

- Add collaborative editing
- Export/Import as PDF or Markdown
- Mobile app version with offline support
- AI-powered note suggestions 😉

---

## 📜 License

MIT License © 2025 🚀

---

Made with ❤️ for learning and productivity!

<h2 align="center" style="margin-top: 3rem;">🙋‍♂️ Author</h2> <p align="center" style="font-size: 1.05rem;"> <strong>Tochage143</strong> – <a href="https://github.com/Tochage143" target="_blank">GitHub Profile</a><br/> 💬 Feel free to reach out if you wanna collab, contribute, or just chat about cool projects! </p>
