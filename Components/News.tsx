import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Film } from '../Helpers/filmsData'
import FilmList from './FilmList'
import { getBestFilmsFromApi } from '../API/TMDBApi'

export default function News() {
    const navigation = useNavigation();
    const [films, setFilms] = useState<Film[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const page = useRef(0)
    const totalPages = useRef(0)
    
    const loadFilms = async () => {
        try{
            setIsLoading(true)
            let data = await getBestFilmsFromApi(page.current+1)
            setFilms([...films, ...data.results])
            page.current = data.page
            totalPages.current = data.total_pages
            setIsLoading(false)
        }catch(e){
            console.log(e)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadFilms()
    }, [])
    return (
        <View style={styles.main_container}>
            {isLoading ? 
                <View  style={styles.loading_container}>
                    <ActivityIndicator size="large" color="#00B050"/>
                </View>
            :
                <FilmList
                    films={films}
                    loadFilms={loadFilms}
                    page={page.current}
                    totalPages={totalPages.current}
                    favoriteList={false} 
                />
                
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
      }
})