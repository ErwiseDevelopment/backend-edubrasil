// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrai o token do header Authorization
      ignoreExpiration: false, // Não ignora a expiração do token
      secretOrKey: process.env.JWT_SECRET || 'secretKey', // Use variáveis de ambiente para a chave secreta
    });
  }

  // Validação do payload do token. O retorno é adicionado à propriedade request.user
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, roles: payload.roles };
  }
}
