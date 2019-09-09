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
    TS_Complex.prototype.calculateTSComplexity = function () {
        var complexity = {};
        for (var i = 0; i < this.filelist.length; i++) {
            complexity = tscomplex.calculateCyclomaticComplexity(this.filelist[i].path);
            console.log(complexity);
        }
    };
    return TS_Complex;
}());
var tscomlexManager = new TS_Complex();
tscomlexManager.fromDir('../typescript/gomoku-wasm', 'ts');
//tscomlexManager.fromDir('../javascript/electron-player', 'js');
tscomlexManager.prntfiles();
tscomlexManager.calculateTSComplexity();
