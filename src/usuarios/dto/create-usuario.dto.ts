import { IsEmail, IsOptional, IsEnum, IsInt, Min, IsNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  readonly nome: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly senha: string;

  @IsEnum(['gestor', 'coordenador', 'professor', 'aluno'])
  readonly role: 'gestor' | 'coordenador' | 'professor' | 'aluno';

  @IsOptional()
  @IsInt()
  @Min(1) // Verifica se o ID da escola é válido
  readonly escola_id?: number;  // Opcional
}
