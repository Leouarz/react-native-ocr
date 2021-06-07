import React from 'react';
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import { store, persistor } from './Store/store'
import { PersistGate } from 'redux-persist/es/integration/react'


export default function App(){
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation/>
        </PersistGate>
      </Provider>
    )
}

