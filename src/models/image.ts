import path from 'path';
import * as mongoose from 'mongoose';


interface ItemInterface  {
  title:  string ;
  description: string;
  fileName:  string;
  like:  number;
  views:  number;
  timestamp: Date;
}

const ImageSchema = new mongoose.Schema({
    title: { type: String  , required: true},
    description: { type: String , required: true},
    fileName: { type: String },
    like: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
})


// ImageSchema.virtual('uniqueId').get(function() {
//     return this.fileName.replace(path.extname(this.fileName), '')
// })


export default mongoose.model<ItemInterface & mongoose.Document>('Image', ImageSchema);