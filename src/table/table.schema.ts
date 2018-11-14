import * as mongoose from 'mongoose';

export const TableSchema = new mongoose.Schema({
  members: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}], 
              default: [],
              validate: [(val) => val.length <= 4, '{PATH} exceeds the limit of 10']},
  position: {type: Number, required : true }
});
TableSchema.index({ "position": 1 })
