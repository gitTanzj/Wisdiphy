import { createContext, useReducer} from 'react'

export const NotesContext = createContext()

export const notesReducer = (state, action) => {
    switch(action.type){
        case 'SET_NOTES':
            return {
                notes: action.payload
            }
        case 'CREATE_NOTE':
            return {
                notes: [action.payload, ...state.notes]
            }
        case 'UPDATE_NOTE':
            return {
                notes: state.notes.map(note =>
                    note.associatedStory === action.payload.associatedStory ? action.payload : note
                )
            }
        case 'DELETE_NOTE':
            return {
                notes: state.notes.filter(note => note.associatedStory !== action.payload)
            }
        default:
            return state
    }
} 

export const NotesContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(notesReducer, {
        notes: []
    })

    return (
        <NotesContext.Provider value={{...state, dispatch}}>
            {children}
        </NotesContext.Provider>
    )
}

