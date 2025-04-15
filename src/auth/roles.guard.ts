import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator'; // O decorator que define as roles necessárias para o acesso

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtém as roles necessárias para o método ou controller, usando o ROLES_KEY definido no decorator
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(), // Obtém as roles para o handler do método (rota)
      context.getClass(),   // Ou para o controller inteiro, se aplicável
    ]);
    
    // Se não houver roles definidas, permite o acesso
    if (!requiredRoles) {
      return true;
    }

    // Obtém o usuário da requisição
    const { user } = context.switchToHttp().getRequest();

    // Verifica se o usuário tem pelo menos uma role que corresponda às roles necessárias
    return requiredRoles.some((role) => user.role === role);
  }
}
