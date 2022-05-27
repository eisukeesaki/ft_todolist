const router = require('express').Router();

router.get('/', (req, res) => res.render('login')); // TODO: use conditional statements to render either login or app

module.exports = router;

/*

    express router
        instantiate
        initialize
            route definitions

*/

