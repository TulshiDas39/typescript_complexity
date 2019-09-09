import fs = require('fs');
import path = require('path');
import * as tscomplex from 'ts-complex';



class TS_Complex {

    private filelist: string[] = [];
    public fromDir(startPath: string, filter: string) {

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
                this.filelist.push(filename);
            };
        };
    }

    prntfiles() {
        for (let i = 0; i < this.filelist.length; i++) {
            console.log(this.filelist[i]);
        }
    }

    calculateComplexity() {
        let complexity = {};
        for (let i = 0; i < this.filelist.length; i++) {
            complexity = tscomplex.calculateCyclomaticComplexity(this.filelist[i]);
            console.log(complexity);
        }

    }

}

let tscomlexManager = new TS_Complex();
tscomlexManager.fromDir('./typescript/gomoku-wasm', '.ts');
tscomlexManager.prntfiles();
tscomlexManager.calculateComplexity();


