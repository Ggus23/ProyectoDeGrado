
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PgfUnit } from './pgf-unit.entity';
export enum RubricType { ANALITICA='ANALITICA', HOLISTICA='HOLISTICA' }
@Entity()
export class Rubric {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @ManyToOne(() => PgfUnit, (u) => u.rubrics, { nullable: true, onDelete: 'SET NULL' }) pgfUnit?: PgfUnit | null;
  @Column() nombre!: string;
  @Column({ type: 'enum', enum: RubricType }) tipo!: RubricType;
  @Column({ type: 'jsonb' }) criterios!: Record<string, any>;
  @Column({ type: 'jsonb' }) niveles!: Record<string, any>;
  @Column({ type: 'int', default: 1 }) version!: number;
  @Column({ default: false }) isPublished!: boolean;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
