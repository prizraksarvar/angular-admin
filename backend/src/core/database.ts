import "reflect-metadata";
import {Connection, createConnection} from "typeorm";


const database = new Promise<Connection>((resolve,reject) => {
    createConnection().then(async connection => resolve(connection)).catch(error => reject(error));
});

export default database;
