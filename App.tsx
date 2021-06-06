import React from 'react';
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import { store, RootState } from './Store/store'

export default function App(){
    return (
      <Provider store={store}>
        <Navigation/>
      </Provider>
    )
}

