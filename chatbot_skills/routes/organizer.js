const config = require('config')
const mongoose = require('mongoose')
const dbURL = 'mongodb://localhost:27017/meeting'

const routerName = config.get('proxy') + '/organizer'

module.exports = apiRouter => {
    apiRouter.all(routerName, function (req, res) {
  /*      MongoClient.connect(dbURL, function(error, db){
                  if(error){
                          console.log(error)
                  }
                  else{
                  }*/
  mongoose.connect(dbURL)
  var db = mongoose.connection
  db.on('error', function () {
    console.log('Connection Failed!')
  })

  db.once('open', function () {
    console.log('Connected!')
  })

  var Organizer = mongoose.Schema({
    st_name: 'string',
    email: 'string',
    client_id: 'string'
  })

  var org = mongoose.model('Schema', Organizer)
  var newOrganizer = new org( {
    st_name: req.body.action.params['st_name'] || '',
    email: req.body.action.params['user_email'] || '',
    client_id: credentials.web.client_id
    }
)

  newOrganizer.save(function (error, data) {
    if (error) {
      console.log(error)
    }
    else {
      console.log("saved!!!", data, result)
    }
  })
})
}
