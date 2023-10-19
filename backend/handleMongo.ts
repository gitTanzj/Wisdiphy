import { MongoClient } from 'mongodb';
import { DB_CONNECTION } from './config'


const client = new MongoClient( DB_CONNECTION! )

export const getCollection = async (name: string) => {
    const database = client.db('Wisdiphy')
    const collection = database.collection(name)
    const collectionFetched = await collection.find().toArray()
    return collectionFetched
}

