import { Film } from '../../Helpers/filmsData'
export const actions={
    toggleFavorite: (film:Film) => ({ 
        type: "TOGGLE_FAVORITE", 
        value: film 
    })
}