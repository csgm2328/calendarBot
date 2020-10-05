const config = require('config')
/* GET users listing. */
const routerName = config.get('proxy') + '/users'

module.exports = apiRouter => {
    apiRouter.all(routerName, function (req, res) {
  res.send('respond with a resource')
  })
}
