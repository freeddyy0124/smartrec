import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const JWT_KEY = 'secret_key'

export const currentUser = (
  req,
  res,
  next
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
        JWT_KEY
    );
    req.currentUser = payload;
  } catch (err) {}

  next();
};
