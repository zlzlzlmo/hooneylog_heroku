import * as jwt from 'jsonwebtoken';

class JWT {
  constructor(
    private readonly userId: string,
    private readonly nickName: string,
  ) {}
  async generateJWT() {
    const token: string = await jwt.sign(
      {
        userId: this.userId,
        nickName: this.nickName,
      },
      process.env.JSON_TOKEN_KEY,
      {
        expiresIn: 360000,
      },
    );

    return token;
  }
}

export default JWT;
