import { configureStore } from '@reduxjs/toolkit'
import { createStore } from 'redux';
import toggleFavorite from './Reducers/favorite'
import { persistCombineReducers, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
}
  
const persistReducers = persistCombineReducers(rootPersistConfig,{toggleFavorite})

export const store = createStore(persistReducers)
export const persistor = persistStore(store)

/*export const store = configureStore({
    reducer: {
        toggleFavorite: toggleFavorite,
    }
})*/

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


  
