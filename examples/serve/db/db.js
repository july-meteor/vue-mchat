const mongoose = require('mongoose');
mongoose.connect('mongodb://xxx:27017/chat', { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)