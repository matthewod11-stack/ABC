import { OrientationGate } from './components/OrientationGate';
import { NavigationContext, useNavigation } from './hooks/useNavigation';
import { HomePage } from './pages/HomePage';
import { TracingPage } from './pages/TracingPage';
import { CategoryCompletePage } from './pages/CategoryCompletePage';

function AppContent() {
  const navigation = useNavigation();
  const { state } = navigation;

  // Determine which page to show based on navigation state
  let CurrentPage: React.ComponentType;

  if (!state.currentCategory) {
    CurrentPage = HomePage;
  } else if (state.isComplete) {
    CurrentPage = CategoryCompletePage;
  } else {
    CurrentPage = TracingPage;
  }

  return (
    <NavigationContext.Provider value={navigation}>
      <CurrentPage />
    </NavigationContext.Provider>
  );
}

export default function App() {
  return (
    <OrientationGate>
      <AppContent />
    </OrientationGate>
  );
}
