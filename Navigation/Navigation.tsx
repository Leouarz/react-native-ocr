import React from 'react'
import { StyleSheet, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator  } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'
import News from '../Components/News'

export type RootStackParamList = {
  Search: undefined
  FilmDetail: { idFilm: number }
  Favorites: undefined
  Test: undefined
  News: undefined
};

const StackSearch = createStackNavigator<RootStackParamList>();

function SearchStackNavigator(){
  return(
      <StackSearch.Navigator initialRouteName="Search">
        <StackSearch.Screen name="Search" component={Search} options={{ title: 'Rechercher' }}/>
        <StackSearch.Screen name="FilmDetail" component={FilmDetail} options={{ title: 'Détail' }}/>
      </StackSearch.Navigator>
  )
}

const StackFavorites = createStackNavigator<RootStackParamList>();

function FavoritesStackNavigator(){
  return(
      <StackFavorites.Navigator initialRouteName="Favorites">
        <StackFavorites.Screen name="Favorites" component={Favorites} options={{ title: 'Favoris' }}/>
        <StackFavorites.Screen name="FilmDetail" component={FilmDetail} options={{ title: 'Détail' }}/>
      </StackFavorites.Navigator>
  )
}

const StackNews = createStackNavigator<RootStackParamList>();

function NewsStackNavigator(){
  return(
      <StackNews.Navigator initialRouteName="News">
        <StackNews.Screen name="News" component={News} options={{ title: 'Nouveautés' }}/>
        <StackNews.Screen name="FilmDetail" component={FilmDetail} options={{ title: 'Détail' }}/>
      </StackNews.Navigator>
  )
}

const Tab = createBottomTabNavigator<RootStackParamList>()

export default function MoviesTabNavigator(){
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeBackgroundColor: '#00B050',
          inactiveBackgroundColor: '#FFFFFF',
          showLabel: false,
        }}
      >
        <Tab.Screen 
          name="Search" 
          component={SearchStackNavigator}
          options={{tabBarIcon: () => 
            <Image
              source={require('../Images/ic_search.png')}
              style={styles.icon}
            />
          }}
        />
        <Tab.Screen
          name="Favorites" 
          component={FavoritesStackNavigator}
          options={{tabBarIcon: () => 
            <Image
              source={require('../Images/ic_favorite.png')}
              style={styles.icon}
            />
          }}
        />
        <Tab.Screen
          name="News" 
          component={NewsStackNavigator}
          options={{tabBarIcon: () => 
            <Image
              source={require('../Images/ic_fiber_new.png')}
              style={styles.icon}
            />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})
