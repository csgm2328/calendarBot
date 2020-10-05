const config = require('config')

const mongoose = require('mongoose')
const dbURL = 'mongodb://localhost:27017/meeting'

const routerName = config.get('proxy') + '/namecheck'

module.exports = apiRouter => {
  apiRouter.post(routerName, function (req, res) {
    MongoClient.connect(dbURL, function (error, db) {
      if (error) {
        console.log(error)
      }
      else {
      }
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
      var newreg = new reg({
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
      const people = req.body.action.params['st_name'] || ''
      org.find({ st_name: people }, function (error, Organizer) {
        if (error) {
          const responseBody = {
            version: "2.0",
            template: {
              outputs: [
                {
                  simpleText: {
                    text: people + '님은 아직등록되지 않은 주최자입니다ㅠㅠㅠ'
                  }
                }
              ]
            }
          }
          console.log("등록되지 않은 주최자입니다ㅠㅠㅠ", error)

        }
        else {
          const responseBody = {
            version: "2.0",
            template: {
              outputs: [
                {
                  simpleText: {
                    text: people + '님과의 일정을 잡아드려요!\n날짜, 시간 어떤 것부터 정해볼까요?'
                  }
                }
              ]
            }
          }
          console.log("등록된 사람입니다", Organizer)
        }
      })
      db.close()
      console.log(req.body)
      //console.log(req.body.userRequest.user.properties)
      res.status(200).send(responseBody)
    })
  })
}