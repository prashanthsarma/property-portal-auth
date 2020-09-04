import { BaseService } from "../BaseService"
import { CurrentConfig } from "../../config/config"



export class AuthService extends BaseService{
  private AUTH_URL = `${CurrentConfig.BASE_URL}\\user`

  public SignIn(request: ISignIn){
    const signInUrl = `${this.AUTH_URL}\signin`;
    this.callAPI(signInUrl, )
  }
}