import { jwtDecode } from 'jwt-decode';

export function decodedToken(token: string) {
  if (!token) {
    return null;
  }

  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}
