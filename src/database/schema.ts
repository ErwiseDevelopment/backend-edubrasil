// src/database/schema.ts
import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  timestamp,
  integer,  // Utilizamos 'integer' em vez de 'int'
  date,
  jsonb,
} from 'drizzle-orm/pg-core';

// Tabela prefeituras
export const prefeituras = pgTable('prefeituras', {
  prefeituras_id: serial('prefeituras_id').primaryKey(),
  prefeituras_nome: varchar('prefeituras_nome', { length: 255 }).notNull(),
  prefeituras_endereco: varchar('prefeituras_endereco', { length: 255 }),
  prefeituras_contato: varchar('prefeituras_contato', { length: 255 }),
  prefeituras_status: boolean('prefeituras_status').notNull().default(true),
  prefeituras_created_at: timestamp('prefeituras_created_at').defaultNow().notNull(),
  prefeituras_updated_at: timestamp('prefeituras_updated_at').defaultNow().notNull(),
});

// Tabela escolas
export const escolas = pgTable('escolas', {
  escolas_id: serial('escolas_id').primaryKey(),
  escolas_prefeitura_id: integer('escolas_prefeitura_id').notNull(),
  escolas_nome: varchar('escolas_nome', { length: 255 }).notNull(),
  escolas_endereco: varchar('escolas_endereco', { length: 255 }),
  escolas_contato: varchar('escolas_contato', { length: 255 }),
  escolas_status: boolean('escolas_status').notNull().default(true),
  escolas_created_at: timestamp('escolas_created_at').defaultNow().notNull(),
  escolas_updated_at: timestamp('escolas_updated_at').defaultNow().notNull(),
});

// Tabela periodos_escolares
export const periodos_escolares = pgTable('periodos_escolares', {
  periodos_escolares_id: serial('periodos_escolares_id').primaryKey(),
  periodos_escolares_escola_id: integer('periodos_escolares_escola_id').notNull(), // Adicionar este campo
  periodos_escolares_ano: integer('periodos_escolares_ano').notNull(),
  periodos_escolares_bimestre: integer('periodos_escolares_bimestre').notNull(),
  periodos_escolares_data_inicio: date('periodos_escolares_data_inicio').notNull(),
  periodos_escolares_data_fim: date('periodos_escolares_data_fim').notNull(),
  periodos_escolares_status: boolean('periodos_escolares_status').notNull().default(true),
  periodos_escolares_created_at: timestamp('periodos_escolares_created_at').defaultNow().notNull(),
  periodos_escolares_updated_at: timestamp('periodos_escolares_updated_at').defaultNow().notNull(),
});

// Tabela turmas
export const turmas = pgTable('turmas', {
  turmas_id: serial('turmas_id').primaryKey(),
  turmas_nome: varchar('turmas_nome', { length: 255 }).notNull(),
  turmas_periodos_escolares_id: integer('turmas_periodos_escolares_id').notNull(),
  turmas_escola_id: integer('turmas_escola_id').notNull(),
  turmas_created_at: timestamp('turmas_created_at').defaultNow().notNull(),
  turmas_updated_at: timestamp('turmas_updated_at').defaultNow().notNull(),
});

// Tabela usuarios
export const usuarios = pgTable('usuarios', {
  usuarios_id: serial('usuarios_id').primaryKey(),
  usuarios_nome: varchar('usuarios_nome', { length: 255 }).notNull(),
  usuarios_email: varchar('usuarios_email', { length: 255 }).notNull(),
  usuarios_senha: varchar('usuarios_senha', { length: 255 }).notNull(),
  usuarios_role: varchar('usuarios_role', { length: 50 }).notNull(),
  usuarios_escola_id: integer('usuarios_escola_id'),
  usuarios_status: boolean('usuarios_status').notNull().default(true),
  usuarios_created_at: timestamp('usuarios_created_at').defaultNow().notNull(),
  usuarios_updated_at: timestamp('usuarios_updated_at').defaultNow().notNull(),
});

// Tabela alunos
export const alunos = pgTable('alunos', {
  alunos_id: serial('alunos_id').primaryKey(),
  alunos_usuario_id: integer('alunos_usuario_id').notNull(),
  alunos_turma_id: integer('alunos_turma_id').notNull(),
  alunos_data_matricula: date('alunos_data_matricula'),
  alunos_created_at: timestamp('alunos_created_at').defaultNow().notNull(),
  alunos_updated_at: timestamp('alunos_updated_at').defaultNow().notNull(),
});

// Tabela licencas
export const licencas = pgTable('licencas', {
  licencas_id: serial('licencas_id').primaryKey(),
  licencas_escola_id: integer('licencas_escola_id').notNull(),
  licencas_data_inicio: date('licencas_data_inicio').notNull(),
  licencas_data_fim: date('licencas_data_fim').notNull(),
  licencas_status: varchar('licencas_status', { length: 50 }).notNull(),
  licencas_created_at: timestamp('licencas_created_at').defaultNow().notNull(),
  licencas_updated_at: timestamp('licencas_updated_at').defaultNow().notNull(),
});

// Tabela kits_estudo
export const kits_estudo = pgTable('kits_estudo', {
  kits_estudo_id: serial('kits_estudo_id').primaryKey(),
  kits_estudo_codigo_ativacao: varchar('kits_estudo_codigo_ativacao', { length: 100 }).notNull(),
  kits_estudo_usado: boolean('kits_estudo_usado').notNull().default(false),
  kits_estudo_aluno_id: integer('kits_estudo_aluno_id'),
  kits_estudo_created_at: timestamp('kits_estudo_created_at').defaultNow().notNull(),
  kits_estudo_updated_at: timestamp('kits_estudo_updated_at').defaultNow().notNull(),
});

// Tabela disciplinas
export const disciplinas = pgTable('disciplinas', {
  disciplinas_id: serial('disciplinas_id').primaryKey(),
  disciplinas_escola_id: integer('disciplinas_escola_id').notNull(),
  disciplinas_nome: varchar('disciplinas_nome', { length: 255 }).notNull(),
  disciplinas_descricao: text('disciplinas_descricao'),
  disciplinas_created_at: timestamp('disciplinas_created_at').defaultNow().notNull(),
  disciplinas_updated_at: timestamp('disciplinas_updated_at').defaultNow().notNull(),
});

// Tabela materiais_didaticos
export const materiais_didaticos = pgTable('materiais_didaticos', {
  materiais_didaticos_id: serial('materiais_didaticos_id').primaryKey(),
  materiais_didaticos_disciplina_id: integer('materiais_didaticos_disciplina_id').notNull(),
  materiais_didaticos_tipo: varchar('materiais_didaticos_tipo', { length: 50 }),
  materiais_didaticos_titulo: varchar('materiais_didaticos_titulo', { length: 255 }).notNull(),
  materiais_didaticos_descricao: text('materiais_didaticos_descricao'),
  materiais_didaticos_caminho_arquivo: varchar('materiais_didaticos_caminho_arquivo', { length: 255 }),
  materiais_didaticos_created_at: timestamp('materiais_didaticos_created_at').defaultNow().notNull(),
  materiais_didaticos_updated_at: timestamp('materiais_didaticos_updated_at').defaultNow().notNull(),
});

// Tabela anexos
export const anexos = pgTable('anexos', {
  anexos_id: serial('anexos_id').primaryKey(),
  anexos_entidade_tipo: varchar('anexos_entidade_tipo', { length: 50 }).notNull(),
  anexos_entidade_id: integer('anexos_entidade_id').notNull(),
  anexos_caminho_arquivo: varchar('anexos_caminho_arquivo', { length: 255 }).notNull(),
  anexos_descricao: text('anexos_descricao'),
  anexos_created_at: timestamp('anexos_created_at').defaultNow().notNull(),
  anexos_updated_at: timestamp('anexos_updated_at').defaultNow().notNull(),
});

// Tabela aulas
export const aulas = pgTable('aulas', {
  aulas_id: serial('aulas_id').primaryKey(),
  aulas_disciplina_id: integer('aulas_disciplina_id').notNull(),
  aulas_professor_id: integer('aulas_professor_id').notNull(),
  aulas_data_hora_inicio: timestamp('aulas_data_hora_inicio').notNull(),
  aulas_data_hora_fim: timestamp('aulas_data_hora_fim'),
  aulas_arquivo_pdf: varchar('aulas_arquivo_pdf', { length: 255 }),
  aulas_descricao: text('aulas_descricao'),
  aulas_created_at: timestamp('aulas_created_at').defaultNow().notNull(),
  aulas_updated_at: timestamp('aulas_updated_at').defaultNow().notNull(),
});

// Tabela dias_aulas
export const dias_aulas = pgTable('dias_aulas', {
  dias_aulas_id: serial('dias_aulas_id').primaryKey(),
  dias_aulas_aula_id: integer('dias_aulas_aula_id').notNull(),
  dias_aulas_dia_semana: integer('dias_aulas_dia_semana').notNull(),
  dias_aulas_hora_inicio: timestamp('dias_aulas_hora_inicio'),
  dias_aulas_hora_fim: timestamp('dias_aulas_hora_fim'),
  dias_aulas_created_at: timestamp('dias_aulas_created_at').defaultNow().notNull(),
  dias_aulas_updated_at: timestamp('dias_aulas_updated_at').defaultNow().notNull(),
});

// Tabela presenca_aulas
export const presenca_aulas = pgTable('presenca_aulas', {
  presenca_aulas_id: serial('presenca_aulas_id').primaryKey(),
  presenca_aulas_aula_id: integer('presenca_aulas_aula_id').notNull(),
  presenca_aulas_aluno_id: integer('presenca_aulas_aluno_id').notNull(),
  presenca_aulas_status: varchar('presenca_aulas_status', { length: 50 }).notNull(),
  presenca_aulas_created_at: timestamp('presenca_aulas_created_at').defaultNow().notNull(),
});

// Tabela avaliacoes
export const avaliacoes = pgTable('avaliacoes', {
  avaliacoes_id: serial('avaliacoes_id').primaryKey(),
  avaliacoes_disciplina_id: integer('avaliacoes_disciplina_id').notNull(),
  avaliacoes_professor_id: integer('avaliacoes_professor_id').notNull(),
  avaliacoes_periodo_escolar_id: integer('avaliacoes_periodo_escolar_id').notNull(),
  avaliacoes_data_criacao: timestamp('avaliacoes_data_criacao').defaultNow().notNull(),
  avaliacoes_data_aplicacao: timestamp('avaliacoes_data_aplicacao').notNull(),
  avaliacoes_tempo_limite: integer('avaliacoes_tempo_limite').notNull(),
  avaliacoes_descricao: text('avaliacoes_descricao'),
  avaliacoes_created_at: timestamp('avaliacoes_created_at').defaultNow().notNull(),
  avaliacoes_updated_at: timestamp('avaliacoes_updated_at').defaultNow().notNull(),
});

// Tabela tentativas_avaliacoes
export const tentativas_avaliacoes = pgTable('tentativas_avaliacoes', {
  tentativas_avaliacoes_id: serial('tentativas_avaliacoes_id').primaryKey(),
  tentativas_avaliacoes_avaliacao_id: integer('tentativas_avaliacoes_avaliacao_id').notNull(),
  tentativas_avaliacoes_aluno_id: integer('tentativas_avaliacoes_aluno_id').notNull(),
  tentativas_avaliacoes_status: varchar('tentativas_avaliacoes_status', { length: 50 }).notNull(),
  tentativas_avaliacoes_nota: integer('tentativas_avaliacoes_nota'),
  tentativas_avaliacoes_tempo_utilizado: integer('tentativas_avaliacoes_tempo_utilizado'),
  tentativas_avaliacoes_created_at: timestamp('tentativas_avaliacoes_created_at').defaultNow().notNull(),
  tentativas_avaliacoes_updated_at: timestamp('tentativas_avaliacoes_updated_at').defaultNow().notNull(),
});

// Tabela questoes
export const questoes = pgTable('questoes', {
  questoes_id: serial('questoes_id').primaryKey(),
  questoes_avaliacao_id: integer('questoes_avaliacao_id').notNull(),
  questoes_enunciado: text('questoes_enunciado').notNull(),
  questoes_tipo: varchar('questoes_tipo', { length: 50 }).notNull(),
  questoes_pontos: integer('questoes_pontos').notNull(),
  questoes_configuracao: jsonb('questoes_configuracao'),
  questoes_anexo_url: varchar('questoes_anexo_url', { length: 255 }),
  questoes_randomizar: boolean('questoes_randomizar').default(false),
  questoes_tempo_limite: integer('questoes_tempo_limite'),
  questoes_created_at: timestamp('questoes_created_at').defaultNow().notNull(),
  questoes_updated_at: timestamp('questoes_updated_at').defaultNow().notNull(),
});

// Tabela opcoes_questoes
export const opcoes_questoes = pgTable('opcoes_questoes', {
  opcoes_questoes_id: serial('opcoes_questoes_id').primaryKey(),
  opcoes_questoes_questao_id: integer('opcoes_questoes_questao_id').notNull(),
  opcoes_questoes_texto: text('opcoes_questoes_texto').notNull(),
  opcoes_questoes_is_correta: boolean('opcoes_questoes_is_correta').notNull().default(false),
  opcoes_questoes_feedback: text('opcoes_questoes_feedback'),
  opcoes_questoes_ordem_correta: integer('opcoes_questoes_ordem_correta'),
  opcoes_questoes_created_at: timestamp('opcoes_questoes_created_at').defaultNow().notNull(),
  opcoes_questoes_updated_at: timestamp('opcoes_questoes_updated_at').defaultNow().notNull(),
});

// Tabela respostas_avaliacoes
export const respostas_avaliacoes = pgTable('respostas_avaliacoes', {
  respostas_avaliacoes_id: serial('respostas_avaliacoes_id').primaryKey(),
  respostas_avaliacoes_tentativa_id: integer('respostas_avaliacoes_tentativa_id').notNull(),
  respostas_avaliacoes_questao_id: integer('respostas_avaliacoes_questao_id').notNull(),
  respostas_avaliacoes_resposta: text('respostas_avaliacoes_resposta').notNull(),
  respostas_avaliacoes_data_resposta: timestamp('respostas_avaliacoes_data_resposta').defaultNow().notNull(),
});

// Tabela respostas_detalhadas
export const respostas_detalhadas = pgTable('respostas_detalhadas', {
  respostas_detalhadas_id: serial('respostas_detalhadas_id').primaryKey(),
  respostas_detalhadas_resposta_avaliacao_id: integer('respostas_detalhadas_resposta_avaliacao_id').notNull(),
  respostas_detalhadas_opcao_id: integer('respostas_detalhadas_opcao_id').notNull(),
  respostas_detalhadas_created_at: timestamp('respostas_detalhadas_created_at').defaultNow().notNull(),
});

// Tabela anotacoes
export const anotacoes = pgTable('anotacoes', {
  anotacoes_id: serial('anotacoes_id').primaryKey(),
  anotacoes_aluno_id: integer('anotacoes_aluno_id').notNull(),
  anotacoes_material_id: integer('anotacoes_material_id').notNull(),
  anotacoes_conteudo: text('anotacoes_conteudo').notNull(),
  anotacoes_created_at: timestamp('anotacoes_created_at').defaultNow().notNull(),
});

// Tabela notificacoes_mensagens
export const notificacoes_mensagens = pgTable('notificacoes_mensagens', {
  notificacoes_mensagens_id: serial('notificacoes_mensagens_id').primaryKey(),
  notificacoes_mensagens_remetente_id: integer('notificacoes_mensagens_remetente_id').notNull(),
  notificacoes_mensagens_destinatario_id: integer('notificacoes_mensagens_destinatario_id').notNull(),
  notificacoes_mensagens_mensagem: text('notificacoes_mensagens_mensagem').notNull(),
  notificacoes_mensagens_tipo: varchar('notificacoes_mensagens_tipo', { length: 50 }).notNull(),
  notificacoes_mensagens_lida: boolean('notificacoes_mensagens_lida').notNull().default(false),
  notificacoes_mensagens_created_at: timestamp('notificacoes_mensagens_created_at').defaultNow().notNull(),
  notificacoes_mensagens_updated_at: timestamp('notificacoes_mensagens_updated_at').defaultNow().notNull(),
});

// Tabela atividades
export const atividades = pgTable('atividades', {
  atividades_id: serial('atividades_id').primaryKey(),
  atividades_aula_id: integer('atividades_aula_id'),
  atividades_professor_id: integer('atividades_professor_id').notNull(),
  atividades_descricao: text('atividades_descricao').notNull(),
  atividades_data_inicio: timestamp('atividades_data_inicio').notNull(),
  atividades_data_fim: timestamp('atividades_data_fim'),
  atividades_retorno_tempo_real: boolean('atividades_retorno_tempo_real').notNull().default(false),
  atividades_created_at: timestamp('atividades_created_at').defaultNow().notNull(),
  atividades_updated_at: timestamp('atividades_updated_at').defaultNow().notNull(),
});

// Tabela diario_professor
export const diario_professor = pgTable('diario_professor', {
  diario_professor_id: serial('diario_professor_id').primaryKey(),
  diario_professor_professor_id: integer('diario_professor_professor_id').notNull(),
  diario_professor_data: date('diario_professor_data').notNull(),
  diario_professor_conteudo: text('diario_professor_conteudo').notNull(),
  diario_professor_created_at: timestamp('diario_professor_created_at').defaultNow().notNull(),
  diario_professor_updated_at: timestamp('diario_professor_updated_at').defaultNow().notNull(),
});

// Tabela logs_acesso
export const logs_acesso = pgTable('logs_acesso', {
  logs_acesso_id: serial('logs_acesso_id').primaryKey(),
  logs_acesso_usuario_id: integer('logs_acesso_usuario_id').notNull(),
  logs_acesso_acao: text('logs_acesso_acao').notNull(),
  logs_acesso_data_hora: timestamp('logs_acesso_data_hora').defaultNow().notNull(),
});

// Tabela alunos_disciplinas
export const alunos_disciplinas = pgTable('alunos_disciplinas', {
  alunos_disciplinas_id: serial('alunos_disciplinas_id').primaryKey(),
  alunos_disciplinas_aluno_id: integer('alunos_disciplinas_aluno_id').notNull(),
  alunos_disciplinas_disciplina_id: integer('alunos_disciplinas_disciplina_id').notNull(),
  alunos_disciplinas_turma_id: integer('alunos_disciplinas_turma_id').notNull(),
  alunos_disciplinas_data_matricula: date('alunos_disciplinas_data_matricula').notNull(),
  alunos_disciplinas_status: varchar('alunos_disciplinas_status', { length: 50 }).notNull().default('ativo'),
  alunos_disciplinas_created_at: timestamp('alunos_disciplinas_created_at').defaultNow().notNull(),
  alunos_disciplinas_updated_at: timestamp('alunos_disciplinas_updated_at').defaultNow().notNull(),
});

// Tabela acessos_disciplinas
export const acessos_disciplinas = pgTable('acessos_disciplinas', {
  acessos_disciplinas_id: serial('acessos_disciplinas_id').primaryKey(),
  acessos_disciplinas_aluno_id: integer('acessos_disciplinas_aluno_id').notNull(),
  acessos_disciplinas_disciplina_id: integer('acessos_disciplinas_disciplina_id').notNull(),
  acessos_disciplinas_data_acesso: timestamp('acessos_disciplinas_data_acesso').defaultNow().notNull(),
  acessos_disciplinas_duracao: integer('acessos_disciplinas_duracao'),
  acessos_disciplinas_created_at: timestamp('acessos_disciplinas_created_at').defaultNow().notNull(),
});

// Tabela progresso_aluno
export const progresso_aluno = pgTable('progresso_aluno', {
  progresso_aluno_id: serial('progresso_aluno_id').primaryKey(),
  progresso_aluno_aluno_id: integer('progresso_aluno_aluno_id').notNull(),
  progresso_aluno_disciplina_id: integer('progresso_aluno_disciplina_id').notNull(),
  progresso_aluno_media_avaliacoes: integer('progresso_aluno_media_avaliacoes').notNull(),
  progresso_aluno_ultima_avaliacao: timestamp('progresso_aluno_ultima_avaliacao'),
  progresso_aluno_progresso: jsonb('progresso_aluno_progresso'),
  progresso_aluno_created_at: timestamp('progresso_aluno_created_at').defaultNow().notNull(),
  progresso_aluno_updated_at: timestamp('progresso_aluno_updated_at').defaultNow().notNull(),
});

export const teste_migration = pgTable('teste_migration', {
  teste_migration_id: serial('teste_migration_id').primaryKey(),
  teste_migration_nome: varchar('teste_migration_nome', { length: 100 }).notNull(),
});


export const schema = {
  prefeituras,
  escolas,
  periodos_escolares,
  turmas,
  usuarios,
  alunos,
  licencas,
  kits_estudo,
  disciplinas,
  materiais_didaticos,
  anexos,
  aulas,
  dias_aulas,
  presenca_aulas,
  avaliacoes,
  tentativas_avaliacoes,
  questoes,
  opcoes_questoes,
  respostas_avaliacoes,
  respostas_detalhadas,
  anotacoes,
  notificacoes_mensagens,
  atividades,
  diario_professor,
  logs_acesso,
  alunos_disciplinas,
  acessos_disciplinas,
  progresso_aluno,
};
