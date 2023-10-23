import express, { Request, Response, NextFunction } from 'express';
import { getCollection, addEntry, deleteEntry } from './handleMongo'
const app = express()
const PORT = 8000

// USE REQUESTS
app.use(express.json())
app.use((req:Request, res:Response, next:NextFunction) => {
    console.log(req.method, req.url)
    next()
})

// GET REQUEST FOR THE STORIES
app.get('/stories', async (req:Request, res:Response) => {
    const stories = await getCollection('Stories')
    if (stories.length != 0) {
        res.send(stories).status(200)
    } else{
        res.send([]).status(500)
    }
})

// GET REQUEST FOR THE NOTES
app.get('/notes', async (req:Request, res:Response) => {
    const notes = await getCollection('Notes')
    if (notes.length != 0) {
        res.send(notes).status(200)
    } else{
        res.send([]).status(500)
    }
})

// POST REQUEST FOR THE NOTES
app.post('/notes', async (req:Request, res:Response) => {
    console.log(req.body)
    if (!req.body.noteBody || !req.body.associatedStory) {
        res.status(400).json({ error: 'noteBody and associatedStory is required.' });
        return;
    }

    const entry = {noteBody: req.body.noteBody, associatedStory: req.body.associatedStory}
    addEntry('Notes', entry)
})

// DELETE REQUEST FOR THE NOTES
app.delete('/api/delete_data', (req, res) => {
    console.log(`DELETE REQUEST SENT FOR ${req.body.id}!`)
    deleteEntry('Notes', req.body.id)
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})