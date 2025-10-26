
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Docente } from './docente.entity';
export enum OAuthProvider { GOOGLE = 'GOOGLE', MSFT = 'MSFT' }
@Entity()
export class OAuthAccount {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ type: 'enum', enum: OAuthProvider }) provider!: OAuthProvider;
  @Column() providerId!: string;
  @Column() email!: string;
  @ManyToOne(() => Docente, (d) => d.oauthAccounts, { onDelete: 'CASCADE' }) docente!: Docente;
  @CreateDateColumn() createdAt!: Date;
  @Column({ type: 'text', nullable: true }) hashedRefreshToken: string | null = null;
}
