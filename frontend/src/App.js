import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import Login from './login';
import Register from './register';
import axios from 'axios';
import logo from './img/logo.png';
import Notes from './Components/Notes/Notes'; // Notlar bileşenini import edin



function App() {
  const [active, setActive] = useState(1);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      getUserData();
    }
  }, []);

  const getUserData = async () => {
    try {
      const response = await axios.get('/api/v1/user');
      setLoggedInUser(response.data.user);
    } catch (error) {
      console.log('Hata:', error);
    }
  };

  const handleLogin = (user) => {
    setLoggedInUser(user);
    localStorage.setItem('token', user.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = '';
  };

  const handleRegister = (user) => {
    setLoggedInUser(user);
    localStorage.setItem('token', user.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  };

  const displayData = () => {
    if (!loggedInUser) {
      return (
        <div>
          <Login onLogin={handleLogin} />
          <Register onRegister={handleRegister} />
        </div>
      );
    } else {
      return (
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/income">
            <Income />
          </Route>
          <Route path="/expenses">
            <Expenses />
          </Route>
          <Route path="/notes">
            <Notes />
          </Route>
          <Redirect to="/dashboard" />
        </Switch>
      );
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

 
  return (
    <Router>
      <AppStyled bg={bg} className="App">
        {orbMemo}
        <MainLayout>
          {loggedInUser && (
            <Navigation active={active} setActive={setActive} onLogout={handleLogout} loggedInUser={loggedInUser} />
          )}
          <main>
          <div className="logo-container">
              <img src={logo} alt="Logo" className="logo" />
            </div>
            {displayData()}</main>
        </MainLayout>
      </AppStyled>
    </Router>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
