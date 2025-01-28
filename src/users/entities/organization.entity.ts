import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  organizationName: string;

  @Column({ type: 'text', nullable: true })
  organizationLogo: string;

  @Column({ type: 'varchar', length: '255' })
  organizationNumber: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  organizationEmail: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  organizationUniqueId: string;

  @Column({ type: 'text' })
  organizationAddress: string;

  @Column({ type: 'json', nullable: true })
  organizationBillingAccountDetails: Record<string, any>;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.organizationId)
  users: User[];
}
