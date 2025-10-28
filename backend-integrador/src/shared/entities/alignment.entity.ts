import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PgfUnit } from './pgf-unit.entity';
import { Rubric } from './rubric.entity';
@Entity()
export class Alignment {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @ManyToOne(() => PgfUnit, (u) => u.alignments, { onDelete: 'CASCADE' }) pgfUnit!: PgfUnit;
  @Column() competencia!: string;
  @Column() resultadoAprendizaje!: string;
  @Column() evidencia!: string;
  @ManyToOne(() => Rubric, { nullable: true, onDelete: 'SET NULL' }) rubric?: Rubric | null;
}
