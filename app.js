const fs=require("fs");
const express=require("express")
const path=require("path");
const app=express();
// var mongoose=require('mongoose');
var bodyparser=require("body-parser")
// mongoose.connect('mongodb://127.0.0.1:27017/contact_Dance',{useNewUrlParser:true});
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance',{useNewUrlParser:true});
}
const port=8000;
//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone:String,
    email:String,
    address:String,
    desc:String
});
var Contact= mongoose.model('Contact', contactSchema);

app.use('/static',express.static('static'))
app.use(express.urlencoded());

app.set('view engine','pug') 
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params={};
    res.status(200).render('contact.pug',params);
})
app.post('/contact', async (req, res) => {
    try {
        var myData = new Contact(req.body);
        await myData.save();
        res.send("This item has been saved to the database");
    } catch (error) {
        res.status(400).send("Item has not been saved to the database");
    }
});

app.listen(port,()=>{
    console.log(`The app started successfully on port ${port}`)
})