import React from 'react'
import './scss/AppStyles.scss';
import 'regenerator-runtime/runtime'
import './global.css'
import MetaData from './components/MetaData'
import NavbarComponent from './components/NavbarComponent'
import TokenSender from './components/TokenSender';
import { Container, Row } from 'react-bootstrap';

const isUserLoggedIn = () => {
  const currentAccountId = window.accountId;
  const isAccountIdUndefined = 'undefined' === typeof currentAccountId;
  const isAccountIdEmpty = '' === currentAccountId;
  const isAccountIdNull = null === currentAccountId;
  const isNotLoggedIn = isAccountIdUndefined || isAccountIdEmpty || isAccountIdNull;
  return !isNotLoggedIn;
};

export default function App() {
  return (
    <React.Fragment>
      <NavbarComponent/>
      {
        (!isUserLoggedIn()) ?
          'You cannot see MetaData associated with the account until you login.'
          :
          <div id="login-view">
            <Container>
              <Row className="d-flex justify content center"><MetaData/></Row>
              <Row className="d-flex justify content center"><TokenSender/></Row>
            </Container>
          </div>
      }
    </React.Fragment>
  );
} 
