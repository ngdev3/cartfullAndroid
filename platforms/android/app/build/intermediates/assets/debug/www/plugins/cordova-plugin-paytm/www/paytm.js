cordova.define("cordova-plugin-paytm.paytm", function(require, exports, module) {
module.exports = {
    startPayment: function(options, successCallback, failureCallback) {
        cordova.exec(successCallback,
            failureCallback,
            "PayTM",
            "startPayment", [JSON.stringify(options)]);
    }
};
});
