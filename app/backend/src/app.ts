import express = require('express');
import cors = require('cors');
import loginRouter from './routers/loginRouter';
import clubsRouter from './routers/clubsRouter';
import matchRouter from './routers/matchRouter';
import leaderboardRouter from './routers/leaderboardRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());

    this.app.use('/matchs', matchRouter);
    this.app.use('/login', loginRouter);
    this.app.use('/clubs', clubsRouter);

    this.app.use('/leaderboard', leaderboardRouter);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => `Rodando na porta ${PORT}`);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
