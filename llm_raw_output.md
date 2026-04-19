# LLM Output

=== FILE: src/App.jsx ===
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Test from './Test';
import Result from './Result';
import { BASE_URL } from './api';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/questions`)
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleFinish = () => {
    const iqLevel = calculateIqLevel(score, questions.length);
    setResult(iqLevel);
  };

  const calculateIqLevel = (score, totalQuestions) => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 90) {
      return 'Genius';
    } else if (percentage >= 80) {
      return 'Very Intelligent';
    } else if (percentage >= 70) {
      return 'Intelligent';
    } else if (percentage >= 60) {
      return 'Average';
    } else {
      return 'Below Average';
    }
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test questions={questions} currentQuestion={currentQuestion} handleAnswer={handleAnswer} handleFinish={handleFinish} />} />
        <Route path="/result" element={<Result result={result} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
=== END ===

=== FILE: src/main.jsx ===
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
=== END ===

=== FILE: src/index.css ===
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-100;
  font-family: Arial, sans-serif;
}

.container {
  @apply max-w-md mx-auto p-4;
}

.button {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
}

.button:hover {
  @apply bg-blue-700;
}
=== END ===

=== FILE: src/api.js ===
const BASE_URL = 'http://localhost:8000';

export const getQuestions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/questions`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { BASE_URL };
=== END ===