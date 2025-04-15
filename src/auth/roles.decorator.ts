import { SetMetadata } from '@nestjs/common';

// Definindo a chave do metadata
export const ROLES_KEY = 'roles';

// O decorator que recebe uma lista de roles e as define como metadados para o handler ou controller
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
