import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organization } from './organization.entity';

export enum UserRole {
  SUPERADMIN = '1',
  ADMIN = '2',
  OFFICER = '3',
  TECHNICIAN = '4',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  fullName: string;

  @Column({ default: '', unique: true })
  email: string;

  @Column({ default: '' })
  phoneNumber: string;

  @Column({ default: '' })
  countryCode: string;

  @Column({ default: '' })
  city: string;

  @Column({ default: '' })
  state: string;

  // @Column({ default: {} })
  // userAddress: Object;

  @Column({ default: '' })
  password: string;

  // @Column('geometry', { spatialFeatureType: 'Point' })
  // location: Point;

  @Column({ type: Number, default: null })
  latitude: number;

  @Column({ type: Number, default: null })
  longitude: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.OFFICER })
  userRole: UserRole;

  @Column({ type: Boolean, default: false })
  isActive: boolean;

  @ManyToOne(() => Organization, (organization) => organization.users, {
    onDelete: "CASCADE"
  })
  organizationId: Organization;
}