// src/usuarios/dto/update-usuario.dto.ts
export class UpdateUsuarioDto {
    readonly nome?: string;
    readonly email?: string;
    readonly senha?: string;
    readonly role?: 'gestor' | 'coordenador' | 'professor' | 'aluno';
    readonly escola_id?: number;
    readonly status?: boolean;
  }
  