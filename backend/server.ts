import express, { Request, Response, NextFunction } from 'express';
import { getCollection } from './handleMongo'
const app = express()
const PORT = 8000

app.use(express.json())
app.use((req:Request, res:Response, next:NextFunction) => {
    console.log(req.method, req.url)
    next()
})

app.get('/', async (req:Request, res:Response) => {
    const stories = await getCollection('Stories')
    res.send(stories).status(200)
})


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})