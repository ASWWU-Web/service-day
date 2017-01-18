/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'service-day',
    environment: environment,
    firebase: 'https://serviceday.firebaseio.com/Winter2017/',
    torii: {
      sessionServiceName: 'session'
    },
    org_pass: "serviceDay2017",
    admin_emails: ["brock.haugen@wallawalla.edu","ryan.s.rabello@gmail.com","community.service@wallawalla.edu","karin.gitchel@wwcc.edu","serviceevents@whitman.edu","katie.palumbo@wallawalla.edu"],
    baseURL: '/serviceday',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    //This is the test database.
    ENV.firebase = 'https://test-serviceday.firebaseio.com/Winter2017/';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
