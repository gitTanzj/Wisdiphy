import { MongoClient, ObjectId } from 'mongodb';
import { DB_CONNECTION } from './config'


const client = new MongoClient( DB_CONNECTION! )

export const getCollection = async (name: string) => {
    const database = client.db('Wisdiphy')
    const collection = database.collection(name)
    const collectionFetched = await collection.find().toArray()
    return collectionFetched
}

export const addEntry = async (name:string, entry: {noteBody: string, associatedStory: string}) => {
    const database = client.db('Wisdiphy')
    const notesCollection = database.collection(name);
    await notesCollection.insertOne(entry)
}

export const deleteEntry = async (name:string, id:string) => {
    const database = client.db('Wisdiphy')
    const notesCollection = database.collection(name);
    await notesCollection.deleteOne({"_id" : new ObjectId(id)})
}

