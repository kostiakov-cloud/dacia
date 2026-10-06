import "./index.css";
import { loadDictionary } from "./i18n";

// The Romanian dictionary must be in place before any module that translates strings at import time (data files) runs,
// so the app is imported dynamically after it.
await loadDictionary();
const [{ default: React }, { default: ReactDOM }, { default: App }, { initReveal }] = await Promise.all([
  import("react"),
  import("react-dom/client"),
  import("./App.jsx"),
  import("./reveal"),
]);

// must run before the first render so the hidden state is there from the first paint
initReveal();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
