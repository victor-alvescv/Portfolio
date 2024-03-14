import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();


ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
  // <React.StrictMode>
  // </React.StrictMode>,
)
