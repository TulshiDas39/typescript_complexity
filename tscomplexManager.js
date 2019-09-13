"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var tscomplex = require("ts-complex");
var TS_Complex = /** @class */ (function () {
    function TS_Complex() {
        this.filelist = [];
    }
    TS_Complex.prototype.fromDir = function (startPath, filter) {
        if (!fs.existsSync(startPath)) {
            console.log("no dir ", startPath);
            return;
        }
        var files = fs.readdirSync(startPath);
        // console.log(files);
        for (var i = 0; i < files.length; i++) {
            var filename = path.join(startPath, files[i]);
            var stat = fs.lstatSync(filename);
            if (stat.isDirectory()) {
                this.fromDir(filename, filter); //recurse
            }
            else if (filename.split('.').slice(-1)[0] == filter && filename.split('.').slice(-2)[0] != 'min') {
                this.filelist.push({ path: filename });
            }
            ;
        }
        ;
    };
    TS_Complex.prototype.prntfiles = function () {
        for (var i = 0; i < this.filelist.length; i++) {
            console.log(this.filelist[i].path);
        }
    };
    TS_Complex.prototype.calculateComplexityOfFiles = function () {
        var complexity = {};
        var complexityOfFiles = [];
        for (var i = 0; i < this.filelist.length; i++) {
            complexity = tscomplex.calculateCyclomaticComplexity(this.filelist[i].path);
            complexityOfFiles[i] = complexity;
            // console.log(Object.keys(complexity).map(function (key) { return complexity[key] }));
            //console.log(complexity);
        }
        return complexityOfFiles;
    };
    TS_Complex.prototype.calculateSum = function (data) {
        var sum = 0;
        console.log('items:');
        data.forEach(function (item) {
            console.log(item);
            sum += item;
        });
        return sum;
    };
    TS_Complex.prototype.getValues = function (data) {
        return Object.keys(data).map(function (key) { return data[key]; });
    };
    TS_Complex.prototype.calculateAverageComplexityOfProject = function () {
        var data = this.calculateComplexityOfFiles();
        var avComplex = 0;
        var functionCount = 0;
        for (var i = 0; i < data.length; i++) {
            var values = this.getValues(data[i]);
            var sumFileComplex = this.calculateSum(values);
            avComplex += sumFileComplex;
            functionCount += values.length;
            if (values.length !== 0)
                console.log('complexity of file:' + sumFileComplex / values.length);
        }
        console.log('sum:' + avComplex);
        avComplex /= functionCount;
        console.log(avComplex);
    };
    TS_Complex.prototype.calculateMaintainibiltyOfFile = function (path) {
        var maintainability = tscomplex.calculateMaintainability(path);
        console.log(maintainability);
    };
    TS_Complex.prototype.calculateMaintainibilityOfProject = function (path, projectType) {
        this.fromDir(path, projectType);
    };
    return TS_Complex;
}());
var tscomlexManager = new TS_Complex();
//tscomlexManager.fromDir('../typescript/gomoku-wasm', 'ts');
tscomlexManager.fromDir('../javascript/gomoku', 'js');
//tscomlexManager.prntfiles();
tscomlexManager.calculateAverageComplexityOfProject();
//tscomlexManager.calculateMaintainibiltyOfFile('averageComplexity.ts');
