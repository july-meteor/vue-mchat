const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    from:{type:Object,required:true},
    to:{type:Object,required:true},
    content:{type:String},
    timestamp:{type:Number},
    cid:{type:Number},
    sid:{type:Number},
    type:{type:String},
})
module.exports = mongoose.model('Session',schema)