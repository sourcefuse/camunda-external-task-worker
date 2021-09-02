import { getWorkerConfiguration } from '../factories';

export class TokenService {
  private static instance: TokenService;
  private _token: string;
  private _expiresAtTime: number;

  private constructor() {
    this._expiresAtTime = Date.now();
    this._token = TokenService.generateToken();
  }

  // TODO: inject dependencies
  private static generateToken() {
    const workerConfiguration = getWorkerConfiguration(process);
    console.log(workerConfiguration);
    // TODO: return generated token
    return '';
  }

  public static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    return TokenService.instance;
  }

  public getToken(): string {
    if (this._expiresAtTime < Date.now()) {
      return this._token;
    }
    this._expiresAtTime = Date.now();
    this._token = TokenService.generateToken();
    return this._token;
  }
}
