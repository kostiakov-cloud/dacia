import React from 'react';
import Home from './pages/Home';

// Component showcase lives at /#/showcase and is loaded lazily, so it never ships with the home page.
const Showcase = React.lazy(() => import('./Showcase'));

export default function App() {
  const [hash, setHash] = React.useState(() => window.location.hash);
  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (hash === '#/showcase') {
    return (
      <React.Suspense fallback={null}>
        <Showcase />
      </React.Suspense>
    );
  }
  return <Home />;
}
