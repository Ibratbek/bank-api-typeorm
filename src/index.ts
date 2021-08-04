import { createConnection } from 'typeorm'
import express from 'express';
import { Client } from './entities/Client';
import { Banker } from './entities/Banker';
import { Transaction } from './entities/Transaction';
import { ClientController } from './routes/ClientController';
import { BankerController } from './routes/BankerController';
import { TransactionController } from './routes/TransactionController';
import { connect_bankers_to_client } from './routes/connect_bankers_to_client';

const app = express();

const main = async () => {
    try {
        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "ibrat",
            password: "ibratbek6677",
            database: "typeorm",
            entities: [Client, Banker, Transaction],
            synchronize: true
        });
        console.log("Connected Postgresql");
        app.use(express.json());
        app.use(ClientController);
        app.use(BankerController);
        app.use(TransactionController);
        app.use(connect_bankers_to_client);

        app.listen(5000, () => console.log(`Server is running 5000-port`));
    } catch (e) {
        console.error(e.message);
        throw new Error("Unable to connect to Postgres")
    }
}

main()