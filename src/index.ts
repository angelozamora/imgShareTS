import app from './app';
import {startConnection} from './database'


async function main(){
  startConnection();
  await app.listen( app.get('PORT'));
  console.log("run on port 3000")
}

main();