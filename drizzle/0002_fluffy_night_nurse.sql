CREATE TABLE "acessos_disciplinas" (
	"acessos_disciplinas_id" serial PRIMARY KEY NOT NULL,
	"acessos_disciplinas_aluno_id" integer NOT NULL,
	"acessos_disciplinas_disciplina_id" integer NOT NULL,
	"acessos_disciplinas_data_acesso" timestamp DEFAULT now() NOT NULL,
	"acessos_disciplinas_duracao" integer,
	"acessos_disciplinas_created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "alunos" (
	"alunos_id" serial PRIMARY KEY NOT NULL,
	"alunos_usuario_id" integer NOT NULL,
	"alunos_turma_id" integer NOT NULL,
	"alunos_data_matricula" date,
	"alunos_created_at" timestamp DEFAULT now() NOT NULL,
	"alunos_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "alunos_disciplinas" (
	"alunos_disciplinas_id" serial PRIMARY KEY NOT NULL,
	"alunos_disciplinas_aluno_id" integer NOT NULL,
	"alunos_disciplinas_disciplina_id" integer NOT NULL,
	"alunos_disciplinas_turma_id" integer NOT NULL,
	"alunos_disciplinas_data_matricula" date NOT NULL,
	"alunos_disciplinas_status" varchar(50) DEFAULT 'ativo' NOT NULL,
	"alunos_disciplinas_created_at" timestamp DEFAULT now() NOT NULL,
	"alunos_disciplinas_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "anexos" (
	"anexos_id" serial PRIMARY KEY NOT NULL,
	"anexos_entidade_tipo" varchar(50) NOT NULL,
	"anexos_entidade_id" integer NOT NULL,
	"anexos_caminho_arquivo" varchar(255) NOT NULL,
	"anexos_descricao" text,
	"anexos_created_at" timestamp DEFAULT now() NOT NULL,
	"anexos_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "anotacoes" (
	"anotacoes_id" serial PRIMARY KEY NOT NULL,
	"anotacoes_aluno_id" integer NOT NULL,
	"anotacoes_material_id" integer NOT NULL,
	"anotacoes_conteudo" text NOT NULL,
	"anotacoes_created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "atividades" (
	"atividades_id" serial PRIMARY KEY NOT NULL,
	"atividades_aula_id" integer,
	"atividades_professor_id" integer NOT NULL,
	"atividades_descricao" text NOT NULL,
	"atividades_data_inicio" timestamp NOT NULL,
	"atividades_data_fim" timestamp,
	"atividades_retorno_tempo_real" boolean DEFAULT false NOT NULL,
	"atividades_created_at" timestamp DEFAULT now() NOT NULL,
	"atividades_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "aulas" (
	"aulas_id" serial PRIMARY KEY NOT NULL,
	"aulas_disciplina_id" integer NOT NULL,
	"aulas_professor_id" integer NOT NULL,
	"aulas_data_hora_inicio" timestamp NOT NULL,
	"aulas_data_hora_fim" timestamp,
	"aulas_arquivo_pdf" varchar(255),
	"aulas_descricao" text,
	"aulas_created_at" timestamp DEFAULT now() NOT NULL,
	"aulas_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "avaliacoes" (
	"avaliacoes_id" serial PRIMARY KEY NOT NULL,
	"avaliacoes_disciplina_id" integer NOT NULL,
	"avaliacoes_professor_id" integer NOT NULL,
	"avaliacoes_periodo_escolar_id" integer NOT NULL,
	"avaliacoes_data_criacao" timestamp DEFAULT now() NOT NULL,
	"avaliacoes_data_aplicacao" timestamp NOT NULL,
	"avaliacoes_tempo_limite" integer NOT NULL,
	"avaliacoes_descricao" text,
	"avaliacoes_created_at" timestamp DEFAULT now() NOT NULL,
	"avaliacoes_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "diario_professor" (
	"diario_professor_id" serial PRIMARY KEY NOT NULL,
	"diario_professor_professor_id" integer NOT NULL,
	"diario_professor_data" date NOT NULL,
	"diario_professor_conteudo" text NOT NULL,
	"diario_professor_created_at" timestamp DEFAULT now() NOT NULL,
	"diario_professor_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dias_aulas" (
	"dias_aulas_id" serial PRIMARY KEY NOT NULL,
	"dias_aulas_aula_id" integer NOT NULL,
	"dias_aulas_dia_semana" integer NOT NULL,
	"dias_aulas_hora_inicio" timestamp,
	"dias_aulas_hora_fim" timestamp,
	"dias_aulas_created_at" timestamp DEFAULT now() NOT NULL,
	"dias_aulas_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "disciplinas" (
	"disciplinas_id" serial PRIMARY KEY NOT NULL,
	"disciplinas_escola_id" integer NOT NULL,
	"disciplinas_nome" varchar(255) NOT NULL,
	"disciplinas_descricao" text,
	"disciplinas_created_at" timestamp DEFAULT now() NOT NULL,
	"disciplinas_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "escolas" (
	"escolas_id" serial PRIMARY KEY NOT NULL,
	"escolas_prefeitura_id" integer NOT NULL,
	"escolas_nome" varchar(255) NOT NULL,
	"escolas_endereco" varchar(255),
	"escolas_contato" varchar(255),
	"escolas_status" boolean DEFAULT true NOT NULL,
	"escolas_created_at" timestamp DEFAULT now() NOT NULL,
	"escolas_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kits_estudo" (
	"kits_estudo_id" serial PRIMARY KEY NOT NULL,
	"kits_estudo_codigo_ativacao" varchar(100) NOT NULL,
	"kits_estudo_usado" boolean DEFAULT false NOT NULL,
	"kits_estudo_aluno_id" integer,
	"kits_estudo_created_at" timestamp DEFAULT now() NOT NULL,
	"kits_estudo_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "licencas" (
	"licencas_id" serial PRIMARY KEY NOT NULL,
	"licencas_escola_id" integer NOT NULL,
	"licencas_data_inicio" date NOT NULL,
	"licencas_data_fim" date NOT NULL,
	"licencas_status" varchar(50) NOT NULL,
	"licencas_created_at" timestamp DEFAULT now() NOT NULL,
	"licencas_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "logs_acesso" (
	"logs_acesso_id" serial PRIMARY KEY NOT NULL,
	"logs_acesso_usuario_id" integer NOT NULL,
	"logs_acesso_acao" text NOT NULL,
	"logs_acesso_data_hora" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "materiais_didaticos" (
	"materiais_didaticos_id" serial PRIMARY KEY NOT NULL,
	"materiais_didaticos_disciplina_id" integer NOT NULL,
	"materiais_didaticos_tipo" varchar(50),
	"materiais_didaticos_titulo" varchar(255) NOT NULL,
	"materiais_didaticos_descricao" text,
	"materiais_didaticos_caminho_arquivo" varchar(255),
	"materiais_didaticos_created_at" timestamp DEFAULT now() NOT NULL,
	"materiais_didaticos_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notificacoes_mensagens" (
	"notificacoes_mensagens_id" serial PRIMARY KEY NOT NULL,
	"notificacoes_mensagens_remetente_id" integer NOT NULL,
	"notificacoes_mensagens_destinatario_id" integer NOT NULL,
	"notificacoes_mensagens_mensagem" text NOT NULL,
	"notificacoes_mensagens_tipo" varchar(50) NOT NULL,
	"notificacoes_mensagens_lida" boolean DEFAULT false NOT NULL,
	"notificacoes_mensagens_created_at" timestamp DEFAULT now() NOT NULL,
	"notificacoes_mensagens_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "opcoes_questoes" (
	"opcoes_questoes_id" serial PRIMARY KEY NOT NULL,
	"opcoes_questoes_questao_id" integer NOT NULL,
	"opcoes_questoes_texto" text NOT NULL,
	"opcoes_questoes_is_correta" boolean DEFAULT false NOT NULL,
	"opcoes_questoes_feedback" text,
	"opcoes_questoes_ordem_correta" integer,
	"opcoes_questoes_created_at" timestamp DEFAULT now() NOT NULL,
	"opcoes_questoes_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "periodos_escolares" (
	"periodos_escolares_id" serial PRIMARY KEY NOT NULL,
	"periodos_escolares_ano" integer NOT NULL,
	"periodos_escolares_bimestre" integer NOT NULL,
	"periodos_escolares_data_inicio" date NOT NULL,
	"periodos_escolares_data_fim" date NOT NULL,
	"periodos_escolares_status" boolean DEFAULT true NOT NULL,
	"periodos_escolares_created_at" timestamp DEFAULT now() NOT NULL,
	"periodos_escolares_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prefeituras" (
	"prefeituras_id" serial PRIMARY KEY NOT NULL,
	"prefeituras_nome" varchar(255) NOT NULL,
	"prefeituras_endereco" varchar(255),
	"prefeituras_contato" varchar(255),
	"prefeituras_status" boolean DEFAULT true NOT NULL,
	"prefeituras_created_at" timestamp DEFAULT now() NOT NULL,
	"prefeituras_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "presenca_aulas" (
	"presenca_aulas_id" serial PRIMARY KEY NOT NULL,
	"presenca_aulas_aula_id" integer NOT NULL,
	"presenca_aulas_aluno_id" integer NOT NULL,
	"presenca_aulas_status" varchar(50) NOT NULL,
	"presenca_aulas_created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "progresso_aluno" (
	"progresso_aluno_id" serial PRIMARY KEY NOT NULL,
	"progresso_aluno_aluno_id" integer NOT NULL,
	"progresso_aluno_disciplina_id" integer NOT NULL,
	"progresso_aluno_media_avaliacoes" integer NOT NULL,
	"progresso_aluno_ultima_avaliacao" timestamp,
	"progresso_aluno_progresso" jsonb,
	"progresso_aluno_created_at" timestamp DEFAULT now() NOT NULL,
	"progresso_aluno_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "questoes" (
	"questoes_id" serial PRIMARY KEY NOT NULL,
	"questoes_avaliacao_id" integer NOT NULL,
	"questoes_enunciado" text NOT NULL,
	"questoes_tipo" varchar(50) NOT NULL,
	"questoes_pontos" integer NOT NULL,
	"questoes_configuracao" jsonb,
	"questoes_anexo_url" varchar(255),
	"questoes_randomizar" boolean DEFAULT false,
	"questoes_tempo_limite" integer,
	"questoes_created_at" timestamp DEFAULT now() NOT NULL,
	"questoes_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "respostas_avaliacoes" (
	"respostas_avaliacoes_id" serial PRIMARY KEY NOT NULL,
	"respostas_avaliacoes_tentativa_id" integer NOT NULL,
	"respostas_avaliacoes_questao_id" integer NOT NULL,
	"respostas_avaliacoes_resposta" text NOT NULL,
	"respostas_avaliacoes_data_resposta" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "respostas_detalhadas" (
	"respostas_detalhadas_id" serial PRIMARY KEY NOT NULL,
	"respostas_detalhadas_resposta_avaliacao_id" integer NOT NULL,
	"respostas_detalhadas_opcao_id" integer NOT NULL,
	"respostas_detalhadas_created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tentativas_avaliacoes" (
	"tentativas_avaliacoes_id" serial PRIMARY KEY NOT NULL,
	"tentativas_avaliacoes_avaliacao_id" integer NOT NULL,
	"tentativas_avaliacoes_aluno_id" integer NOT NULL,
	"tentativas_avaliacoes_status" varchar(50) NOT NULL,
	"tentativas_avaliacoes_nota" integer,
	"tentativas_avaliacoes_tempo_utilizado" integer,
	"tentativas_avaliacoes_created_at" timestamp DEFAULT now() NOT NULL,
	"tentativas_avaliacoes_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teste_migration" (
	"teste_migration_id" serial PRIMARY KEY NOT NULL,
	"teste_migration_nome" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "turmas" (
	"turmas_id" serial PRIMARY KEY NOT NULL,
	"turmas_nome" varchar(255) NOT NULL,
	"turmas_periodos_escolares_id" integer NOT NULL,
	"turmas_escola_id" integer NOT NULL,
	"turmas_created_at" timestamp DEFAULT now() NOT NULL,
	"turmas_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"usuarios_id" serial PRIMARY KEY NOT NULL,
	"usuarios_nome" varchar(255) NOT NULL,
	"usuarios_email" varchar(255) NOT NULL,
	"usuarios_senha" varchar(255) NOT NULL,
	"usuarios_role" varchar(50) NOT NULL,
	"usuarios_escola_id" integer,
	"usuarios_status" boolean DEFAULT true NOT NULL,
	"usuarios_created_at" timestamp DEFAULT now() NOT NULL,
	"usuarios_updated_at" timestamp DEFAULT now() NOT NULL
);
