import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
//component imports
import Footer from "./components/Footer";

//pages imports

import axios from "axios";
import ErrorPage from "./components/ErrorPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicLayout from "./layoutes/PublicLayout";
import RootLayout from "./layoutes/RootLayout";
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
  // const base = "https://blog-react-backend.onrender.com/api/blogs/";
  axios.defaults.baseURL = "https://blog-react-backend.onrender.com/api/blogs/";
  axios.defaults.headers = {
    Authorization: `Bearer ${state?.user?.token}`,
  };
  // const context = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={state.user ? <Home /> : <FirstPage />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="blogs"
          element={<ProtectedRoutes />}
          errorElement={<ErrorPage />}
        >
          <Route path="myblogs" element={<MyBlogs />} />

          <Route path=":id" element={<SingleBlog />} />
          <Route path="users/:id" element={<UserBlogs />} />
        </Route>
        {/* public */}
        <Route path="public" element={<PublicLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/*" element={<LandingPage />} />
      </Route>
    )
  );

  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <div className="pages">
          <RouterProvider router={router} />
        </div>
        <Footer />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
      </QueryClientProvider>
    </div>
  );
}

export default App;
