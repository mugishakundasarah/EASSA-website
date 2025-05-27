import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Culture from "./pages/Culture";
import Layout from "./components/Layout";
// import your page components for the routes:

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="events" element={<Events />} />
        <Route path="culture" element={<Culture />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App
