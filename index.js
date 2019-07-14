var matriz;
var words;
var matchesPosition = [];

function main() {

    matriz = ['CTGAGA', 'CTGAGC', 'TATTGT', 'AGAGGG', 'CCCCTA', 'TCACTG']
    words = ['CCCC', 'TTTT', 'GGGG', 'AAAA']

    var diagonal1 = searchTopRigth(0, 0, matriz.length);
    var diagonal2 = searchDownLeft(0, 0, matriz.length);
    var diagonal3 = searchTopRigth2(0, 5, matriz.length);
    var diagonal4 = searchDownLeft2(0, 5, matriz.length);
    var vertical = searchVertical(0, 0, matriz.length);
    var dna = matriz.concat(diagonal1, diagonal2, diagonal3, diagonal4, vertical);
    console.log(isSimian(dna));
};
main();
function isSimian(dna) {
    words.forEach(function (w) {
        var wr = w.split('').reverse().join('');
        for (var i = 0, len = dna.length; i < len; i++) {
            if (dna[i].indexOf(wr) !== -1) {
                matchesPositionAdd(w);
            }
        }
    });
    if (matchesPosition.length > 1) {
        return true;
    } else {
        return false;
    }
}
function searchDownLeft(x, y, lenMatriz) {
    var wtemp = "";
    for (var i = 0; i < matriz.length; i++) {
        x += i;
        for (; x < lenMatriz; x++ , y++) {
            wtemp += matriz[x][y];
        }
        x = 0;
        y = 0;
        wtemp += ',';
    }
    return wtemp.split(',');
}
function searchDownLeft2(x, y, lenMatriz) {
    var wtemp = "";
    for (var i = 0; i < matriz.length; i++) {
        y -= i;
        for (; x < lenMatriz; x++ , y--) {
            wtemp += matriz[x][y];
        }
        x = 0;
        y = 5;
        lenMatriz--;
        wtemp += ',';
    }
    return wtemp.split(',');
}
function searchTopRigth(x, y, lenMatriz) {
    var wtemp = "";
    for (var i = 0; i < matriz.length; i++) {
        y += i;
        for (; x < lenMatriz; x++ , y++) {
            wtemp += matriz[x][y];
        }
        x = 0;
        y = 0;
        lenMatriz--;
        wtemp += ',';
    }
    return wtemp.split(',');
}
function searchTopRigth2(x, y, lenMatriz) {
    var wtemp = "";
    for (var i = 0; i < matriz.length; i++) {
        x += i;
        for (; x < lenMatriz; x++ , y--) {
            wtemp += matriz[x][y];
        }
        x = 0;
        y = 5;
        wtemp += ',';
    }
    return wtemp.split(',');
}
function searchVertical(x, y, lenMatriz) {
    var wtemp = "";
    for (var i = 0; i < matriz.length; i++) {
        for (; x < lenMatriz; x++) {
            wtemp += matriz[x][y];
        }
        x = 0;
        y += 1;
        wtemp += ',';
    }
    return wtemp.split(',');
}
function matchesPositionAdd(w) {
    matchesPosition.push({
        word: w
    });
}
