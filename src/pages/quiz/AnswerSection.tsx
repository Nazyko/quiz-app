import React from "react";
import "./Quiz.css"

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

    if (!current) return null;

    return (
      <div className="answer-section">
        {current.answers &&
          Object.entries(current.answers).map(([key, value]) =>
            value ? (
              <button
                className="answer-options"
                key={key}
                onClick={() =>
                  handleAnswerOptionClick(current.correct_answers?.[`${key}_correct`] === "true", value)
                }
              >
                {value}
              </button>
            ) : null
          )}
      </div>
    );
  }
);
