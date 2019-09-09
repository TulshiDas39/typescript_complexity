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
        position += 3;
        do {
            numberStr += content.charAt(position);
            position++;
        } while (' \t\n\r\v,}'.indexOf(content[position]) < 0);
        var num = parseInt(numberStr, 10);
        return num;
    };
    AverageComplexity.prototype.getContent = function (path) {
        var contents = fs.readFileSync(path, 'utf8');
        return contents;
    };
    return AverageComplexity;
}());
var aComplexity = new AverageComplexity();
aComplexity.calculateAverageComplexity('./tsreports/gomoku-wasm.txt');
