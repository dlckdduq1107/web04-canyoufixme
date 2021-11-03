import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  NavLink,
  Redirect,
} from 'react-router-dom';
import './App.css';

import styled from '@cyfm/styled';
import logo from './assets/images/upscale.png';

import DebugPage from './pages/DebugPage';
import WritePage from './pages/WritePage';

const Header = styled.header`
  color: white;
  background-color: #1d2122;
  min-height: 80px;
  width: 100%;
  display: flex;
`;

const Nav = styled.nav`
  display: flex;
  margin-left: auto;
  background-color: #1d2122;
  width: 30%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const Logo = styled.img`
  max-height: 80px;
  width: auto;
`;

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header>
          <Logo src={logo} alt="canyoufixme logo" />
          <Nav>
            <NavLink activeClassName="active-router" to="/">
              홈으로
            </NavLink>
            <NavLink activeClassName="active-router" to="/debug">
              문제 풀이
            </NavLink>
            <NavLink activeClassName="active-router" to="/write">
              문제 제출
            </NavLink>
          </Nav>
        </Header>
        <Switch>
          <Route path="/" exact />
          <Route path="/debug" exact component={DebugPage} />
          <Route path="/write" exact component={WritePage} />
          <Redirect path="*" to="/notfound" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
