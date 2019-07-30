var createError     = require('http-errors')
var cors = require('cors')
var express         = require('express')
var path            = require('path')
var cookieParser    = require('cookie-parser')
var logger          = require('morgan')
var indexRouter     = require('./routes/index')
var authRouter      = require('./routes/auth')
var contactsRouter  = require('./routes/contacts')
const swaggerUi     = require('swagger-ui-express')
const swaggerDoc    = require('./swagger.json')
var app             = express()
var httpStatusCodes = require('http-status-codes')
var authController  = require('./controllers/auth')
var _ = require('lodash/mapKeys')

checkAuth = async (req, res, next) => {
  if(!req.headers.authtoken){
    res.status(httpStatusCodes.UNAUTHORIZED).send({"code": httpStatusCodes.UNAUTHORIZED, "message": "Missing authtoken in header"})
  }else{
    let userId = await authController.checkToken(req.headers.authtoken)
    if(userId){
      req.userId = userId
      next()
    }else{
      res.status(httpStatusCodes.UNAUTHORIZED).send({"code": httpStatusCodes.UNAUTHORIZED, "message": "authtoken has expired"})
    }
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/contacts', [checkAuth, contactsRouter])

var options = {
  explorer: true
};
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, options));

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
});

module.exports = app
