// Importing Packages
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const app = express();
const MongoSessionStore = require('connect-mongodb-session')(session);
require('dotenv').config();

// Variable Declarations
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const MONGO_URI = process.env.MONGO_URI;
const STATIC = __dirname + '/static';
const VIEWS = __dirname + '/views';

// Enabling Trust Proxy, only for Production
app.enable('trust proxy');

// Disabling X-Powered-By Header
app.disable('x-powered-by');

// Custom middleware for redirecting to HTTPS
function HTTPS(req, res, next) {
  if(req.headers['x-forwarded-proto'] === 'http') {
    res.redirect('https://' + req.hostname + req.url);
  }
  next();
}

// Custom middleware for verifying Login
function requireLogin(req, res, next) {
  if (req.session.Email) {
    next();
  } else {
    res.redirect('/');
  }
}

// Mounting HTTPS middleware, for Production Server only
app.use(HTTPS);

// Mounting middleware to serve static assets
app.use(express.static(STATIC));

// Mounting middleware for parsing header body
app.use(express.urlencoded({ extended: false }));

// Connecting to Database Server
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Checking Database Connection
db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', () => {
  console.log('Database Connected Successfully!');
});

// Creating MongoDB Session Store
const store = new MongoSessionStore({
  uri: MONGO_URI,
  collection: 'sessions',
  expires: 1000 * 60 * 10,
}, (error) => {
  if (error) {
    console.log(error);
  }
});

// Checking MongoDB Session Store Connection
store.on('error', (error) => {
  console.log(error);
});

// Mounting middleware for session management
app.use(session({
  name: 'Session',
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    sameSite: true,
    httpOnly: true,
    secure: true, // Only for Production Server
    maxAge: 1000 * 60 * 10
  }
}));

// Creating User Schema
const userSchema = new mongoose.Schema({
  Email: { type: String, required: true },
  Password: { type: String, required: true }
});

// Creating User Model
const User = mongoose.model('User', userSchema);

// Endpoint for GET '/'
app.get('/', (req, res) => {
  res.sendFile(VIEWS + '/index.html');
});

// Endpoint for GET '/login'
app.get('/login', (req, res) => {
  res.sendFile(VIEWS + '/login.html');
});

// Endpoint for GET '/register'
app.get('/register', (req, res) => {
  res.sendFile(VIEWS + '/register.html');
});

// Endpoint for GET '/user/logout'
app.get('/user/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// Endpoint for GET '/user/dashbaord'
app.get('/user/dashboard', requireLogin, (req, res) => {
  res.sendFile(VIEWS + '/user/dashboard.html');
});

// Endpoint for GET '/user/changed'
app.get('/user/changed', requireLogin, (req, res) => {
  res.sendFile(VIEWS + '/messages/changed.html');
});

// Endpoint for GET '/user/registered'
app.get('/user/registered', (req, res) => {
  res.sendFile(VIEWS + '/messages/registered.html');
});

// Endpoint for GET '/user/deleted'
app.get('/user/deleted', (req, res) => {
  res.sendFile(VIEWS + '/messages/deleted.html');
});

// Endpoint for GET '/user/unavaiable'
app.get('/user/unavailable', (req, res) => {
  res.sendFile(VIEWS + '/messages/unavailable.html');
});

// Endpoint for POST '/register'
app.post('/register', (req, res) => {

  // Creating new user from User Model
  const user = new User();

  User.findOne({ Email: req.body.Email })
    .then((foundUser) => {
      if (foundUser) {
        res.redirect('/user/unavailable');
      } else {
        user.Email = req.body.Email;
        bcrypt.hash(req.body.Password, 10)
          .then((hash) => {
            user.Password = hash;
            return user.save();
          })
          .then((user) => {
            res.redirect('/user/registered');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// Endpoint for POST '/login'
app.post('/login', (req, res) => {
  User.findOne({ Email: req.body.Email })
    .then((foundUser) => {
      if (foundUser) {
        bcrypt.compare(req.body.Password, foundUser.Password)
          .then((result) => {
            if (result) {
              req.session.regenerate(() => {
                req.session.Email = foundUser.Email;
                res.redirect('/user/dashboard');
              });
            } else {
              res.redirect('/login');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.redirect('/login');
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// Endpoint for POST '/user/delete'
app.post('/user/delete', requireLogin, (req, res) => {
  User.deleteOne({ Email: req.session.Email })
    .then(() => {
      req.session.destroy(() => {
        res.redirect('/user/deleted');
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Endpoint for POST '/user/change'
app.post('/user/change', requireLogin, (req, res) => {
  bcrypt.hash(req.body.Password, 10)
    .then((hash) => {
      User.findOne({ Email: req.session.Email })
        .then((user) => {
          user.Password = hash;
          return user.save();
        })
        .then((user) => {
          res.redirect('/user/changed');
        })
        .catch((err) => {
          console.log(err);
        })
    })
    .catch((err) => {
      console.log(err);
    });
});

// Mounting middleware for undefined Endpoints
app.use((req, res, next) => {
  res.status(404).redirect('/');
});

// Starting the server
app.listen(PORT || 3000, () => {
  console.log(`Server started. Listening at Port: ${PORT || 3000}`);
});