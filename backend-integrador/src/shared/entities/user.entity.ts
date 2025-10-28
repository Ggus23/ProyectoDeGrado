import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

export type UserRole = 'docente' | 'estudiante';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string; // <- definite assignment

  @Index('UQ_users_auth0_sub', { unique: true })
  @Column({ name: 'auth0_sub', type: 'varchar', length: 255, nullable: false })
  auth0Sub!: string;

  @Index('UQ_users_email', { unique: true })
  @Column({ type: 'varchar', length: 320, nullable: false })
  email!: string;

  @Column({ type: 'text' })
  role!: UserRole;
}
