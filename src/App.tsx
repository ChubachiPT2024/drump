import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Match } from "./presentation/pages/Match";

export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<h1 className="font-bold">Hello World</h1>}
          />
          <Route path="/match" element={<Match />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
