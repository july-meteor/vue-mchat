const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo.io:27017/chat', { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)