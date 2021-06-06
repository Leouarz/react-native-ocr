// @ts-ignore
import { MOVIES_API_KEY } from "@env"

const API_TOKEN:string = MOVIES_API_KEY;

export async function getFilmsFromApiWithSearchedText (text:string, page:number) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
    try{
        let response = await fetch(url)
        return response.json()
    }catch(e){
        console.error(e)
    }
}

export async function getFilmDetailFromApi  (id:number) {
    const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr'
    try{
        let response = await fetch(url)
        return response.json()
    }catch(e){
        console.error(e)
    }
}

export function getImageFromApi (name:string): string {
    return 'https://image.tmdb.org/t/p/w300' + name
  }
