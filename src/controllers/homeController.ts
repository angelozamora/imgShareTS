import ImageModel  from '../models/image'
import {Request , Response } from 'express'



export  async function getImages(req : Request , res : Response , next:any ) {
  try {
    const images = await ImageModel.find().sort({ timestamp: -1 })
    res.render('partials/index', { images: images })
  } catch (err) {
      console.log(err)
      return next(err)
  }  

}

