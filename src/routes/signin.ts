import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, BadRequestError } from '@prashanthsarma/property-portal-common';
import { ISignInRequestBody, LoginMode } from '@prashanthsarma/property-portal-common/build/interfaces/auth';
import { Password } from '../services/password';
import { User } from '../models/user';
import { JWTHelper } from '../services/jwtHelper';



const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body as ISignInRequestBody;

    const existingUser = await User.findOne({ email, loginMode: LoginMode.manual });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    // Generate JWT
    const userJwt = JWTHelper.generateUserJWT(existingUser)

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
