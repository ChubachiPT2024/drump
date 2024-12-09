import { BrowserRouter, Route, Routes } from 'react-router-dom'

import TitlePage from './presentation/pages/Title'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TitlePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
