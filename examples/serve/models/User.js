
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    id: { type: Number, default: 1, unique: true },
    name: { type: String, required: true },
    password: { type: String, require: true, select: false },
    avatar: { type: String, default: 'http://localhost:3000/uploads/timg.jfif' },
    online: { type: Boolean, default: false },
    chats:[{ type: Object }],
    apply: [{ type: Object }]
})
const model = mongoose.model('User', schema);
module.exports = model
