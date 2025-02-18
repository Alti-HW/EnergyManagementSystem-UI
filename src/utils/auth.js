
// Your decoding function
export function decodeToken(token) {
  try {
    const arrayToken = token.split('.');
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    return tokenPayload;
  } catch (error) {
    console.error("Invalid token", error);
    throw error
  }
}
