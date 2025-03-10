import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/home/Home";
import { Options } from "./pages/options/Options";
import { Categories } from "./pages/categories/Categories";
import { Auth } from "./pages/auth/Auth";
import { Quiz } from "./pages/quiz/Quiz";

export const App = () => {
  

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/options" element={<Options />} />
        <Route path="/auth" element={<Auth />}/>
        <Route path="/categories" element={<Categories />} />
        <Route path="/quiz" element={<Quiz />}/>
      </Routes>
    </>
  );
};
