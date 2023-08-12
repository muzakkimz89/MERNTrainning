import { Client } from "pg";

export const client=new Client({
    host:"localhost",
    user: "postgres",
    port: 5432,
    password: "Thinkpad123456",
    database:"MERNTask"
})