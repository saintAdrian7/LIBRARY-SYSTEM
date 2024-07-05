import dotenv from 'dotenv'

dotenv.config()
const MONGO_URI: string = process.env.MONGO_URI!;
const PORT: number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 4000;
const ROUNDS:number = process.env.SERVER_ROUNDS ? Number(process.env.SERVER_ROUNDS) : Math.floor(Math.random() * 11)


export const config = {
    mongo: {
        url:MONGO_URI as string
    },
    server: {
        port:PORT,
        rounds:ROUNDS
    }
}