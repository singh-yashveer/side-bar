import { useState } from "react";
import { SidebarDemo } from "./demos/SidebarDemo";
import { SidebarCssModulesDemo } from "./demos/SidebarCssModulesDemo";

function App() {
  const [showCssModules, setShowCssModules] = useState(false);

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          padding: "10px",
          backgroundColor: "#f0f0f0",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        <button
          style={{
            padding: "5px 10px",
            background: showCssModules ? "#4CAF50" : "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => setShowCssModules(!showCssModules)}
        >
          {showCssModules ? "Show Styled Components" : "Show CSS Modules"}
        </button>
      </div>

      {showCssModules ? <SidebarCssModulesDemo /> : <SidebarDemo />}
    </div>
  );
}

export default App;
