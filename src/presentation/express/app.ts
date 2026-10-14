import 'reflect-metadata';
import express, { Application } from 'express';
import { TripHQContainer } from '../../infrastructure/di/container';
import cors from 'cors';
import { config } from '../../config/env.config';
import cookieParser from 'cookie-parser';
import { buildRoutes } from '../routes';
import { globalErrorHandler } from '../middleware/error/error.middleware';

export class App {
  private readonly app: Application;

  constructor(private readonly container: TripHQContainer) {
    this.app = express();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    this.app.use(
      cors({
        origin: config.frontend_url,
        credentials: true,
      }),
    );

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(): void {
    this.app.get('/', (_, res) => {
      res.send('Kafla API Running...');
    });
    this.app.use('/api/v1', buildRoutes(this.container));
  }

  private initializeErrorHandling(): void {
    this.app.use(globalErrorHandler);
  }

  public getServer(): Application {
    return this.app;
  }
}
