import express, { Request, Response, NextFunction } from 'express';
import { getCollection, addEntry, deleteEntry } from './handleMongo'
const app = express()
const PORT = 8000
import os, { NetworkInterfaceInfo } from 'os';

const getLocalIP = () => {
        const networkInterfaces: NodeJS.Dict<NetworkInterfaceInfo[]> = os.networkInterfaces();
        for (const name of Object.keys(networkInterfaces)) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            for (const net of networkInterfaces[name]?.filter(net => net.family === 'IPv4') ?? []) {
                return net.address;
            }
        }
        return 'localhost';
};

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
    if (!req.body.noteBody || !req.body.associatedStory) {
        res.status(400).json({ error: 'noteBody and associatedStory is required.' });
        return;
    }

    const entry = {noteBody: req.body.noteBody, associatedStory: req.body.associatedStory}
    await addEntry('Notes', entry)
})

app.delete('/notes/:id', async (req:Request, res:Response) => {
    await deleteEntry('Notes', req.params.id)
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT} on ${getLocalIP()}`)
})