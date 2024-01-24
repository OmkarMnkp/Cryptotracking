
var express=require("express")
var bodyparser = require("body-parser")
var mongoose = require("mongoose")


const app = express()

app.use(bodyparser.json())
app.use(express.static('main'))

app.use(bodyparser.urlencoded({
    extended:true
}))

// connect to mongodb

// database  name userinfo
mongoose.connect('mongodb://0.0.0.0:27017/WEBDATA')

var db = mongoose.connection
db.on('error',()=>console.log("error in connecting to database"))
db.once('open',()=>console.log("connected to database"))


app.post("/portfolio",(req,res)=>{
    var user_cryptoname = req.body.cryptoname
    var user_quantity = req.body.quantity
    var user_purchaseprice = req.body.purchasePrice
    var user_dateacquisition = req.body.dateAcquisition
    var totalInvestment = user_quantity*user_purchaseprice
    // var percentageChange = (((currentPrice - purchasePrice) / purchasePrice) * 100).toFixed(2);

    var data ={ 
        "CRYPTOCURRENCY":user_cryptoname,
        "QUANTITY":user_quantity,
        "PURCHASED":user_purchaseprice,
        "DATE":user_dateacquisition,
        "INVESTED":totalInvestment.toFixed(2),
        
    }

    // creating database
    // if data is inserted therie are 2 possibilities erroe or show collection
    db.collection('PORTFOLIO_DATA').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record1 inserted Successfully!!!!")  
    })
   
})
app.post("/converter",(req,res)=>{
    var user_amount = req.body.amount
    var user_currency1 = req.body.currency
    var user_currency2 = req.body.cryptoCurrency
    var Result = req.body.result

    var data = {
        "AMOUNT ENTRED":user_amount,
        "FROM ":user_currency1,
        "TO":user_currency2,
        "RESULT":Result
    }
    db.collection('CONVERTER_DATA').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record3 inserted Successfully!!!!")  
    })
})
app.post("/sign_up",(req,res)=>{
    var user_name = req.body.username
    var user_email = req.body.email
    var user_password = req.body.password

    var data ={
        "USERNAME":user_name,
        "EMAIL":user_email,
        "PASSWORD":user_password
    }

    db.collection('USER_INFO').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record2 inserted Successfully!!!!")  
    })
})

app.get("/",(req,res)=>{
    // res.send("server connection successful")
    res.set({
        // becoz we are using localhost
        "Allow-acces-Allow-Origin": "*"
    })

    // redirect 
    return res.redirect('index.html')
}).listen(4100);

console.log("listening on port 4100")



