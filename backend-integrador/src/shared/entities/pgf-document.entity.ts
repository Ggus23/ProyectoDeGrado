
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Docente } from './docente.entity';
import { PgfUnit } from './pgf-unit.entity';
export enum PgfStatus { UPLOADED = 'UPLOADED', PARSED = 'PARSED', PUBLISHED = 'PUBLISHED' }
@Entity()
export class PgfDocument {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() titulo!: string;
  @Column({ nullable: true }) carrera?: string;
  @Column({ nullable: true }) asignatura?: string;
  @Column({ nullable: true }) periodo?: string;
  @Column() sourceFile!: string;
  @Column({ type: 'enum', enum: PgfStatus, default: PgfStatus.UPLOADED }) status!: PgfStatus;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
  @ManyToOne(() => Docente, (d) => d.pgfs, { onDelete: 'CASCADE' }) uploadedBy!: Docente;
  @OneToMany(() => PgfUnit, (u) => u.pgf) units!: PgfUnit[];
}
