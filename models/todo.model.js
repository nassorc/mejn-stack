// it models how the data in the database should look like
const mongoose = require('mongoose')

// define model
const TodoSchema = new mongoose.Schema({
    record: {type: String, required: true},
    date: { type: Number, required: true, default: Date.now}
}) 

// mongoos will read TodoModel model then lowercase it and add a 's'
// that will be the name of the collection.
// you can overwrite this by providing a second argument
// in the schema , eg {collection: 'my-todo'}
const model = mongoose.model('TodoModel', TodoSchema)

module.exports = model