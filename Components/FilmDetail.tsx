import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Platform } from 'react-native'
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native'
import { useAppSelector, useAppDispatch } from '../Store/Hooks/hooks'
import { RootStackParamList } from '../Navigation/Navigation'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import { Film } from '../Helpers/filmsData'
import { actions } from '../Store/Actions/favorite'
import EnlargeShrink from '../Animations/EnlargeShrink'


export default function FilmDetail(){
    const route = useRoute<RouteProp<RootStackParamList, 'FilmDetail'>>()
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const [film, setFilm] = useState<Film | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const stateFavorite = useAppSelector((state) => state.toggleFavorite)
    useEffect(() => {
        async function getData(){
            setIsLoading(true)
            setFilm(await getFilmDetailFromApi(route.params.idFilm))
            setIsLoading(false)
        }
        const favoriteFilmIndex = stateFavorite.favoritesFilm.findIndex(item => item.id === route.params.idFilm)
        if (favoriteFilmIndex !== -1){
            setFilm(stateFavorite.favoritesFilm[favoriteFilmIndex])
        }else{
            getData()
        }
    }, [])
    useEffect(()=>{
        if (!isLoading){
            navigation.setOptions({film: film, sharefilm: shareFilm})
        }
    }, [isLoading])
    const shareFilm = () => {
        if (film){
            Share.share({ title: film.title, message: film.overview })
        }
    }
    const displayFavoriteImage = () => {
        let sourceImage = require('../Images/ic_favorite_border.png')
        let shouldEnlarge = false
        if (film && stateFavorite.favoritesFilm.findIndex(item => item.id === film.id) !== -1) {
            sourceImage = require('../Images/ic_favorite.png')
            shouldEnlarge = true
        }
        return (
            <EnlargeShrink shouldEnlarge={shouldEnlarge}>
                <Image
                    style={styles.favorite_image}
                    source={sourceImage}
                />
            </EnlargeShrink>
        )
    }
    const DisplayFloatingActionButton = () => {
        if (film != undefined) {
          return (
            <TouchableOpacity
              style={styles.share_touchable_floatingactionbutton}
              onPress={() => shareFilm()}>
              <Image
                style={styles.share_image}
                source={Platform.OS === 'android' ? require('../Images/ic_share.android.png') : require('../Images/ic_share.ios.png')} />
            </TouchableOpacity>
          )
        }else{
            return(<></>)
        }
    }
  
    return (
        <View style={styles.main_container}>
            {isLoading ? 
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" color="#00B050"/>
                </View>
            :
                film ?
                <>
                    <ScrollView style={styles.scrollview_container}>
                        {film.backdrop_path &&
                            <Image
                                style={styles.image}
                                source={{uri: getImageFromApi(film.backdrop_path)}}
                            />
                        }
                        <Text style={styles.title_text}>{film.title}</Text>
                        <TouchableOpacity
                            style={styles.favorite_container}
                            onPress={() => dispatch(actions.toggleFavorite(film))}>
                            {displayFavoriteImage()}
                        </TouchableOpacity>
                        <Text style={styles.description_text}>{film.overview}</Text>
                        <Text style={styles.default_text}>Sorti le {film.release_date}</Text>
                        <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
                        <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                        <Text style={styles.default_text}>Budget : {film.budget} $</Text>
                        <Text style={styles.default_text}>Genre(s) : {film.genres && film.genres.map(function(genre){
                            return genre.name;
                            }).join(" / ")}
                        </Text>
                        <Text style={styles.default_text}>Companie(s) : {film.production_companies && film.production_companies.map(function(company){
                            return company.name;
                            }).join(" / ")}
                        </Text>
                    </ScrollView>
                    <DisplayFloatingActionButton/>
                </>
                :
                    <Text>Erreur lors de la recherche du film</Text>
                }
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
      flex: 1
    },
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    scrollview_container: {
      flex: 1
    },
    image: {
      height: 169,
      margin: 5
    },
    title_text: {
      fontWeight: 'bold',
      fontSize: 35,
      flex: 1,
      flexWrap: 'wrap',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      marginBottom: 10,
      color: '#000000',
      textAlign: 'center'
    },
    description_text: {
      fontStyle: 'italic',
      color: '#666666',
      margin: 5,
      marginBottom: 15
    },
    default_text: {
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
    },
    favorite_container: {
        alignItems: 'center',
    },
    favorite_image:{
        flex: 1,
        width: undefined,
        height: undefined
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
      },
      share_image: {
        width: 30,
        height: 30
      },
      share_touchable_headerrightbutton: {
        marginRight: 8
      }
  })