import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// const dotenv = require("dotenv");
// const dotenv = require('./dotenv.js');
import { Database } from './config/databases/mongodb';
import userRouter from './routes/user.routes';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.enviroments();
    this.database();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static('assets'));
    this.app.use(cors());
  }

  private enviroments() {
    dotenv.config();
  }

  private async database() {
    try {
      const mongodb = new Database();
      await mongodb.connect();
    } catch (error) {
      console.error(error);
    }
  }

  routes() {
    this.app.use('/api/users', userRouter);
  }
}
const application = new App();
export default application.app;
