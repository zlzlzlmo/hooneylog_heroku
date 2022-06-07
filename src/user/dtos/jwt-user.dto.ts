interface IJwtResponseDto {
  message: string;
  token: string;
}

export class JwtResponseDto {
  messsage: string;
  token: string;

  constructor(obj: IJwtResponseDto) {
    Object.assign(this, obj);
  }
}
