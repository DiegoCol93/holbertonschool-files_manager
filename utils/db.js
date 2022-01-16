import { MongoClient } from 'mongodb';
import { env } from 'process';

class DBClient {
  constructor() {
    // this.connectionSuccesful = false;
    this.dbName = (env.DB_DATABASE !== undefined) ? env.DB_DATABASE : 'files_manager';
    this.host = (env.DB_HOST !== undefined) ? env.DB_HOST : 'localhost';
    this.port = (env.DB_PORT !== undefined) ? env.DB_PORT : '27017';
    this.url = `mongodb://${this.host}:${this.port}`;
    (async () => {
      this.client = new MongoClient(this.url);
      await this.client.connect()
        .catch((err) => {
          this.connectionSuccesful = false;
          console.log('\x1B[93mMongo Connection Error: \x1B[m', err);
        });
      this.connectionSuccesful = true;
      this.db = this.client.db(this.dbName);
    })().catch((err) => {
      console.log('\x1B[91mERROR\x1B[m', err);
    });
  }

  isAlive() {
    return this.connectionSuccesful;
  }

  async nbUsers() {
    const collection = this.db.collection('users');
    return collection.countDocuments({});
  }

  async nbFiles() {
    const collection = this.db.collection('files');
    return collection.countDocuments({});
  }
}

const dbClient = new DBClient();
export default dbClient;
