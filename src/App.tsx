import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TitlePage } from "./presentation/pages/Title";
import { MatchPage } from "./presentation/pages/Match";
import { MatchStartPage } from "./presentation/pages/MatchStart";

export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TitlePage />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/match-start" element={<MatchStartPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
