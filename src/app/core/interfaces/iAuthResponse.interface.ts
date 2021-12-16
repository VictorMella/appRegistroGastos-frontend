export interface IAuthResponse {
 usuario: AuthResponse
}

export interface AuthResponse {
  ok: boolean;
  uid?: string;
  name?: string;
  email?: string;
  token?: string;
  mensaje?: string;
}
