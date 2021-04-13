import {Router} from 'express';

import {getImages} from  '../controllers/homeController'
import {getImage , crearImage , setLike , setComment , deleteImage} from  '../controllers/imageController'
import upload from '../lib/multer';

const router = Router();

router.get('/', getImages)

router.get('/images/:image_id', getImage)
router.post('/images', upload.single('image'), crearImage)
router.post('/images/:image_id/like', setLike)
router.post('/images/:image_id/comment', setComment)
router.delete('/images/:image_id', deleteImage)

export default router;

// const app = express();

// image(app);
// home(app);

// export default app;