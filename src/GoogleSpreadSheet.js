import GoogleSpreadsheet from "google-spreadsheet";
import creds from "../resources/client_secret.json";

const SpreadSheetID = "1Lh033BJdzboOd-FGfSd0EZGd3RLowHOFT2wYLNlQ7HA";

export default class SpreadSheet {
	constructor() {
		this.doc = new GoogleSpreadsheet(SpreadSheetID);
	}

	authenticateAction(action) {
		this.doc.useServiceAccountAuth(creds, action);
	}

	getInfo(resolve) {
		this.authenticateAction(() => {
			this.doc.getInfo((err, info) => {
				if (err) {
					throw new Error(err);
				} else {
					resolve(info);
				}
			});
		});
  }

	getSheet(title, resolve) {
		this.getInfo((info) => {
			let sheet = info.worksheets[0];
			if (title !== undefined) {
				sheet = info.worksheets.find((ws) => ws.title === title);
			}
			resolve(sheet);
		});
	}

	addRow(worksheet_id, data) {
		this.authenticateAction(() => {
			this.doc.addRow(worksheet_id, data, (err) => {
				if (err) {
					console.log(err);
				}
			});
		})
	}

	addNewSheet(name) {
		this.authenticateAction(() => {
			this.doc.addWorksheet({
	      title: name
	    }, (err, sheet) => {
	    	if (err) {
	    		throw new Error(err);
	    	} else {
	    		return sheet;
	    	}
	    });
		});
	}

	deleteSheet(sheetName) {
		this.getSheet(sheetName, (sheet) => sheet.del());
	}

	setSheetTitle(newTitle, oldTitle) {
		this.getSheet(oldTitle, (sheet) => sheet.setTitle(newTitle));
	}

	setHeaderRow(sheetName, headerRow) {
		this.getSheet(sheetName, (sheet) => sheet.setHeaderRow(headerRow));
	}
}
