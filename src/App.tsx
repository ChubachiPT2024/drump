import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MatchPage } from "./presentation/pages/Match";
import TitlePage from "./presentation/pages/Title";

export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/match" element={<MatchPage />} />
          <Route path="/" element={<TitlePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
