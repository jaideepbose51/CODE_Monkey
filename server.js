import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// Place the bodyParser middleware before your routes
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the _dirname directory
app.use(express.static(_dirname));

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(_dirname + "/view/login.html");
});

app.get("/singin", (req, res) => {
    res.sendFile(_dirname + "/view/singup.html");
});

app.get("/TouristOrGuide",(req,res)=>{
    res.sendFile(_dirname+"/view/TorG.html")
})

app.post("/login_submit", (req, res) => {
    console.log(req.body);
    res.redirect("/TouristOrGuide");
});

app.post("/singup_submit", (req, res) => {
    console.log(req.body);
    res.redirect("/TouristOrGuide");
});

app.post("/TorGsubmit", (req,res)=>{
    console.log(req.body);
});
