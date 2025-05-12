import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import TaskScreen from "./screen/TaskScreen";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/tasks" element={<TaskScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
