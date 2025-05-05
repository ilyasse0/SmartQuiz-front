export interface DecodedToken {
  role: string;
  fullName: string;
  isActive: boolean;
  userId: number;
  email: string;
  isEnable: boolean;
  sub: string;
  iat: number;
  exp: number;
  authorities: string[];
}
