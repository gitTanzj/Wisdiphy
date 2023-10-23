import { NotesContext } from '../context/NotesContext'
import { useContext } from 'react'

export default function useNotesContext() {
    const context = useContext(NotesContext)

    if(!context) {
        throw Error("useNotesContext must be used within a NotesContextProvider")
    }

    return context
}