import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbars from "./components/Navbars";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NewArticle from "./pages/NewArticle";
import EditArticle from "./pages/EditArticle";
import MyArticle from "./pages/MyArticle";
import SingleArticle from "./pages/SingleArticle";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";

const App = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Navbars />
      <Routes>
        <Route path="/" element={<Home />} />
        {!user && (
          <>
            <Route path="/about" />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}

        {user && (
          <>
            <Route path="/new-article" element={<NewArticle />} />
            <Route path="/articles/:id/edit" element={<EditArticle />} />
            <Route path="/articles/me" element={<MyArticle />} />
          </>
        )}

        <Route path="/articles/:id" element={<SingleArticle />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
