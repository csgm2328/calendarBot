var mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs')
var validator = require('validator')

var OrganizerSchema = new  mongoose.Schema({
	      st_name: 'string',
	      email: 'string',
	      client_id: 'string'
	    })
module.exports = mongoose.model('organizer', OrganizerSchema)
