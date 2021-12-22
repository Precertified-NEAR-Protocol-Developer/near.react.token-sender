import React from 'react'
import './scss/AppStyles.scss';
import 'regenerator-runtime/runtime'
import './global.css'
import MetaData from './components/MetaData'
import NavbarComponent from './components/NavbarComponent'
import { nearWalletConnection } from './near-wallet-connection';

export default function App() {
  return (
    <React.Fragment>
      <NavbarComponent/>
        {
          (nearWalletConnection.getAccountId()==='') ?
            'You cannot see MetaData associated with the account until you login.'
            :
            <MetaData/>
        }
    </React.Fragment>
  );
} 
