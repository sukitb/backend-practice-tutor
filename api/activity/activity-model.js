const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
    }
}, {
    collection: 'activity'
})

module.exports = mongoose.model('activity', activitySchema)