const messenger = require("@tiledesk/tiledesk-messenger-connector");
var winston = require('../../config/winston');
var configGlobal = require('../../config/global');

const apiUrl = process.env.API_URL || configGlobal.apiUrl;
//winston.info('Messenger apiUrl: ' + apiUrl);

class Listener {

    listen(config) {
        winston.info("Messenger Listener listen");
        if (config.databaseUri) {
            winston.debug("messenger config databaseUri: " + config.databaseUri);
        }

        let graph_url = process.env.META_GRAPH_URL || config.graphUrl || "https://graph.facebook.com/v14.0/"
        winston.debug("Messenger graph_url: " + graph_url);

        let log = process.env.MESSENGER_LOG || false
        winston.debug("Messenger log: " + log);

        let fb_app_id = process.env.FB_APP_ID;
        winston.debug("Messenger fb_app_id: ", fb_app_id);

        let fb_app_secret = process.env.FB_APP_SECRET;
        winston.debug("Messenger fb_app_secret: ", fb_app_secret);

        let dashboard_base_url = process.env.DASHBOARD_BASE_URL;
        winston.debug("Messenger dashboard_base_url: ", dashboard_base_url);

        messenger.startApp({
            MONGODB_URL: config.databaseUri,          
            API_URL: apiUrl,
            BASE_URL: apiUrl + "/modules/messenger",
            APPS_API_URL: apiUrl + "/modules/apps",
            FB_APP_ID: fb_app_id,
            FB_APP_SECRET: fb_app_secret,
            GRAPH_URL: graph_url,
            DASHBOARD_BASE_URL: dashboard_base_url,
            log: log
        }, () => {
            winston.info("Tiledesk Messenger Connector proxy server succesfully started.");
        })

    }
}

var listener = new Listener();

module.exports = listener;