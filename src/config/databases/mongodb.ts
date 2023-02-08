import mongoose from 'mongoose';
export class Database {
  private dbHost: string;
  private dbName: string;
  // private dbUser: string;
  // private dbPassword: string;
  // private dbPort: number
  constructor() {
    if (process.env.DB_HOST) {
      this.dbHost = process.env.DB_HOST || '';
      this.dbName = process.env.DB_NAME || '';
    } else {
      throw 'Enviroments no reconocidos';
    }
  }
  async connect() {
    try {
      await mongoose.connect(`mongodb://${this.dbHost}/${this.dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });

      console.log('BD conectado');
    } catch (error) {
      throw 'Sin conexion a BD';
    }
  }
}
