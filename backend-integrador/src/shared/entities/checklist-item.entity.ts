
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PgfUnit } from './pgf-unit.entity';
@Entity()
export class ChecklistItem {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @ManyToOne(() => PgfUnit, (u) => u.checklist, { onDelete: 'CASCADE' }) pgfUnit!: PgfUnit;
  @Column() titulo!: string;
  @Column({ default: false }) done!: boolean;
  @Column({ type: 'int', default: 0 }) sortOrder!: number;
}
