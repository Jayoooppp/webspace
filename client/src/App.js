import { Container } from "@material-ui/core"
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PostDetails from "./components/PostDetails/PostDetails.jsx";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"))
  return (
    <GoogleOAuthProvider clientId="211295330398-snk7sc9f7otsovt0kmladtp1u5ougn41.apps.googleusercontent.com">
      <Container maxwidth="xl">
        <BrowserRouter>


          <Navbar />
          <Routes>
            <Route path="/" exact element={<Navigate to="/posts" />} />

            <Route path="/posts" exact element={<Home />} />
            <Route path="/posts/search" exact element={<Home />} />
            <Route path="/posts/:id" exact element={<PostDetails />} />

            <Route path="/auth" element={(!user ? <Auth /> : <Navigate to="/posts" />)} />
          </Routes>

        </BrowserRouter>


      </Container >
    </GoogleOAuthProvider>

  );
}

export default App;
