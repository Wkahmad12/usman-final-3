import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import TV from './pages/tv-list/TV';  
import UpComing from './pages/Up/UpComing';
import Song from './pages/Song/Song';


const App = () => {
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = useState(false);  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In");
        
        if (window.location.pathname === '/login') {
          navigate('/');
        }
      } else {
        console.log("Logged Out");
        setIsLoggedOut(true);  // Set logout state to true when logged out
        navigate('/login');
      }
    });

    return () => unsubscribe(); 
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth); 
      setIsLoggedOut(true);  
      navigate('/login');  
    } catch (error) {
      console.log("Sign out error:", error);
    }
  };

  return (
    <div>
      <Routes>
        
        <Route path="/" element={<Home onSignOut={handleSignOut} />} />
        <Route path="/login" element={<Login isLoggedOut={isLoggedOut} />} />
    
        <Route path="/tvshows" element={<TV />} />
        <Route path="/UpComing" element={<UpComing />} />
        <Route path="/Song" element={<Song />} />
        
      </Routes>
    </div>
  );
};

export default App;
