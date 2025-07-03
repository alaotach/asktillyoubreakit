# Ask Till You Break 🎯

An AI-powered quiz application that generates unlimited questions on any topic. Challenge yourself with dynamic questions that adapt to your performance!

## 🌟 Features

- **Unlimited AI-Generated Questions**: Get fresh questions on any topic you can think of
- **Adaptive Difficulty**: Questions become more challenging based on your previous answers
- **Topic Variety**: Choose from predefined topics or enter your own custom topics
- **Real-time Statistics**: Track your performance, accuracy, and favorite topics
- **Naruto Run Game**: Play the T-Rex inspired game while questions load
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Clean UI**: Simple, modern interface with dark theme

## 🚀 Live Demo

- **Frontend**: [https://your-vercel-app.vercel.app](https://your-vercel-app.vercel.app)
- **Backend API**: [https://asktillyoubreak.dotverse.tech](https://asktillyoubreak.dotverse.tech)

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.3.4** - React framework with App Router
- **React 19** - Latest React with modern hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Vercel** - Deployment platform

### Backend
- **FastAPI** - Modern Python web framework
- **G4F** - AI model integration (Phi-4)
- **Uvicorn** - ASGI server
- **Google Cloud Platform** - VM hosting
- **Nginx** - Reverse proxy
- **Let's Encrypt** - SSL certificates

## 📁 Project Structure

```
ask-till-you-break/
├── app/                          # Next.js frontend
│   ├── src/
│   │   ├── app/                  # App Router pages
│   │   │   ├── page.tsx         # Home page
│   │   │   ├── about/           # About page
│   │   │   ├── questions/[topic]/ # Dynamic quiz page
│   │   │   └── stats/           # Statistics page
│   │   ├── components/          # Reusable components
│   │   │   ├── Navbar.tsx       # Navigation (accepts children)
│   │   │   ├── Card.tsx         # Card component (accepts props)
│   │   │   ├── Back.tsx         # Back button
│   │   │   └── NarutoRun.tsx    # Loading game (nested component)
│   │   ├── types/               # TypeScript interfaces
│   │   └── utils/               # Utility functions
│   ├── public/                  # Static assets
│   └── package.json
└── backend/                     # FastAPI backend
    ├── main.py                  # API server with data fetching
    └── requirements.txt
```

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Git

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/your-username/ask-till-you-break.git
cd ask-till-you-break/app

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn g4f python-dotenv

# Run the server
uvicorn main:app --reload

# API will be available at http://localhost:8000
```

## 🎮 How to Play

1. **Choose a Topic**: Select from predefined topics or enter your own
2. **Answer Questions**: Choose from multiple-choice options
3. **Get Feedback**: See if you're correct and learn from mistakes
4. **Track Progress**: View your statistics and accuracy over time
5. **Play the Game**: Enjoy Naruto Run while questions load!

## 📊 Requirements Fulfilled

✅ **At least three pages that link to each other**
- Home page (`/`)
- About page (`/about`) 
- Stats page (`/stats`)
- Dynamic questions page (`/questions/[topic]`)

✅ **Nested route**
- `/questions/[topic]` - Dynamic routing for different quiz topics

✅ **At least 5 components**
- `NavBar`, `Card`, `Back`, `NarutoRun`, plus page components

✅ **Component that accepts children**
- `NavBar` component accepts navigation links as children

✅ **Component that accepts props**
- `Card` component accepts `title` and `description` props

✅ **Nested component**
- `NarutoRun` contains the `Back` component
- `NavBar` is nested within page components

✅ **Component that fetches and displays data from an API**
- Questions page fetches quiz data from FastAPI backend

## 🔧 API Endpoints

### Backend API
- `GET /` - Health check
- `POST /questions/generate` - Generate quiz questions

```json
{
  "topic": "science",
  "previousAnswers": [],
  "count": 10
}
```

## 🎨 Features Showcase

- **Smart Question Generation**: AI adapts based on your previous answers
- **Local Statistics**: Your progress is saved locally in browser storage
- **Responsive Design**: Works on all screen sizes
- **Loading Entertainment**: Play games while waiting for questions
- **Clean Architecture**: Well-organized components and utilities

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Backend (GCP VM with SSL)
- Deployed on Google Cloud Platform
- Secured with Let's Encrypt SSL
- Served via Nginx reverse proxy
- Managed with systemctl service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**AlAoTach** - [GitHub](https://github.com/AlAoTach)

> *"I'll keep going forward, no matter what, until I reach my dream. I will never give up"* - Naruto

---

**Built with ❤️ using Next.js, FastAPI, and AI**
