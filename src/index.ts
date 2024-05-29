
import {Server} from './server';

let server = new Server().app;
let port = process.env.PORT;
process.env.TZ = 'Asia/Calcultta'




server.listen(port, ()=>{
    console.log(`->Server is running at http://localhost/${port}`);
});



