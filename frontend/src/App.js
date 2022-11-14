import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
//component imports
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

//pages imports

import ProtectedRoutes from "./components/ProtectedRoutes";
import FirstPage from "./pages/FirstPage";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import MyBlogs from "./pages/MyBlogs";
import Signup from "./pages/Signup";
import SingleBlog from "./pages/SingleBlog";
import UserBlogs from "./pages/UserBlogs";
function App() {
  const { state } = useAuthContext();
  return (
    <div className="App">
      <div className="pages">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={state.user ? <Home /> : <FirstPage />} />
            {/* users only */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/myblogs" element={<MyBlogs />} />

              <Route path="/blogs/:id" element={<SingleBlog />} />
              <Route path="/users/:id" element={<UserBlogs />} />
            </Route>
            {/* none users  */}
            <Route
              path="/login"
              element={!state.user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!state.user ? <Signup /> : <Navigate to="/" />}
            />

            {/* any one */}
            <Route path="/*" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
