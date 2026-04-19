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