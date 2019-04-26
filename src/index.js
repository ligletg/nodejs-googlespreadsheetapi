"use strict";
import SpreadSheet from "./GoogleSpreadsheet.js";
import http from "http";

const doc = new SpreadSheet();
doc.setHeaderRow(undefined, ["CLIENT_ID", "SESSION_START", "TIMESTAMP", "X", "Y", "Z"]);
const writeToDoc = (data) => {
  const formattedData = JSON.parse(data);
  if (formattedData && formattedData.length > 0) {
    formattedData.forEach(d => doc.addRow(1, d));
  }
}

const server = http.createServer(function (req, res) {
  let body = "";
  req.on("data", (data) => {
    body += data;
    if (body.length > 1e6) {
      req.connection.destroy();
    }
  });
  req.on("end", () => {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("OK");
    res.end();
    writeToDoc(body);
  })
}).listen(8080);
