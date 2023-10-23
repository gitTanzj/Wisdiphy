import { createContext, useReducer} from 'react'

export const NotesContext = createContext()

export const notesReducer = (state, action) => {
    switch(action.type){
        case 'SET_NOTES':
            return {
                notes: action.payload
            }
        case 'CREATE_NOTE':
            if (action.payload.associatedStory in state.notes){
                return {
                    notes : state.notes.filter((note) => {
                        if (note.associatedStory === action.payload.associatedStory){
                            note.noteBody = action.payload.noteBody
                        }
                    })
                }
            }
            return {
                notes: [action.payload, ...state.notes]
            }
        case 'DELETE_NOTE':
            return {
                notes: state.notes.filter((ob) => ob._id !== action.payload)
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

