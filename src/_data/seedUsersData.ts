import { UserDoc, User } from "../models/user";

export const seedUserData: UserDoc[] = [
  User.build({
    "_id": "5d7a514b5d2c12c7449be043",
    "email": "seeder@default.com",
    "password": "seeder"
  })
]