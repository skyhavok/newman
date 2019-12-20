import bodyParser from 'body-parser';
import { MicroframeworkSettings } from 'microframework/MicroframeworkSettings';
import { logConsole, logError } from '../utils/log';
import { ErrorWithStatus } from '../types/node.extensions';
import { Application } from 'express';

export const expressLoader = (
  settings: MicroframeworkSettings,
): Promise<void> => {
  const loaderName = 'expressLoader';

  return new Promise((resolve, reject) => {
    try {
      const app: Application = settings.getData('express_app');
      const port: number = settings.getData('port');

      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());

      app
        .listen(port, () => {
          logConsole(`--- ${loaderName} loaded`);

          resolve();
        })
        .on('error', function(err: ErrorWithStatus) {
          if (err.code === 'EADDRINUSE') {
            logError(`----- Port ${port} is busy`, err);
          }
          reject();
        });
    } catch (err) {
      logError(`--- ${loaderName} error`, err);
      reject();
    }
  });
};
