import { useState, useEffect } from "react";
import { AnswerSection } from "./AnswerSection";
import { useAppSelector } from "../../hooks/hook";
import "./Quiz.css";

export const Quiz = () => {
  const { questions, loading, error } = useAppSelector((state) => state.question);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [canMoveNext, setCanMoveNext] = useState<boolean>(false);

  const handleAnswerOptionClick = (isCorrect: boolean, answer: string) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setSelectedAnswers((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[currentQuestion] = answer;
      return updatedAnswers;
    });

    
    setCanMoveNext(true);
  };

  useEffect(() => {
    if (canMoveNext) {
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion((prev) => prev + 1);
        } else {
          setShowScore(true);
        }
        setCanMoveNext(false);
      }, 300);
    }
  }, [canMoveNext, currentQuestion, questions.length]);

  const handlePlayAgainClick = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setSelectedAnswers([]);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
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
                <button onClick={() => setCurrentQuestion((prev) => prev - 1)}>Previous</button>
              )}
              {currentQuestion < questions.length - 1 && (
                <button onClick={() => setCurrentQuestion((prev) => prev + 1)}>Next</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
