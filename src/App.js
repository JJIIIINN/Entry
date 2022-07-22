import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import WritingPage from "./pages/WritingPage";
import DetailPage from "./pages/DetailPage";
import AditPage from "./pages/AditPage";

function App() {

  return (
  <>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<MainPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/SignUp" element={<SignUpPage />} />
      <Route path="/WritingPage" element={<WritingPage />} />
      <Route path="/posts/:id" element={<DetailPage />} />
      <Route path="/posts/adit/:id" element={<AditPage />} />
    </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
