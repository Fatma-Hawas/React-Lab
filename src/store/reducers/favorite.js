const INITIAL_VALUE = {
    favorite:0
}

export default function favoriteReducer(state= INITIAL_VALUE, action){
    switch(action.type){
        case "ADD_FAVORITE":
            return{
                ...state,
                favorite: action.payload
            }
        default: 
            return state
    }
}