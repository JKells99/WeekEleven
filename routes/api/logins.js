var router = require('express').Router();
const loginsDal = require('../../services/pg.logins.dal')
//const actorsDal = require('../../services/m.actors.dal')
const bcrypt = require('bcrypt');
const saltRounds = 10;

// api/logins
router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/logins/ GET ' + req.url);
    try {
        let theLogins = await loginsDal.getLogins(); 
        res.json(theLogins);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
// api/logins/:id
router.get('/:id', async (req, res) => {
  if(DEBUG) console.log('ROUTE: /api/logins/:id GET ' + req.url);
  try {
      let aLogin = await loginsDal.getLoginByLoginId(req.params.id); 
      if (aLogin.length === 0) {
          // log this error to an error log file.
          res.statusCode = 404;
          res.json({message: "Not Found", status: 404});
      }
      else
          res.json(aLogin);
  } catch {
      // log this error to an error log file.
      res.statusCode = 503;
      res.json({message: "Service Unavailable", status: 503});
  }
});
router.post('/', async (req, res) => {
  if(DEBUG) { 
      console.log('ROUTE: /api/logins/ POST');
     console.log(req.body.username);
  }
  try {
      await loginsDal.addLogin(req.body.username, req.body.password );
      res.statusCode = 201;

      res.json({message: "Created", status: 201});
  } catch {
      // log this error to an error log file.
      res.statusCode = 503;
      res.json({message: "Service Unavailable", status: 503});
  } 
});
router.patch('/:id', async (req, res) => {
  if(DEBUG) console.log('ROUTE: /api/logins PATCH ' + req.params.id);
  try {
      await loginsDal.patchLogin(req.params.id, req.body.username, req.body.password);
      res.statusCode = 200;
      res.json({message: "OK", status: 200});
  } catch {
      // log this error to an error log file.
      res.statusCode = 503;
      res.json({message: "Service Unavailable", status: 503});
  }
});
router.delete('/:id', async (req, res) => {
  if(DEBUG) console.log('ROUTE: /api/logins DELETE ' + req.params.id);
  try {
      await loginsDal.deleteLogin(req.params.id);
      res.statusCode = 200;
      res.json({message: "OK", status: 200});
  } catch {
      // log this error to an error log file.
      res.statusCode = 503;
      res.json({message: "Service Unavailable", status: 503});
  }
});

module.exports = router;