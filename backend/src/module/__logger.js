const logger = ( (req, res, next) => {
    const message = `${req.method} ${req.url}${new Date()}`;
    console.log(message);
  
    next();
  });

module.exports = logger;