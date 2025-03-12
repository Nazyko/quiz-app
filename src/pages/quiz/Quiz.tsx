import { useState } from "react";
import { AnswerSection } from "./AnswerSection";
import { useAppSelector } from "../../hooks/hook";
import "./Quiz.css"


export const Quiz = () => {
  const { questions, loading, error } = useAppSelector((state) => state.question);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const handleAnswerOptionClick = (isCorrect: boolean, answer: string) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestion] = answer;
    setSelectedAnswers(updatedSelectedAnswers);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handlePlayAgainClick = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setSelectedAnswers([]);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if(error) {
    return <p>Error: {error}</p>
  }


  return (
    <div className="wrapper">
      <div className="quiz">
        <h1>Sorawlar</h1>
        {showScore ? (
          <div className="score-section">
            <h2>Sizdiń nátiyjeńiz: {score}</h2>
            <button className="playAgain-btn" onClick={handlePlayAgainClick}>
              Qaytalaw
            </button>
          </div>
        ) : (
          <div className="question-section">
            <div className="question-count">
              <span>{currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">{questions[currentQuestion]?.question}</div>

            <AnswerSection
              questions={questions}
              currentQuestion={currentQuestion}
              handleAnswerOptionClick={handleAnswerOptionClick}
            />

            <div className="navigation-buttons">
              {currentQuestion > 0 && (
                <button onClick={() => setCurrentQuestion(currentQuestion - 1)}>Previous</button>
              )}
              {currentQuestion < questions.length - 1 && (
                <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>    
  );
};
