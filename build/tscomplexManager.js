"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var tscomplex = __importStar(require("ts-complex"));
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
            else if (filename.indexOf(filter) >= 0) {
                this.filelist.push({ path: filename });
            }
            ;
        }
        ;
    };
    TS_Complex.prototype.prntfiles = function () {
        for (var i = 0; i < this.filelist.length; i++) {
            console.log(this.filelist[i]);
        }
    };
    TS_Complex.prototype.calculateComplexity = function () {
        var complexity = {};
        for (var i = 0; i < this.filelist.length; i++) {
            complexity = tscomplex.calculateCyclomaticComplexity(this.filelist[i].path);
            console.log(complexity);
        }
    };
    return TS_Complex;
}());
var tscomlexManager = new TS_Complex();
tscomlexManager.fromDir('./typescript/gomoku-wasm', '.ts');
tscomlexManager.prntfiles();
tscomlexManager.calculateComplexity();
