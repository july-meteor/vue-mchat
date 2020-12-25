const mongoose = require('mongoose');

/**
 *   时间戳通过 User.findOne({}).sort({ id: -1 })  获取
 * @type {module:mongoose.Schema<any> | module:mongoose.Schema}
 */
const schema = new mongoose.Schema({
    from:{type:Object,required:true},
    to:{type:Object,required:true},
    content:{type:String},
    timestamp:{type:Number},
    cid:{type:Number},
    sid:{type:Number},
    type:{type:String},
})
module.exports = mongoose.model('Message',schema)