import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1761451419512 implements MigrationInterface {
    name = 'Init1761451419512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."o_auth_account_provider_enum" AS ENUM('GOOGLE', 'MSFT')`);
        await queryRunner.query(`CREATE TABLE "o_auth_account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider" "public"."o_auth_account_provider_enum" NOT NULL, "providerId" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "hashedRefreshToken" text, "docenteId" uuid, CONSTRAINT "PK_c6d5ec585a70cc98562375fafc7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."rubric_tipo_enum" AS ENUM('ANALITICA', 'HOLISTICA')`);
        await queryRunner.query(`CREATE TABLE "rubric" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying NOT NULL, "tipo" "public"."rubric_tipo_enum" NOT NULL, "criterios" jsonb NOT NULL, "niveles" jsonb NOT NULL, "version" integer NOT NULL DEFAULT '1', "isPublished" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "pgfUnitId" uuid, CONSTRAINT "PK_c6926c4b9f70196fae0f95c5691" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "alignment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "competencia" character varying NOT NULL, "resultadoAprendizaje" character varying NOT NULL, "evidencia" character varying NOT NULL, "pgfUnitId" uuid, "rubricId" uuid, CONSTRAINT "PK_6d3449aed4bfee0b1d4b9b62e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sequence_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fechaInicio" date, "fechaFin" date, "hito" character varying NOT NULL, "recursos" text array NOT NULL DEFAULT '{}', "pgfUnitId" uuid, CONSTRAINT "PK_f853b958da48ba32d4ede744443" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "checklist_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titulo" character varying NOT NULL, "done" boolean NOT NULL DEFAULT false, "sortOrder" integer NOT NULL DEFAULT '0', "pgfUnitId" uuid, CONSTRAINT "PK_0c52d9590c766a9ae718e16cebf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pgf_unit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titulo" character varying NOT NULL, "semana" integer, "resultadosAprendizaje" text array NOT NULL DEFAULT '{}', "contenidos" text array NOT NULL DEFAULT '{}', "estrategias" text array NOT NULL DEFAULT '{}', "pgfId" uuid, CONSTRAINT "PK_15127d58b5f49edbfb1355a7c86" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."pgf_document_status_enum" AS ENUM('UPLOADED', 'PARSED', 'PUBLISHED')`);
        await queryRunner.query(`CREATE TABLE "pgf_document" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titulo" character varying NOT NULL, "carrera" character varying, "asignatura" character varying, "periodo" character varying, "sourceFile" character varying NOT NULL, "status" "public"."pgf_document_status_enum" NOT NULL DEFAULT 'UPLOADED', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "uploadedById" uuid, CONSTRAINT "PK_8e72560c60854557e2ccda62d0a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "uploads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "filename" character varying NOT NULL, "originalName" character varying, "mimeType" character varying, "size" bigint, "path" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "PK_d1781d1eedd7459314f60f39bd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "docente" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying NOT NULL, "email" character varying NOT NULL, "avatarUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "lastLoginAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_6562128cc9980256433b7a34425" UNIQUE ("email"), CONSTRAINT "PK_badad2b3623effea5d5d5b244c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."strategy_tipo_enum" AS ENUM('ABP', 'ABProyectos', 'ABI', 'APS', 'GAMIFICACION', 'OTRA')`);
        await queryRunner.query(`CREATE TABLE "strategy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying NOT NULL, "tipo" "public"."strategy_tipo_enum" NOT NULL, "descripcion" text NOT NULL, "fuentes" text array NOT NULL DEFAULT '{}', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_733d2c3d4a73c020375b9b3581d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "o_auth_account" ADD CONSTRAINT "FK_50d60d41855a789df1fa486e1af" FOREIGN KEY ("docenteId") REFERENCES "docente"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rubric" ADD CONSTRAINT "FK_36b17489b8b8dede87d67723579" FOREIGN KEY ("pgfUnitId") REFERENCES "pgf_unit"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alignment" ADD CONSTRAINT "FK_4fd75a302c675b7de2bfbbe7d97" FOREIGN KEY ("pgfUnitId") REFERENCES "pgf_unit"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alignment" ADD CONSTRAINT "FK_c8bd2611d14344978e51841327d" FOREIGN KEY ("rubricId") REFERENCES "rubric"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sequence_item" ADD CONSTRAINT "FK_abaa7f8351498c5a08a6b4beec0" FOREIGN KEY ("pgfUnitId") REFERENCES "pgf_unit"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "checklist_item" ADD CONSTRAINT "FK_553cfbbe7d63d232507b230ee2e" FOREIGN KEY ("pgfUnitId") REFERENCES "pgf_unit"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pgf_unit" ADD CONSTRAINT "FK_1b54c12aab27de55a5bb2605176" FOREIGN KEY ("pgfId") REFERENCES "pgf_document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pgf_document" ADD CONSTRAINT "FK_11d3554331eb7e01975f498ffb1" FOREIGN KEY ("uploadedById") REFERENCES "docente"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "uploads" ADD CONSTRAINT "FK_0dcc068a4dbdf0951c7f4dd7a66" FOREIGN KEY ("ownerId") REFERENCES "docente"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads" DROP CONSTRAINT "FK_0dcc068a4dbdf0951c7f4dd7a66"`);
        await queryRunner.query(`ALTER TABLE "pgf_document" DROP CONSTRAINT "FK_11d3554331eb7e01975f498ffb1"`);
        await queryRunner.query(`ALTER TABLE "pgf_unit" DROP CONSTRAINT "FK_1b54c12aab27de55a5bb2605176"`);
        await queryRunner.query(`ALTER TABLE "checklist_item" DROP CONSTRAINT "FK_553cfbbe7d63d232507b230ee2e"`);
        await queryRunner.query(`ALTER TABLE "sequence_item" DROP CONSTRAINT "FK_abaa7f8351498c5a08a6b4beec0"`);
        await queryRunner.query(`ALTER TABLE "alignment" DROP CONSTRAINT "FK_c8bd2611d14344978e51841327d"`);
        await queryRunner.query(`ALTER TABLE "alignment" DROP CONSTRAINT "FK_4fd75a302c675b7de2bfbbe7d97"`);
        await queryRunner.query(`ALTER TABLE "rubric" DROP CONSTRAINT "FK_36b17489b8b8dede87d67723579"`);
        await queryRunner.query(`ALTER TABLE "o_auth_account" DROP CONSTRAINT "FK_50d60d41855a789df1fa486e1af"`);
        await queryRunner.query(`DROP TABLE "strategy"`);
        await queryRunner.query(`DROP TYPE "public"."strategy_tipo_enum"`);
        await queryRunner.query(`DROP TABLE "docente"`);
        await queryRunner.query(`DROP TABLE "uploads"`);
        await queryRunner.query(`DROP TABLE "pgf_document"`);
        await queryRunner.query(`DROP TYPE "public"."pgf_document_status_enum"`);
        await queryRunner.query(`DROP TABLE "pgf_unit"`);
        await queryRunner.query(`DROP TABLE "checklist_item"`);
        await queryRunner.query(`DROP TABLE "sequence_item"`);
        await queryRunner.query(`DROP TABLE "alignment"`);
        await queryRunner.query(`DROP TABLE "rubric"`);
        await queryRunner.query(`DROP TYPE "public"."rubric_tipo_enum"`);
        await queryRunner.query(`DROP TABLE "o_auth_account"`);
        await queryRunner.query(`DROP TYPE "public"."o_auth_account_provider_enum"`);
    }

}
