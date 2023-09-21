import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { stringify } from "querystring";

mongoose.connect("mongodb+srv://jaideep:Jaideep03@cluster0.udm7ere.mongodb.net/code_monkeys", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
});

const guuidesSchema=new mongoose.Schema({
    name: String,
    state: String,
    des: String,
    no: String,
    price: String,
});

// Use a different variable name for the model, e.g., GuideModel
const GuideModel = mongoose.model("guide", guuidesSchema);

const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var data;

// Use the correct model name, which is GuideModel
try {
    const documents = await GuideModel.find({});
    console.log(documents);
  } catch (err) {
    console.error(err);
  }
  


// Place the bodyParser middleware before your routes
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the _dirname directory
app.use(express.static(_dirname));

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${port}`);
});

app.get("/", (req, res) => {

    res.render("home.ejs");
});

app.get("/login",(req,res)=>{
    res.render("login.ejs");
})

app.get("/singin", (req, res) => {
    res.render("singup.ejs");
});

app.get("/TouristOrGuide",(req,res)=>{
    res.render("TorG.ejs")
})

app.get("/guideregister", (req, res) => {
    res.render("guidedetails.ejs");
})

app.post("/submitguideinfo",(req,res)=>{
    // Capture data from the request body
    console.log(req.body);
    const guideData = {
        name: req.body.name,
        state: req.body.state,
        des: req.body.des,
        no: req.body.no,
        price: req.body.price,
      };
    
      // Create a new Guide instance and save it using the model
  const guideInstance = new GuideModel(guideData); // Use GuideModel here
  guideInstance.save();


// Use the correct model name, which is GuideModel
MyModel.find({}, (err, documents) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(documents); // This will contain an array of documents
  });
  



  res.send("ok");
})

app.get("/about",(req,res)=>{
    res.render("about.ejs")
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
    const bodyKeys = Object.keys(req.body);
    if (bodyKeys[0]==="guide"){
        res.render("guidedetails.ejs");
    }
    
else {
    res.redirect("/");
}

})