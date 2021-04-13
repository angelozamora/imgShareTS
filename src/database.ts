import mongoose from 'mongoose';

import keys from './keys';

export  async function startConnection(){
  await mongoose.connect(keys.database.URI, { useNewUrlParser: true })
  console.log("MongoDB conect")
}

