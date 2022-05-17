const express = require('express')
const router = express.Router()
const IncoContext = require('./classes/inco_context');

// Add your routes here - above the module.exports line


// Root
router.get(['/'], function (req, res) {
    res.redirect("/mode_of_transport")
});

// Form handler
router.get(['/form_handler/'], function (req, res) {
    var inco_context = new IncoContext(req, res);
    inco_context.handle_form();
});

// Mode of transport
router.get(['/mode_of_transport/'], function (req, res) {
    var inco_context = new IncoContext(req);
    res.render('01_mode', {
        'inco_context': inco_context
    });
});

// Surrender location
router.get(['/surrender_location/'], function (req, res) {
    var inco_context = new IncoContext(req);
    res.render('02_surrender_location', {
        'inco_context': inco_context
    });
});

// Seller's country location
router.get(['/sellers_country_location/'], function (req, res) {
    var inco_context = new IncoContext(req);
    res.render('03_sellers_country_location', {
        'inco_context': inco_context
    });
});

// Buyer's country location
router.get(['/buyers_country_location/'], function (req, res) {
    var inco_context = new IncoContext(req);
    res.render('04_buyers_country_location', {
        'inco_context': inco_context
    });
});

// Export clearance
router.get(['/export_clearance/'], function (req, res) {
    var inco_context = new IncoContext(req);
    res.render('05_export_clearance', {
        'inco_context': inco_context
    });
});

// Import clearance
router.get(['/import_clearance/'], function (req, res) {
    var inco_context = new IncoContext(req);
    res.render('08_import_clearance', {
        'inco_context': inco_context
    });
});

// Unloading
router.get(['/unloading/'], function (req, res) {
    var inco_context = new IncoContext(req);
    res.render('06_unloading', {
        'inco_context': inco_context
    });
});

// Insurance costs
router.get(['/insurance/'], function (req, res) {
    var inco_context = new IncoContext(req);
    res.render('07_insurance', {
        'inco_context': inco_context
    });
});

// Freight costs
router.get(['/freight/'], function (req, res) {
    var inco_context = new IncoContext(req);
    res.render('09_freight', {
        'inco_context': inco_context
    });
});

module.exports = router
