import React, {useState, useRef} from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Film } from '../Helpers/filmsData'
import FilmList from './FilmList'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

export default function Search() {
    const navigation = useNavigation();
    const [films, setFilms] = useState<Film[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const page = useRef(0)
    const totalPages = useRef(0)
    const searchText = useRef("")
    const isSearch = useRef(false)
    
    const loadFilms = async () => {
        try{
            if (searchText.current.length > 0){
                setIsLoading(true)
                let data = await getFilmsFromApiWithSearchedText(searchText.current, page.current+1)
                if(isSearch.current){
                    setFilms(data.results)
                }else{
                    setFilms([...films, ...data.results])
                }
                page.current = data.page
                totalPages.current = data.total_pages
                isSearch.current=false
                setIsLoading(false)
            }
        }catch(e){
            console.log(e)
            setIsLoading(false)
        }
    }
    const searchFilms = async () => {
        page.current = 0
        totalPages.current = 0
        isSearch.current=true
        await loadFilms()
    }
    const searchTextInputChanged = (text:string) => {
        searchText.current = text
    }
    return (
        <View style={styles.main_container}>
            <TextInput 
                style={styles.textinput} 
                placeholder='Titre du film'
                onChangeText={(text)=>searchTextInputChanged(text)}
                onSubmitEditing={() => searchFilms()}
            />
            <Button title='Rechercher' onPress={() => searchFilms()}/>
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
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
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