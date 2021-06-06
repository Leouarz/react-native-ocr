import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../Store/Hooks/hooks'
import FilmItem from './FilmItem'
import { Film } from '../Helpers/filmsData'

export default function FilmList(props: {films:Film[], loadFilms: Function, page:number, totalPages:number, favoriteList:boolean}){
    const {films, loadFilms, page, totalPages, favoriteList} = props
    const navigation = useNavigation();
    const stateFavorite = useAppSelector((state) => state.toggleFavorite)
    const displayDetailForFilm = (id:number) => {
        navigation.navigate("FilmDetail", { idFilm: id })
    }
    return(
        <FlatList
            style={styles.list}
            data={films}
            extraData={stateFavorite.favoritesFilm}
            keyExtractor={(item:Film) => item.id.toString()}
            renderItem={({item}) => 
                <FilmItem 
                    film={item} 
                    displayDetailForFilm={displayDetailForFilm}
                    isFilmFavorite={
                        stateFavorite.favoritesFilm.findIndex((film:Film) => film.id === item.id)>=0
                    } 
                />
            }
            onEndReachedThreshold={0.5}
            onEndReached={()=>{
                if (!favoriteList && page < totalPages) {
                    loadFilms()
                }
            }}
        />
    )
}

const styles = StyleSheet.create({
    list: {
      flex: 1
    }
  })