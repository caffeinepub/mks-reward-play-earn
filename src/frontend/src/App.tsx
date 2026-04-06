import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import InstallPrompt from "./components/InstallPrompt";
import { Toaster } from "./components/ui/sonner";
import Dashboard from "./pages/Dashboard";
import SplashScreen from "./pages/SplashScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("Service Worker registered:", registration.scope);
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error);
          });
      });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <InstallPrompt />
      <Dashboard />
      <Toaster />
    </ThemeProvider>
  );
}
