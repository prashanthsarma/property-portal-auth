import { UserDoc } from "../models/user";
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library'
import { BadRequestError } from "@prashanthsarma/property-portal-common";

export class JWTHelper {

  public static generateUserJWT = (existingUser: UserDoc) => {
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        loginMode: existingUser.loginMode,
      },
      process.env.JWT_KEY!
    );
    return userJwt;
  }

  public static verifyJWT = async (idToken: string) => {
    const client = new OAuth2Client("55275377596-kn8ji1se8ahj599eubrqp09sb38thodk.apps.googleusercontent.com");
    try {
      const ticket = await client.verifyIdToken({ idToken })
      const payload = ticket.getPayload();
      return payload;
    }   
    catch (e) {
      throw new BadRequestError('Invalid Token');
    }
  }

}