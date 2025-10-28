import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PgfDocument } from './pgf-document.entity';
import { Rubric } from './rubric.entity';
import { Alignment } from './alignment.entity';
import { SequenceItem } from './sequence-item.entity';
import { ChecklistItem } from './checklist-item.entity';
@Entity()
export class PgfUnit {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @ManyToOne(() => PgfDocument, (p) => p.units, { onDelete: 'CASCADE' }) pgf!: PgfDocument;
  @Column() titulo!: string;
  @Column({ type: 'int', nullable: true }) semana?: number;
  @Column({ type: 'text', array: true, default: [] }) resultadosAprendizaje!: string[];
  @Column({ type: 'text', array: true, default: [] }) contenidos!: string[];
  @Column({ type: 'text', array: true, default: [] }) estrategias!: string[];
  @OneToMany(() => Rubric, (r) => r.pgfUnit) rubrics!: Rubric[];
  @OneToMany(() => Alignment, (a) => a.pgfUnit) alignments!: Alignment[];
  @OneToMany(() => SequenceItem, (s) => s.pgfUnit) sequence!: SequenceItem[];
  @OneToMany(() => ChecklistItem, (c) => c.pgfUnit) checklist!: ChecklistItem[];
}
