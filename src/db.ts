import { createConnection } from "typeorm";
import { Users } from "./Entities/Users";
import { DB_NAME, DB_PASSWORD, DB_USERNAME, DB_HOST, DB_PORT } from "./config";



export const connectDB = async () => {
    try {
        await createConnection({
            type: "mysql",
            host: DB_HOST,
            port: Number(DB_PORT),
            username: DB_USERNAME,
            password: DB_PASSWORD,
            database: DB_NAME,
            entities: [Users],
            synchronize: true,
            ssl: false
        })
    } catch (error) {
        console.log(error);
    }
}