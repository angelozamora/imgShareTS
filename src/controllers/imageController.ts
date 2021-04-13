import path from 'path';
import {Request , Response } from 'express'
import { timeAgo , randomName } from '../helpers/lib';
import md5 from 'md5';
import fs from 'fs-extra';

import ImageModel  from '../models/image'
import CommentModel  from '../models/comment'


export async function getImage(req : Request, res : Response, next : any)  {

    try {
        const image = await ImageModel.findOne({_id : req.params.image_id});

        if (image) {
            image.views += 1;
            image.save();
            const comments = await CommentModel.find({ image_id: image._id })
            res.render('partials/image', { image: image, timeAgo, comments })
        } else {
            res.redirect('/')
        }

    } catch (err) {
        if (err.name = "CastError") {
            res.redirect('/')
        } else {
            return next(err);
        }
    }

}

export async function crearImage(req : Request, res : Response, next : any) {

    try{
        console.log(req.file)
        const newImg = new ImageModel({
            title: req.body.title,
            description: req.body.description,
            fileName: req.file.filename
        })
        
        const imageSaved = await newImg.save();
        
        res.redirect(`/images/${imageSaved._id}`)
    }catch(err){
        return next(err)
    }
    
}

export async function setLike( req : Request , res : Response , next:any){
  try {
      console.log('SET LIKE')
    //   const image = await ImageModel.findOne({ fileName: { $regex: req.params.image_id } })
    const image = await ImageModel.findOne({ _id: req.params.image_id })
      if (image) {
          image.like += 1;
          await image.save();
          res.json({ like: image.like })
      } else {
          res.redirect('/')
      }
  } catch (err) {
      return next(err)
  }
}

export async function setComment( req : Request , res : Response , next:any){
  try {
    const image = await ImageModel.findById(req.params.image_id);
    if (image) {
        const newComment = new CommentModel(req.body)
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        await newComment.save();
        res.redirect(`/images/${newComment.image_id}`)
    } else {
        res.redirect('/')
    }

  } catch (err) {
      if (err.name = "CastError") {
          res.redirect('/')
      } else {
          return next(err);
      }
  }
}


export async function deleteImage( req : Request , res : Response , next:any){
  try {
    const image = await ImageModel.findById(req.params.image_id);
      if (image) {

        await fs.unlink(path.join(__dirname, '../../public/upload/'+ image.fileName))

        await CommentModel.deleteMany({ image_id: image._id });
        await image.remove();
        res.json(true)

      } else {
          res.redirect('/')
      }
  } catch (err) {
      return next(err)
  }
}

