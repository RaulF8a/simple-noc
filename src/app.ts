import { MongoDatabase } from "./data/mongo";
import { envs } from "./plugins/envs.plugin";
import { Server } from "./presentation/server";

(async () => {
    main();
})();

async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    // Crear un registro
    // const newLog = await LogModel.create({
    //     message: 'Test message desde Mongoose',
    //     origin: 'app.ts',
    //     level: 'low',
    //     createdAt: new Date(),
    // });

    // await newLog.save();

    // console.log(newLog);
    
    // const logs = await LogModel.find();

    // console.log(logs);
    
    Server.start();
}
