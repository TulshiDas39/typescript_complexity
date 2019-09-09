import fs = require('fs');
import path = require('path');
import * as tscomplex from 'ts-complex';

interface path {
    path: string;
}

class TS_Complex {

    private filelist: path[] = [];
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
            else if (filename.split('.').slice(-1)[0] == filter && filename.split('.').slice(-2)[0] != 'min') {
                this.filelist.push({ path: filename });
            };
        };
    }

    public prntfiles() {
        for (let i = 0; i < this.filelist.length; i++) {
            console.log(this.filelist[i].path);
        }
    }

    public calculateTSComplexity() {
        let complexity = {};
        for (let i = 0; i < this.filelist.length; i++) {
            complexity = tscomplex.calculateCyclomaticComplexity(this.filelist[i].path);
            console.log(complexity);
        }

    }

}

let tscomlexManager = new TS_Complex();
//tscomlexManager.fromDir('../typescript/gomoku-wasm', 'ts');
tscomlexManager.fromDir('../javascript/gomoku', 'js');
tscomlexManager.prntfiles();
tscomlexManager.calculateTSComplexity();


