const express =  require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');




mongoose.connect(keys.mongoURI);


const app = express();

app.use(bodyParser.json());

app.use(
    cookieSession({  //trich xuat du lieu cookie
        maxAge: 30 * 24 * 60 * 60 * 1000,
        //thoi han dung cua cookie, 30days. Sau khi het maxAge, auto logout
         keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session()); //lay id ra khoi cookie user
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = reuire('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);