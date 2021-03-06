"use strict";

var router = require('express').Router();
var common = require('../../common');

var keys = [
    common.wallet.getKeyPair('emancollab').private,
    common.wallet.getKeyPair('emancontent').private,
    common.wallet.getKeyPair('user11').private,
    common.wallet.getKeyPair('user12').private,
    common.wallet.getKeyPair('user13').private,
    common.wallet.getKeyPair('user14').private,
    common.wallet.getKeyPair('user15').private,
    common.wallet.getKeyPair('user21').private,
    common.wallet.getKeyPair('user22').private,
    common.wallet.getKeyPair('user23').private,
    common.wallet.getKeyPair('user24').private,
    common.wallet.getKeyPair('user25').private,
    common.wallet.getKeyPair('testuser11').private,
    common.wallet.getKeyPair('testuser12').private,
    common.wallet.getKeyPair('testuser13').private,
    common.wallet.getKeyPair('testuser14').private,
    common.wallet.getKeyPair('testuser15').private,
    common.wallet.getKeyPair('testuser21').private,
    common.wallet.getKeyPair('testuser22').private,
    common.wallet.getKeyPair('testuser23').private,
    common.wallet.getKeyPair('testuser24').private,
    common.wallet.getKeyPair('testuser25').private,
];

router.use('/:username', (req, res, next) => { 
    req.username = req.params.username;
    next();
});

router.get('/:username', common.limits.getData, (req, res) => {
    var eos = common.eos.instance(common.eos.getEOSConfig(keys));

    eos.getCurrencyBalance('eosio.token', req.params.username, 'BEAT').then(result => {
        res.json(common.responses.ok({ username: req.params.username, balance: parseInt(result[0].split(" ")[0]), balanceString: result[0] }));
    });
});


router.use('/:username/asset', require('./asset'));

module.exports = router