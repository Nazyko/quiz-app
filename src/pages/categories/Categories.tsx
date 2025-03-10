import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Notification, Select } from "@mantine/core";
import { useAppDispatch } from "../../hooks/hook";
import { getQuestions } from "../../store/questionSlice";
import "./Categories.css"
import { useNavigate } from "react-router-dom";

interface ICategory {
  id: number;
  name: string;
}

export const Categories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const fetchData = async () => {
    const apiKey = localStorage.getItem("token");
    if (!apiKey) {
      setError("API KEY tabılmadı!");
      return;
    }
    try {
      const response = await axios.get<ICategory[]>(
        `https://quizapi.io/api/v1/categories?apiKey=${apiKey}`
      );
      setCategories(response.data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Serverde qátelik júz berdi. Keyinrek taǵı tekseriń!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = categories.map((item) => item.name);

  const startQuiz = () => {
    if (!selectedCategory) {
      setError("Test baslaw ushın categoriyanı saylań!.");
      return;
    }
    if (!difficulty) {
      setError("Test baslaw ushın test dárejesin saylań!.");
      return;
    }
    dispatch(getQuestions({
      category: selectedCategory,
      difficulty: difficulty
    }));

    navigate("/quiz")
  };

  return (
    <div className="wrapper">
      <div className="category">
        <div className="category__inner">
          <Select
            label="Baǵdar"
            placeholder="Saylań"
            data={data}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
          <Select 
            label="Test dárejesi" 
            placeholder="Saylań" 
            data={['easy', 'medium', 'hard']}
            value={difficulty}
            onChange={setDifficulty}
          />
          <Button color="yellow" onClick={startQuiz} mt={20}>
            Baslaw
          </Button>
        </div>
        {error && (
          <Notification color="red" title="Qátelik" withCloseButton onClose={() => setError(null)} mt={40}>
            {error}
          </Notification>
        )}
      </div>
    </div>
  );
};
