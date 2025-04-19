import React from 'react';
import { AnimationProvider } from './context/AnimationContext';
import ProfileContainer from './components/ProfileContainer';
import './styles/App.css';

function App() {
  return (
    <AnimationProvider>
      <div className="app">
        <main className="main-content">
          <ProfileContainer />
        </main>
      </div>
    </AnimationProvider>
  );
}

export default App;