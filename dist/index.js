"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
let server = new server_1.Server().app;
let port = process.env.PORT;
process.env.TZ = 'Asia/Calcultta';
server.listen(port, () => {
    console.log(`->Server is running at http://localhost/${port}`);
});
