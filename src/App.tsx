import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TitlePage } from "./presentation/pages/Title";
import { UsersPage } from "./presentation/pages/Users";
import { MatchStartPage } from "./presentation/pages/Match-start";
import { MatchPage } from "./presentation/pages/Match";
import { RulesPage } from "./presentation/pages/Rules";

export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TitlePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/match-start" element={<MatchStartPage />} />
          <Route path="/match/:matchId" element={<MatchPage />} />
          <Route path="/rules" element={<RulesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
