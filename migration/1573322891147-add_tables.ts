import {MigrationInterface, QueryRunner} from "typeorm";

export class addTables1573322891147 implements MigrationInterface {
    name = 'addTables1573322891147'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "postos" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "endereco" character varying NOT NULL, "bairro" character varying NOT NULL, "cidade" character varying NOT NULL, "bandeira" character varying DEFAULT 'Branca', CONSTRAINT "PK_0ee80ffe0ef45d5b2c0dee5e7c3" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "combustiveis" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "preco" numeric(4,2) NOT NULL, "data" date, "postoId" integer, CONSTRAINT "PK_509dbbe27f9432445c71eba9f96" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying DEFAULT 'normal', "role" character varying DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "facebookId" character varying, "googleId" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_7989eba4dafdd5322761765f2b8" UNIQUE ("facebookId"), CONSTRAINT "UQ_470355432cc67b2c470c30bef7c" UNIQUE ("googleId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "combustiveis" ADD CONSTRAINT "FK_66b105005fb4e4a536e152ff5b8" FOREIGN KEY ("postoId") REFERENCES "postos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "combustiveis" DROP CONSTRAINT "FK_66b105005fb4e4a536e152ff5b8"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "combustiveis"`, undefined);
        await queryRunner.query(`DROP TABLE "postos"`, undefined);
    }

}
