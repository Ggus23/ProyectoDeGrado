
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OAuthAccount } from './oauth-account.entity';
import { PgfDocument } from './pgf-document.entity';
import { Upload } from './upload.entity';

@Entity()
export class Docente {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() nombre!: string;
  @Column({ unique: true }) email!: string;
  @Column({ nullable: true }) avatarUrl?: string;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
  @Column({ type: 'timestamptz', nullable: true }) lastLoginAt?: Date;
  @OneToMany(() => OAuthAccount, (oa) => oa.docente) oauthAccounts!: OAuthAccount[];
  @OneToMany(() => PgfDocument, (d) => d.uploadedBy) pgfs!: PgfDocument[];
  @OneToMany(() => Upload, (u) => u.owner) uploads!: Upload[];
}
