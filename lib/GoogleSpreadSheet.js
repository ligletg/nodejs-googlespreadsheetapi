"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _googleSpreadsheet = _interopRequireDefault(require("google-spreadsheet"));

var _client_secret = _interopRequireDefault(require("../resources/client_secret.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SpreadSheetID = "1Lh033BJdzboOd-FGfSd0EZGd3RLowHOFT2wYLNlQ7HA";

var SpreadSheet =
/*#__PURE__*/
function () {
  function SpreadSheet() {
    _classCallCheck(this, SpreadSheet);

    this.doc = new _googleSpreadsheet["default"](SpreadSheetID);
  }

  _createClass(SpreadSheet, [{
    key: "authenticateAction",
    value: function authenticateAction(action) {
      this.doc.useServiceAccountAuth(_client_secret["default"], action);
    }
  }, {
    key: "getInfo",
    value: function getInfo(resolve) {
      var _this = this;

      this.authenticateAction(function () {
        _this.doc.getInfo(function (err, info) {
          if (err) {
            throw new Error(err);
          } else {
            resolve(info);
          }
        });
      });
    }
  }, {
    key: "getSheet",
    value: function getSheet(title, resolve) {
      this.getInfo(function (info) {
        var sheet = info.worksheets[0];

        if (title !== undefined) {
          sheet = info.worksheets.find(function (ws) {
            return ws.title === title;
          });
        }

        resolve(sheet);
      });
    }
  }, {
    key: "addRow",
    value: function addRow(position, data) {
      var _this2 = this;

      this.authenticateAction(function () {
        _this2.doc.addRow(position, data, function (err) {
          if (err) {
            console.log(err);
          }
        });
      });
    }
  }, {
    key: "addNewSheet",
    value: function addNewSheet(name) {
      var _this3 = this;

      this.authenticateAction(function () {
        _this3.doc.addWorksheet({
          title: name
        }, function (err, sheet) {
          if (err) {
            throw new Error(err);
          } else {
            return sheet;
          }
        });
      });
    }
  }, {
    key: "deleteSheet",
    value: function deleteSheet(sheetName) {
      this.getSheet(sheetName, function (sheet) {
        return sheet.del();
      });
    }
  }, {
    key: "setSheetTitle",
    value: function setSheetTitle(newTitle, oldTitle) {
      this.getSheet(oldTitle, function (sheet) {
        return sheet.setTitle(newTitle);
      });
    }
  }, {
    key: "setHeaderRow",
    value: function setHeaderRow(sheetName, headerRow) {
      this.getSheet(sheetName, function (sheet) {
        return sheet.setHeaderRow(headerRow);
      });
    }
  }]);

  return SpreadSheet;
}();

exports["default"] = SpreadSheet;