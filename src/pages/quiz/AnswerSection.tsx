import React from "react";
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
    const current = questions[currentQuestion];

    if (!current || !current.answers || !current.correct_answers) return null;

    return (
      <div className="answer-section">
        {Object.entries(current.answers).map(([key, value]) =>
          value ? (
            <button
              className="answer-options"
              key={key}
              onClick={() => {
                const isCorrect = current.correct_answers?.[`${key}_correct`] === "true";
                handleAnswerOptionClick(isCorrect, value);
              }}
            >
              {value}
            </button>
          ) : null
        )}
      </div>
    );
  }
);
