import express from 'express';
import { currentUser , IUserIdResolveBody} from '@prashanthsarma/property-portal-common';
import mongoose from 'mongoose';
import { User } from '../models/user';


const router = express.Router();

router.post('/api/users/resolve', currentUser, async (req, res) => {
  const { ids } = req.body as IUserIdResolveBody;
  const idObjects = ids.map(i => mongoose.Types.ObjectId(i))

  const users = await User.find({
    '_id': { $in: idObjects }
  });

  
  res.send(users);
});

export { router as resolveUserRouter };
