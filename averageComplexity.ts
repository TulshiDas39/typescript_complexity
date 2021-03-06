import fs = require('fs');

class AverageComplexity {

    private totalComplexity = 0;
    private functionCount = 0;
    public calculateAverageComplexity(path: string) {
        let contents = this.getContent(path);
        this.calculate(contents, 0);
    }

    private calculate(content: string, position: number) {
        let isKey = false;
        for (let i = 0; i < content.length; i++) {
            if (content[i] == '\'') isKey = !isKey;
            if (content[i] == ':' && !isKey) {
                let number = this.extractNumber(content, i + 1);
                this.totalComplexity += number;
                i += (number + "").length;
                this.functionCount++;
            }
        }

        console.log('total complexity:' + this.totalComplexity);
        console.log('function count:' + this.functionCount);
        console.log('average count:' + (this.totalComplexity / this.functionCount));
    }

    private extractNumber(content: string, position: number) {
        let numberStr = "";
        let firstDigitFound = false;
//        position += 3;
        do {
            if (content[position].match(/\d/)) {
                if(!firstDigitFound)firstDigitFound = true;
                numberStr += content[position];
            }
            else if (firstDigitFound) break;
            position++;

        } while (true);
        return parseInt(numberStr, 10);

    }

    private getContent(path: string) {

        var contents = fs.readFileSync(path, 'utf8');
        return contents;
    }

}

let aComplexity = new AverageComplexity();
//aComplexity.calculateAverageComplexity('./tsreports/gomoku-wasm.txt');
aComplexity.calculateAverageComplexity('./jsreports/connect-four.txt');