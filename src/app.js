const   
  express      =  require('express'),
  app          =  express(),
  createError  =  require('http-errors'),
  cookieParser =  require('cookie-parser'),
  bodyParser   =  require('body-parser'),
  path         =  require('path'),
  morgan       =  require('morgan'),
  { sync }     =  require('glob'),
  { resolve }  =  require('path'),
  fileUpload   =  require("express-fileupload"),
  device       =  require('express-device'),
  cors         =  require('cors');

require('dotenv').config();

// cors settings.
// I recommend editing this later
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.header('Origin'));
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization')");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

// set middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser());
app.use(morgan('\x1b[34m:method \x1b[0m:url \x1b[33m:status \x1b[0m:res[content-length] - :response-time ms'));
app.use(fileUpload());
app.use(device.capture({ parseUserAgent: true }));

// load all routes
const files = sync(resolve('./src/api/routes/**/*.js'));
console.log('');
files.forEach(file => {
    const _file = require(file);
    if (_file) {
        try {
            app.use(file.replace(__dirname.replaceAll('\\', '/') + '/api/routes', '').replace('.js', ''), _file);
            console.log(`Loaded \x1b[36m${file.replace(__dirname.replaceAll('\\', '/') + '/api/routes', '')} \x1b[0mas \x1b[36m${file.replace(__dirname.replaceAll('\\', '/') + '/api/routes', '').replace('.js', '')}\x1b[0m`);
        } catch { };
    }
});
console.log('');

// catch 404
app.use((req, res, next) => {
  next(createError.NotFound());
});

// error handler
app.use((err, req, res, next) => {
  // render the error page
  res.status(err.status || 500);
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Running on 3000');
});