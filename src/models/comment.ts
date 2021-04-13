import * as mongoose from 'mongoose';
interface ItemInterface{
  email: string ;
  name: string ;
  comment: string ;
  gravatar: string ;
  timestamp: Date ;
  image_id: string;
}

const CommentSchema = new mongoose.Schema({
    email: { type: String },
    name: { type: String , required: true,},
    comment: { type: String , required: true,},
    gravatar: { type: String },
    timestamp: { type: Date, default: Date.now },
    image_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }
})

export default mongoose.model<ItemInterface & mongoose.Document>('Comment', CommentSchema)
