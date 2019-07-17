const Simio = require('../models/Simian');

module.exports = {

    async index(req, res) {
        const simios = await Simio.find({ result: "true" }).countDocuments(function (err, res) {
            if (err)
                throw err;
        });
        const human = await Simio.find({ result: "false" }).countDocuments(function (err, res) {
            if (err)
                throw err;
        });
        const ratio = simios / human;
        return res.end(JSON.stringify({ 'count_mutant_dna': simios, 'count_human_dna': human, 'ratio': ratio }));
    },

    async store(req, res) {
        const { dna } = req.body;
        result = isSimian(dna);
        const findDna = await Simio.findOne({ dna: dna });
        if (findDna == null) {
            await Simio.create({
                dna,
                result
            });
            if (result) { return res.status(200).send(); }
            else { return res.status(403).send(); }
        } else {
            if (result) { return res.status(200).send(); }
            else { return res.status(403).send(); }
        }
    }
};

var matriz = [];
var words;
var matchesPosition = [];

function isSimian(dna) {

    dnaParse = JSON.parse(JSON.stringify(dna).replace("[", "").replace("]", ""));
    matriz = dna.split('');

    var matrizFinal = matriz.map(function (elem) {
        if (elem == "A" || elem == "C" || elem == "T" || elem == "G" || elem == ",")
            return elem;
    });

    matriz = matrizFinal.join([''])
    matriz = matriz.split(',');

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
    for (var i = 0; i < lenMatriz; i++) {
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
    for (var i = 0; i < lenMatriz; i++) {
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
    for (var i = 0; i < lenMatriz; i++) {
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
    for (var i = 0; i < lenMatriz; i++) {
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
    for (var i = 0; i < lenMatriz; i++) {
        for (; x < lenMatriz; x++) {
            wtemp += matriz[x][y];
        }
        x = 0;
        y += 1;
        wtemp += ',';
    }
    return wtemp.split(',');
}