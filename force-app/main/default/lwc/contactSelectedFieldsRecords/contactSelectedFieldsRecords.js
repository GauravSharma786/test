import { LightningElement, api, track } from 'lwc';

export default class ContactSelectedFieldsRecords extends LightningElement {
    @api tableData;

    get columns() {
        if (this.tableData) {
            // console.log('OUTPUT : ', JSON.parse(Json.stringify(this.tableData.coloums)));
            console.log('Coloums', JSON.parse(this.tableData));
            let data = JSON.parse(this.tableData);
            return JSON.parse(data.coloums);
        }
        //   console.log('OUTPUT : ', JSON.parse(Json.stringify(this.tableData.coloums)));
        return null;

    }

    get contacts() {

        if (this.tableData) {
            let data = JSON.parse(this.tableData);
            return JSON.parse(data.contacts);
        }
        return null;

    }


    downloadCSVFile() {
        let data = JSON.parse(this.tableData);
        let contacts = JSON.parse(data.contacts);

        let rowEnd = '\n';
        let csvString = '';
        let rowData = new Set();
        contacts.forEach(function (record) {
            Object.keys(record).forEach(function (key) {
                if (key != 'attributes' && key != 'Id') {
                    rowData.add(key);
                }

            });
        });
        rowData = Array.from(rowData);
        // splitting using ','
        csvString += rowData.join(',');
        csvString += rowEnd;
        for (let i = 0; i < contacts.length; i++) {
            let colValue = 0;
            for (let key in rowData) {
                if (rowData.hasOwnProperty(key)) {
                    let rowKey = rowData[key]; // add , after every value except the first. 
                    if (colValue > 0) {
                        csvString += ',';
                    }
                    let value = contacts[i][rowKey] === undefined ? '' : contacts[i][rowKey];
                    csvString += '"' + value + '"'; colValue++;
                }
            } csvString += rowEnd;
        } // Creating anchor element to download 
        let downloadElement = document.createElement('a');
        downloadElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);
        downloadElement.target = '_self'; // CSV File Name 
        downloadElement.download = 'Contact Data.csv'; // below statement is required if you are using firefox browser
        document.body.appendChild(downloadElement); // click() Javascript function to download CSV file 
        downloadElement.click();
    }
}