export class JwtDecoder {
  decodeJwt(jwt: string): {header: any, payload: any, signature: string} {
    const tokenParts = jwt.split('.');

    if(tokenParts.length !== 3) {
      throw new Error("Invalid JWT format");
    }

    const [encodedHeader, encodedPayload, signature] = tokenParts;

    const decodedHeader = JSON.parse(atob(encodedHeader));
    const decodedPayload = JSON.parse(atob(encodedPayload));
    return {
      header: decodedHeader,
      payload: decodedPayload,
      signature: signature
    }
  }
}
