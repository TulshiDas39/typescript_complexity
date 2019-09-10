"use strict";
exports.__esModule = true;
var fs = require("fs");
var AverageComplexity = /** @class */ (function () {
    function AverageComplexity() {
        this.totalComplexity = 0;
        this.functionCount = 0;
    }
    AverageComplexity.prototype.calculateAverageComplexity = function (path) {
        var contents = this.getContent(path);
        this.calculate(contents, 0);
        //console.log(contents);
    };
    AverageComplexity.prototype.calculate = function (content, position) {
        var isKey = false;
        for (var i = 0; i < content.length; i++) {
            if (content[i] == '\'')
                isKey = !isKey;
            if (content[i] == ':' && !isKey) {
                var number = this.extractNumber(content, i + 1);
                this.totalComplexity += number;
                i += (number + "").length;
                this.functionCount++;
            }
        }
        console.log('total complexity:' + this.totalComplexity);
        console.log('function count:' + this.functionCount);
        console.log('average count:' + (this.totalComplexity / this.functionCount));
    };
    AverageComplexity.prototype.extractNumber = function (content, position) {
        var numberStr = "";
        var firstDigitFound = false;
        //        position += 3;
        do {
            if (content[position].match(/\d/)) {
                if (!firstDigitFound)
                    firstDigitFound = true;
                numberStr += content[position];
            }
            else if (firstDigitFound)
                break;
            position++;
        } while (true);
        return parseInt(numberStr, 10);
    };
    AverageComplexity.prototype.getContent = function (path) {
        var contents = fs.readFileSync(path, 'utf8');
        return contents;
    };
    return AverageComplexity;
}());
var aComplexity = new AverageComplexity();
//aComplexity.calculateAverageComplexity('./tsreports/gomoku-wasm.txt');
aComplexity.calculateAverageComplexity('./jsreports/connect-four.txt');
