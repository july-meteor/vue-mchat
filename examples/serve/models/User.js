
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    id: { type: Number, default: 1, unique: true },
    name: { type: String, required: true },
    password: { type: String, require: true, select: false },
    avatar: { type: String, default: 'http://www.julymeteor.com/chat/static/img/avatar_meteor.3e969be2.png' },
    online: { type: Boolean, default: false },
    account:{type: String,required: true},
    // 全部对话
    chats: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Chat' }],
    apply: [{ type: Object }]
})
const model = mongoose.model('User', schema);
module.exports = model
