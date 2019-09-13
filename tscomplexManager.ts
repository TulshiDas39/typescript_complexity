import fs = require('fs');
import path = require('path');
import * as tscomplex from 'ts-complex';

interface path {
    path: string;
}

interface maintainability {
    averageMaintainability: number;
    minMaintainability: number;
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

    public calculateComplexityOfFiles():Object[] {
        let complexity = {};
        let complexityOfFiles:Object[] = [];
        for (let i = 0; i < this.filelist.length; i++) {
            complexity = tscomplex.calculateCyclomaticComplexity(this.filelist[i].path);
            complexityOfFiles[i] = complexity;
           // console.log(Object.keys(complexity).map(function (key) { return complexity[key] }));
            //console.log(complexity);
        }

        return complexityOfFiles;

    }

    private calculateSum(data:number[]){
        let sum = 0;
        console.log('items:');
        data.forEach(item=>{
            console.log(item);
            sum+=item;
        })
        return sum;
    }

    private getValues(data:Object){
        return Object.keys(data).map(function (key) { return data[key] as number });
    }

    public calculateAverageComplexityOfProject(){
        let data = this.calculateComplexityOfFiles();
        let avComplex = 0;
        let functionCount = 0;
        for(let i = 0;i<data.length;i++){
            let values = this.getValues(data[i]);
            let sumFileComplex = this.calculateSum(values);
            avComplex += sumFileComplex;
            functionCount+=values.length;
        }
        console.log('sum:'+avComplex);
        avComplex /= functionCount;

        console.log(avComplex);

    }

    public calculateMaintainibiltyOfFile(path: string) {
        const maintainability = tscomplex.calculateMaintainability(path) as maintainability;
        console.log(maintainability);
    }

    public calculateMaintainibilityOfProject(path: string, projectType: string) {
        this.fromDir(path, projectType);
    }

}

let tscomlexManager = new TS_Complex();
//tscomlexManager.fromDir('../typescript/gomoku-wasm', 'ts');
tscomlexManager.fromDir('../javascript/gomoku', 'js');
//tscomlexManager.prntfiles();
tscomlexManager.calculateAverageComplexityOfProject();
//tscomlexManager.calculateMaintainibiltyOfFile('averageComplexity.ts');


