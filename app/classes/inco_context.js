const e = require("express");
const axios = require('axios')
const dotenv = require('dotenv');
const config = require('../config.js');
const path = require('path')

class IncoContext {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.back_link = req.headers.referer;
        this.phase = req.session.data["phase"];
        this.water_modes = ["inland_water", "sea"];

        this.get_progress();
        this.get_water_mode();
    }

    get_progress() {
        this.mode_of_transport = this.req.session.data["mode_of_transport"];
        this.surrender_location = this.req.session.data["surrender_location"];
        this.sellers_country_location = this.req.session.data["sellers_country_location"];
        this.buyers_country_location = this.req.session.data["buyers_country_location"];
        this.export_clearance = this.req.session.data["export_clearance"];
        this.import_clearance = this.req.session.data["import_clearance"];
        this.unloading = this.req.session.data["unloading"];
        this.insurance = this.req.session.data["insurance"];
    }

    get_water_mode() {
        if (this.water_modes.includes(this.mode_of_transport)) {
            this.is_water = true;
        } else {
            this.is_water = false;
        }
    }

    handle_form() {
        switch (this.phase) {
            case "mode_of_transport":
                this.res.redirect("/surrender_location");
                break;
            case "surrender_location":
                this.handle_surrender_location();
                break;
            case "sellers_country_location":
                this.handle_sellers_country_location();
                break;
            case "buyers_country_location":
                this.handle_buyers_country_location();
                break;
            case "export_clearance":
                this.handle_export_clearance();
                break;
            case "import_clearance":
                this.handle_import_clearance();
                break;
            case "unloading":
                this.handle_unloading();
                break;
        }
    }

    handle_surrender_location() {
        if (this.surrender_location == "sellers_country") {
            this.res.redirect("/sellers_country_location");
        } else {
            this.res.redirect("/buyers_country_location");
        }
    }

    handle_sellers_country_location() {
        if (this.sellers_country_location == "sellers_premises") {
            this.res.redirect("/export_clearance");
        } else if (this.sellers_country_location == "port_of_load") {
            this.res.redirect("/99_fas");
        } else {
            this.res.redirect("/99_fca");
        }
    }

    handle_buyers_country_location() {
        if (this.buyers_country_location == "port_of_destination") {
            this.res.redirect("/unloading");
        } else if (this.buyers_country_location == "other_locations") {
            this.res.redirect("/export_clearance");
        } else {
            this.res.redirect("/import_clearance");
        }
    }

    handle_export_clearance() {
        if (this.export_clearance == "buyer") {
            this.res.redirect("/99_cpt");
        } else {
            this.res.redirect("/99_cip");
        }
    }

    handle_import_clearance() {
        if (this.import_clearance == "buyer") {
            this.res.redirect("/unloading");
        } else {
            this.res.redirect("/99_ddp");
        }
    }

    handle_unloading() {
        if (this.unloading == "buyer") {
            this.res.redirect("/99_dap");
        } else {
            this.res.redirect("/99_dpu");
        }
    }

    handle_freight() {
        if (this.unloading == "buyer") {
            this.res.redirect("/99_fob");
        } else {
            this.res.redirect("/insurance");
        }
    }

}
module.exports = IncoContext
