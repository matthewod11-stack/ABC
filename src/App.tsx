import { OrientationGate } from './components/OrientationGate';
import { NavigationContext, useNavigation } from './hooks/useNavigation';
import { TracingStateProvider } from './hooks/useTracingState';
import { PageBackground, FloatingDecor } from './components/effects';
import { HomePage } from './pages/HomePage';
import { TracingPage } from './pages/TracingPage';
import { CategoryCompletePage } from './pages/CategoryCompletePage';

type PageType = 'home' | 'tracing' | 'complete';

function AppContent() {
  const navigation = useNavigation();
  const { state } = navigation;

  // Determine which page to show based on navigation state
  let CurrentPage: React.ComponentType;
  let pageType: PageType;

  if (!state.currentCategory) {
    CurrentPage = HomePage;
    pageType = 'home';
  } else if (state.isComplete) {
    CurrentPage = CategoryCompletePage;
    pageType = 'complete';
  } else {
    CurrentPage = TracingPage;
    pageType = 'tracing';
  }

  return (
    <NavigationContext.Provider value={navigation}>
      <PageBackground page={pageType} />
      <FloatingDecor count={10} />
      <div className="relative z-10 h-full">
        <CurrentPage />
      </div>
    </NavigationContext.Provider>
  );
}

export default function App() {
  return (
    <OrientationGate>
      <TracingStateProvider>
        <AppContent />
      </TracingStateProvider>
    </OrientationGate>
  );
}
