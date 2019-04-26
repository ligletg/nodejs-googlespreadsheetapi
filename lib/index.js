"use strict";

var _GoogleSpreadsheet = _interopRequireDefault(require("./GoogleSpreadsheet.js"));

var _http = _interopRequireDefault(require("http"));

var _querystring = _interopRequireDefault(require("querystring"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var doc = new _GoogleSpreadsheet["default"](); // doc.getInfoAndWorksheets()
// doc.setSheetTitle("helloworld");
// doc.addNewSheet("test2");
// doc.deleteSheet("test2");
// doc.setHeaderRow(undefined, ['clientid', 'startdate', 'timestamp', 'x', 'y', 'z']);
// doc.addRow(1, { last_name: 'Something', first_name: 'New' });
// import http from "http";
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write('Hello World!');
//   res.end();
// }).listen(8080);

var server = _http["default"].createServer(function (req, res) {
  // /* eslint-disable no-console */
  // console.log(req.url);
  // res.writeHead(200, {'Content-Type': 'text/plain'});
  // res.write('Hello World!');
  // res.end();
  req.on("data", function (data) {
    body += data;

    if (body.length > 1e6) {
      req.connection.destroy();
    }
  });
  ret.on("end", function () {
    var post = _querystring["default"].parse(body);
    /* eslint-disable no-console */


    console.log(post);
  });
}).listen(8080);