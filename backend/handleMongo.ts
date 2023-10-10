import { MongoClient, ObjectId } from 'mongodb';
import { DB_CONNECTION } from './config'


const client = new MongoClient( DB_CONNECTION! )

export const getAllStories = async (name: string) => {
    const database = client.db('Wisdiphy')
    const StoriesCollection = database.collection(name)
    const stories = await StoriesCollection.find().toArray()
    return stories
}

