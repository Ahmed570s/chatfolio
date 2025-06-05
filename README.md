# Chatfolio 💬

A unique developer portfolio that tells your story through an interactive iPhone iMessage-style chat interface. No forms, no boring static pages – just a natural conversation that guides visitors through your journey as a developer.

## ✨ Features

### 🎭 Interactive Chat Experience
- **Auto-typing animation** with realistic typing speeds using TypeIt
- **4-stage conversation flow**: Introduction → Current Work → Projects → Contact
- **Guided responses** - visitors choose from pre-written options to continue the story
- **iPhone-authentic design** with proper message bubbles, colors, and spacing

### 🎨 Modern UI/UX
- **iPhone iMessage styling** with authentic chat bubbles and layout
- **Dark/Light mode toggle** with system preference detection
- **Responsive design** that works on all devices
- **Smooth animations** and transitions throughout
- **Custom emoji picker** with developer-themed reactions

### 🚀 Technical Highlights
- **React + TypeScript** for type-safe development
- **Vite** for lightning-fast development and builds
- **Tailwind CSS** for rapid, consistent styling
- **Context API** for global theme management
- **Local storage** for theme persistence
- **Component-based architecture** for maintainability

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: TypeIt library
- **Icons**: Heroicons
- **Development**: ESLint, PostCSS, Autoprefixer

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/chatfolio.git
   cd chatfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start chatting with your portfolio!

### Build for Production

```bash
npm run build
npm run preview  # Preview the build locally
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ChatBubble.tsx   # Individual message bubbles
│   ├── ChatHeader.tsx   # iMessage-style header
│   ├── MessageInput.tsx # Input with typing animation
│   ├── ProjectCard.tsx  # Project showcase cards
│   └── TypingIndicator.tsx # "..." typing animation
├── lib/
│   └── ThemeContext.tsx # Dark/light mode management
├── Index.tsx            # Main chat flow logic
├── main.tsx             # App entry point
└── index.css            # Global styles & animations
```

## 🎯 Customization

### Personalizing Your Portfolio

**Update your information in `src/Index.tsx`:**

1. **Personal Details**
   ```typescript
   // Change the profile information
   const profileName = "Your Name";
   const currentRole = "Your Current Role";
   const company = "Your Company";
   ```

2. **Projects**
   ```typescript
   // Update the projects array with your work
   const projects = [
     {
       title: "Your Project Name",
       description: "Brief description",
       tech: ["React", "TypeScript", "etc"],
       link: "https://your-project.com",
       github: "https://github.com/you/project"
     }
   ];
   ```

3. **Contact Information**
   ```typescript
   // Update your contact details
   const contactInfo = {
     email: "your.email@example.com",
     github: "https://github.com/yourusername",
     linkedin: "https://linkedin.com/in/yourprofile"
   };
   ```

### Styling Customization

- **Colors**: Modify the theme colors in `tailwind.config.js`
- **Animations**: Adjust timing and effects in `src/index.css`
- **Chat Flow**: Customize the conversation stages in `src/Index.tsx`

## 🎨 Key Components

### ChatBubble
Renders individual messages with proper iPhone styling, handles both user and assistant messages with different alignments and colors.

### MessageInput
Features auto-typing animation, emoji picker, and handles the interactive response system.

### ProjectCard
Displays your projects in chat-bubble-styled cards with links to live demos and source code.

### ThemeContext
Manages dark/light mode with system preference detection and localStorage persistence.

## 🌙 Dark Mode

The app automatically detects your system theme preference and includes a toggle in the header. Theme choice is persisted across sessions using localStorage.

## 📱 Mobile Responsive

Designed mobile-first with iPhone aesthetics, but fully responsive across all device sizes while maintaining the authentic iMessage feel.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🎭 Design Philosophy

This portfolio breaks away from traditional static portfolios by creating an **engaging, story-driven experience**. Instead of overwhelming visitors with information, it guides them through a natural conversation that reveals your skills, projects, and personality progressively.

The iPhone iMessage styling creates an **familiar, comfortable environment** that encourages interaction and makes your portfolio memorable.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Connect

Questions? Suggestions? Found this useful? 

- **GitHub**: [Ahmed570s](https://github.com/Ahmed570s)  
- **Email**: Ahmed570V2@gmail.com

---

Made with ❤️ and lots of ☕ - A portfolio that actually starts conversations.
