
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PgfUnit } from './pgf-unit.entity';
@Entity()
export class SequenceItem {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @ManyToOne(() => PgfUnit, (u) => u.sequence, { onDelete: 'CASCADE' }) pgfUnit!: PgfUnit;
  @Column({ type: 'date', nullable: true }) fechaInicio?: string;
  @Column({ type: 'date', nullable: true }) fechaFin?: string;
  @Column() hito!: string;
  @Column({ type: 'text', array: true, default: [] }) recursos!: string[];
}
