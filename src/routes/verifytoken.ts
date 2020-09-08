import express from 'express';
import { currentUser, IUserIdResolveBody, LoginMode, BadRequestError } from '@prashanthsarma/property-portal-common';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { JWTHelper } from '../services/jwtHelper';


const router = express.Router();

router.post('/api/users/verifyGoogleToken', async (req, res) => {
  const { idToken } = req.body;
  const payload = await JWTHelper.verifyJWT(idToken)

  if (!payload || !payload.email) {
    throw new BadRequestError('Could not verify your Google credentials');
  }

  const { email } = payload;

  let user = null;
  const existingUser = await User.findOne({ email });
  console.log(existingUser)
  if (!existingUser) {
    // Add a new gmail user to our db
    user = User.build({ email, password: 'unset', loginMode: LoginMode.gmail });
    await user.save();
  }
  else {
    user = existingUser;
  }
  const userJwt = JWTHelper.generateUserJWT(user)
  console.log(userJwt);
  // Store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(200).send(user);
});

export { router as verifyTokenRouter };
