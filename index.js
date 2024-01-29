import qr from "qr-image";
import fs from "fs";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

import express from "express";

let name = "I love Myself 💘";
const app = express();
const port = 300;
let flag = 0;

const d = new Date();
let yearValue = d.getFullYear();

app.use(bodyParser.urlencoded({ extended: true}));
const __dirname = dirname(fileURLToPath(import.meta.url));



app.use(express.static("public"));


app.get("/", (req, res) =>{
    res.render("index.ejs",{
        flag : 0,
        year : yearValue
    });
});

app.post("/submit", (req,res)=>{
    // res.render("ans.ejs");
    name = req.body["myInput"];
    var qr_svg = qr.image(name, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('./public/Qr-Image.png'));
    console.log(name);
    
    res.render("index.ejs",{
        flag : 1,
        year : yearValue
    });
});

app.post("/",(req, res) =>{
        res.render("index.ejs",{
            flag : 0,
            year : yearValue
    });
});

app.listen(port, ()=>{
    console.log(`The server is live at port : ${port}`);
});