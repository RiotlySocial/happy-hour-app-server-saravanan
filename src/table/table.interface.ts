import { Document } from 'mongoose';

export interface Table extends Document {
  readonly members: []
}