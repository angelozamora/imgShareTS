import express from 'express';
import  path from 'path';
import morgan from 'morgan';
import indexRoutes from './routes/index';
import multer from  'multer';

const app = express();
/* SETTINGS  */

app.set('PORT', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

/* MIDLEWARE */
// app.use(multer({ dest: path.join(__dirname, '../public/upload/temp')}).single('image'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(morgan('dev'));
app.use( '/',indexRoutes)


app.use('/public', express.static(path.join(__dirname, '../public')))


export default app;