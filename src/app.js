const express = require("express"); 
require("../src/db/conn");
const path = require("path");
const hbs = require("hbs");
const { registerPartials } = require("hbs");
 
 
const app =express();
const Usernew = require("./models/newusers");
// const router = require("../src/routers/user");
const port = process.env.PORT || 3000;
// settinn the path
const staticpath =  path.join(__dirname, " ../public");
const viewspath =  path.join(__dirname, "../template/views");
const partialpath =  path.join(__dirname, "../template/partials");
// middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath));

app.set("view engine", "hbs");
app.set("views", viewspath);
// app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(partialpath);
// app.set('views', path.join(__dirname, 'views'));
 
app.use(express.json()); 
// app.use(router);
// routing 
// app.get("/contact",(req,res)=>{
//   res.render("contact");
// })
app.get("/",(req,res)=>{
  res.render("index");
})
app.post('/contact',async(req, res) => {
  try{
    const UserData = new Usernew(req.body);
     
    await UserData.save();
    res.status(201).render("index");
  }catch(e){
    res.status(500).send(e);
  }
})
 
app.listen(port, () => {
  console.log(`Server is running on the PORT ${port}`);
});