const Simio = require('../models/Simian');

module.exports = {

    async index(req, res) {
        const simios = await Simio.find({ result: "true" }).countDocuments(function (err, res) {
            if (err)
                throw err;
            console.log(res);
        });
        const human = await Simio.find({ result: "false" }).countDocuments(function (err, res) {
            if (err)
                throw err;
            console.log(res);
        });
        const ratio = simios / human;
        return res.json("count_mutant_dna:" + simios + " count_human_dna:" + human + " ratio:" + ratio);
    },

    async store(req, res) {
        const { dna } = req.body;
        if (isSimian(dna)) {
            result = true
        }
        else {
            result = false
        }
        const simio = await Simio.create({
            dna,
            result
        })
        if (result) {
            res.status(200).send('Is Simian!');
            return res.json({ ok: simio });
        }
        else {
            res.status(403).send('Is human!');
        }
    }
};

var matriz = [];
var words;
var matchesPosition = [];

function isSimian(dna) {

    dnaParse = JSON.parse(JSON.stringify(dna).trim().replace("[","").replace("]",""));
    console.log(dnaParse);
    matriz = dnaParse.split('"');  
    matriz.shift();
    matriz.pop();
    var index = matriz.indexOf(',');

    while(index >= 0){
        matriz.splice(index, 1);
        index = matriz.indexOf(',');
    }
    
    words = ['CCCC', 'TTTT', 'GGGG', 'AAAA']

    var diagonal1 = searchTopRigth(0, 0, matriz.length);
    var diagonal2 = searchDownLeft(0, 0, matriz.length);
    var diagonal3 = searchTopRigth2(0, 5, matriz.length);
    var diagonal4 = searchDownLeft2(0, 5, matriz.length);
    var vertical = searchVertical(0, 0, matriz.length);
    var dnaCompleto = matriz.concat(diagonal1, diagonal2, diagonal3, diagonal4, vertical);
    
    words.forEach(function (w) {
        var wr = w.split('').reverse().join('');
        for (var i = 0, len = dnaCompleto.length; i < len; i++) {
            if (dnaCompleto[i].indexOf(wr) !== -1) {
                matchesPosition.push({
                    word: w
                });
            }
        }
    });

    if (matchesPosition.length > 1) {
        return true;
    } else {
        return false;
    }
};

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
