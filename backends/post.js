// backend demo script


exports.reply = function (request, h) {

   console.log(request.payload);

    h(request.payload);

};
