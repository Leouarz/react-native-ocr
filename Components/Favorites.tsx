import React from 'react'
import { StyleSheet } from 'react-native'
import { Film } from '../Helpers/filmsData'
import FilmList from './FilmList'
import { useAppSelector } from '../Store/Hooks/hooks'

export default function Favorites(props:{films:Film[], }){
    const stateFavorite = useAppSelector((state) => state.toggleFavorite)
    return (
        <FilmList
            films={stateFavorite.favoritesFilm}
            favoriteList={true} 
            loadFilms={()=>(console.log("a"))}
            page={-1}
            totalPages={-1}
        />

    )
}

const styles = StyleSheet.create({})