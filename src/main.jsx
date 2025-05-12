import { BrowserRouter } from "react-router-dom";
import { FavoriteProvider } from "./context/FavoriteContext.jsx";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FavoriteProvider>
      <App />
    </FavoriteProvider>
  </BrowserRouter>
);
