var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var request = require('superagent')
var mongodb = require('mongodb')
var cons = require('consolidate')
//var hbsfy = require('hbsfy')

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

//app.set('views', path.join(__dirname, 'views'))
//app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function(req, res){
  res.render("main")
})


app.post('/shifts', function(req, res){
  inputDatashifts =  req.body //returns object
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/shifts"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error: ", err)
    } else {
      var collection = db.collection("shifts")
      var newData = inputDatashifts
      console.log("shifts", newData)
        collection.insert([newData], function(err, result){
        if (err){
          console.log("there is an error: ", err)
        } else {
          res.redirect('/')
        }
        db.close()
      })
    }
  })
})

app.get('/shifts',  function(req, res){
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/shifts"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error retreiving data from Database: ", err)
    } else {
      var collection = db.collection("shifts")
      collection.find({}).sort({dateEpoch: 1}).toArray(function(err, result){
        if (err){
          conosole.log("there is an error retreiving data from database: ", err)
          res.send(err)
        } else if (result.length){
          res.send(JSON.stringify(result))
        }
        else{
          console.log("no document found")
          res.send("No documents found")
        }
        db.close()
      })
    }
  })
})


app.listen(3000, function(){
  console.log("Danny boi  .... 3000")
})

module.exports = app
