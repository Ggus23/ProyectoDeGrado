import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
export enum StrategyType {
  ABP = 'ABP',
  ABProyectos = 'ABProyectos',
  ABI = 'ABI',
  APS = 'APS',
  GAMIFICACION = 'GAMIFICACION',
  OTRA = 'OTRA',
}
@Entity()
export class Strategy {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() nombre!: string;
  @Column({ type: 'enum', enum: StrategyType }) tipo!: StrategyType;
  @Column({ type: 'text' }) descripcion!: string;
  @Column({ type: 'text', array: true, default: [] }) fuentes!: string[];
  @CreateDateColumn() createdAt!: Date;
}
