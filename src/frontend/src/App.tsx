import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import InstallPrompt from "./components/InstallPrompt";
import ProfileSetup from "./components/ProfileSetup";
import { Toaster } from "./components/ui/sonner";
import { useAuth } from "./hooks/useAuth";
import { useGetCallerUserProfile } from "./hooks/useQueries";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import SplashScreen from "./pages/SplashScreen";

export default function App() {
  const { isAuthenticated } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
  } = useGetCallerUserProfile();

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

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <AuthPage />
        <Toaster />
      </ThemeProvider>
    );
  }

  // Show profile setup if authenticated but no profile
  const showProfileSetup =
    isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (showProfileSetup) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <ProfileSetup />
        <Toaster />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <InstallPrompt />
      <Dashboard />
      <Toaster />
    </ThemeProvider>
  );
}
