import { MongoClient, ObjectId } from 'mongodb';
import { DB_CONNECTION } from './config'

// CONNECT TO THE DATABASE
const client = new MongoClient( DB_CONNECTION! )

// GET ALL ITEMS FROM A COLLECTION FROM THE DATABASE
export const getCollection = async (name: string) => {
    const database = client.db('Wisdiphy')
    const collection = database.collection(name)
    const collectionFetched = await collection.find().toArray()
    return collectionFetched
}

// ADD ONE NOTE TO THE NOTES COLLECTION
export const addEntry = async (name:string, entry: {noteBody: string, associatedStory: string}) => {
    const database = client.db('Wisdiphy')
    const notesCollection = database.collection(name);
    const existingEntry = await notesCollection.findOne({associatedStory: entry.associatedStory})
    if (existingEntry) {
        await notesCollection.updateOne({associatedStory: entry.associatedStory}, {$set: {noteBody: entry.noteBody}})
    } else {
        await notesCollection.insertOne(entry)
    }
    
}

// DELETE ONE NOTE FROM THE NOTES COLLECTION
export const deleteEntry = async (name:string, id:string) => {
    const database = client.db('Wisdiphy')
    const notesCollection = database.collection(name);
    await notesCollection.deleteOne({"_id" : new ObjectId(id)})
}

