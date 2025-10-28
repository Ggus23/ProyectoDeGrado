import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OAuthProvider } from './oauth-provider.enum';
import { Docente } from './docente.entity';

@Entity()
export class OAuthAccount {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column({ type: 'enum', enum: OAuthProvider })
  provider!: OAuthProvider;

  @Column() providerId!: string;
  @Column() email!: string;

  @ManyToOne(() => Docente, (d) => d.oauthAccounts, { onDelete: 'CASCADE' })
  docente!: Docente;

  @CreateDateColumn() createdAt!: Date;
  @Column({ type: 'text', nullable: true }) hashedRefreshToken: string | null = null;
}
