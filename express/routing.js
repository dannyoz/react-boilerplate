module.exports = {
  routes : require('../app/shared/routing.json'),
	staticDirs : [
    'css', 
    'img', 
    'js',
    'media',
    'icons'
  ],
  err404 : function(req, res, next){

    var environment  = process.env.NODE_ENV || 'development',
      envPath = './environments/'+environment+'/';

    res.status(404);

    if (req.accepts('html')) {
      return res.sendfile(envPath+'views/404.html');
    }

    if (req.accepts('json')) {
      return res.send({ error: 'Not found' });
    }

    res.type('txt').send('Not found');
  }
};
