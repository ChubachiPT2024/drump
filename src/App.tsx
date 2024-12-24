import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TitlePage } from "./presentation/pages/Title";
import { MatchPage } from "./presentation/pages/Match";
import { MatchStartPage } from "./presentation/pages/Match-start";

export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TitlePage />} />
          <Route path="/match/:matchId" element={<MatchPage />} />
          <Route path="/match-start" element={<MatchStartPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
