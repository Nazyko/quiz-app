import React, { useState } from "react";
import "./Quiz.css";

interface AnswerSectionProps {
  questions: {
    answers: Record<string, string | null>;
    correct_answers: Record<string, string>;
  }[];
  currentQuestion: number;
  handleAnswerOptionClick: (isCorrect: boolean, answer: string) => void;
}

export const AnswerSection: React.FC<AnswerSectionProps> = React.memo(
  ({ questions, currentQuestion, handleAnswerOptionClick }) => {
    const [isAnswered, setIsAnswered] = useState<boolean>(false); 
    const current = questions[currentQuestion];

    if (!current || !current.answers || !current.correct_answers) return null;

    return (
      <div className="answer-section">
        {Object.entries(current.answers).map(([key, value]) =>
          value ? (
            <button
              className={`answer-options ${isAnswered ? "disabled" : ""}`} 
              key={key}
              onClick={() => {
                if (!isAnswered) {
                  setIsAnswered(true); 
                  const isCorrect = current.correct_answers?.[`${key}_correct`] === "true";
                  handleAnswerOptionClick(isCorrect, value);
                }
              }}
              disabled={isAnswered}
            >
              {value}
            </button>
          ) : null
        )}
      </div>
    );
  }
);
