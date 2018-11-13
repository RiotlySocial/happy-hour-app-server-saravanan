import { Document } from 'mongoose';

export interface Users extends Document {
  readonly _id: string,
  readonly first_name: string,
  readonly last_name: string,
  readonly email: string
  readonly avatar: string
  readonly gender: string
  readonly uid: string
  readonly provider: string
}