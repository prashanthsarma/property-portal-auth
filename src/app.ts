import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { errorHandler, NotFoundError } from '@prashanthsarma/property-portal-common';
import { logger } from '@prashanthsarma/property-portal-common/build/middlewares/logger';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { resolveUserRouter } from './routes/resolve';
import { verifyTokenRouter } from './routes/verifytoken';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false, //process.env.NODE_ENV !== 'test',
  })
);
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ credentials: true, origin: "http://app.test.com:3000" }))
}

app.use(verifyTokenRouter);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(resolveUserRouter)


app.all('*', async (req, res) => {
  throw new NotFoundError();
});
// app.use(logger);
// app.use(errorHandler);

export { app };
