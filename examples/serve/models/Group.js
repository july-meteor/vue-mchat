const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    id: { type: Number, default: 1, unique: true },
    avatar: { type: String },
    name: { type: String, required: true },
    userLists: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
    group: { type: Boolean, default: true },
    master: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    desc: { type: String },
})
module.exports = mongoose.model('Group', schema);
