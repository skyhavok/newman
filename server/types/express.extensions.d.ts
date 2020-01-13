import * as express from 'express';
import { UserDocument } from './../api/data/interfaces/user.interface';
interface Request extends express.Request {
  user?: UserDocument;
}
type Response = express.Response;
type NextFunction = express.NextFunction;

export { Request, Response, NextFunction };
