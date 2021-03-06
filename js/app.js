let secondo = 0;
const LUNGHEZZAGENOMA = 500;

function setup() {
    var myCanvas = createCanvas(505, 505);
    myCanvas.parent('myCanvas');
    mappa = new Mappa(100, 50);

    initFormiche();
}

function draw() {

    // Se ci sono formiche nel formicaio
    if (formicaio.formiche.length > 0) {
        formicaio.formiche.forEach(function (formica) {
            formica.vivi(mappa);
        });
        mappa.disegna(formicaio);
    } else {
        // Se non ci sono più verifica migliore genoma e crossalo con il secondo
        console.log("----------------RE INIT FORMICAIO--------------");
        formica1 = new Formica(formicaio);
        formica2 = new Formica(formicaio);
        formica3 = new Formica(formicaio);
        formica4 = new Formica(formicaio);
        formica5 = new Formica(formicaio);
        formica6 = new Formica(formicaio);
        formica7 = new Formica(formicaio);
        formica8 = new Formica(formicaio);
        formica9 = new Formica(formicaio);
        formica10 = new Formica(formicaio);

        formica2.setGenoma(crossGenoma5(formicaio.bestGenome[formicaio.bestGenome.length - 1]));
        formica1.setGenoma(crossGenoma5(formicaio.bestGenome[formicaio.bestGenome.length - 1]));
        formica3.setGenoma(crossGenoma20(formicaio.bestGenome[formicaio.bestGenome.length - 1]));
        formica4.setGenoma(crossGenoma20(formicaio.bestGenome[formicaio.bestGenome.length - 1]));
        formica5.setGenoma(crossGenomaFinale(formicaio.bestGenome[formicaio.bestGenome.length - 1], formicaio.bestPerformance, 10));
        formica6.setGenoma(crossGenomaFinale(formicaio.bestGenome[formicaio.bestGenome.length - 1], formicaio.bestPerformance, 20));
        formica7.setGenoma(crossGenomaFinale(formicaio.bestGenome[formicaio.bestGenome.length - 1], formicaio.bestPerformance, 30));
        formica8.setGenoma(crossGenomaFinale(formicaio.bestGenome[formicaio.bestGenome.length - 1], formicaio.bestPerformance, 40));
        formica9.setGenoma(crossGenomaFinale(formicaio.bestGenome[formicaio.bestGenome.length - 1], formicaio.bestPerformance, 45));
        formica10.setGenoma(crossGenomaFinale(formicaio.bestGenome[formicaio.bestGenome.length - 1], formicaio.bestPerformance, 50));

        formicaio.bestGenome = [];
    }

    secondo++;
}

function crossGenoma(primo) {
    //return primo.slice(0, 24).concat(secondo.slice(25, 49));
    let lunghezzaMetaPrimo = Math.floor(primo.length / 2);
    let lunghezzaSecondo = primo.length - lunghezzaMetaPrimo;
    return primo.slice(0, lunghezzaMetaPrimo).concat(randomGenoma(lunghezzaSecondo));
}

function crossGenoma5(genoma) {
    // Ogni venti percento sostituiscilo con random
    let risultato = [];
    let venti = Math.floor(genoma.length / 20);
    let contVenti = 0;

    for (let i = 0; i < genoma.length; i++) {
        contVenti++;
        if (contVenti < venti) {
            risultato.push(genoma[i]);
        } else {
            let mov = tira(1, 4);
            switch (mov) {
                case 1: risultato.push("A"); break;
                case 2: risultato.push("I"); break;
                case 3: risultato.push("D"); break;
                case 4: risultato.push("S"); break;
            }
            if (contVenti > (2 * venti)) {
                contVenti = 0;
            }
        }
    }
    return risultato;
}

function crossGenoma20(genoma) {
    // Ogni venti percento sostituiscilo con random
    let risultato = [];
    let venti = Math.floor(genoma.length / 5);
    let contVenti = 0;

    for (let i = 0; i < genoma.length; i++) {
        contVenti++;
        if (contVenti < venti) {
            risultato.push(genoma[i]);
        } else {
            let mov = tira(1, 4);
            switch (mov) {
                case 1: risultato.push("A"); break;
                case 2: risultato.push("I"); break;
                case 3: risultato.push("D"); break;
                case 4: risultato.push("S"); break;
            }
            if (contVenti > (2 * venti)) {
                contVenti = 0;
            }
        }
    }
    return risultato;
}

function crossGenomaFinale(genoma, performance, random) {
    // Ogni venti percento sostituiscilo con random
    let risultato = [];
    let inizioRandom = performance - random;

    for (let i = 0; i < genoma.length; i++) {
        if (i < inizioRandom) {
            risultato.push(genoma[i]);
        } else {
            let mov = tira(1, 4);
            switch (mov) {
                case 1: risultato.push("A"); break;
                case 2: risultato.push("I"); break;
                case 3: risultato.push("D"); break;
                case 4: risultato.push("S"); break;
            }
        }
    }
    return risultato;
}

function randomGenoma(quantita) {
    let genoma = [];

    // Randomizza genoma
    for (let i = 0; i < quantita; i++) {
        let mov = tira(1, 4);
        switch (mov) {
            case 1: genoma.push("A"); break;
            case 2: genoma.push("I"); break;
            case 3: genoma.push("D"); break;
            case 4: genoma.push("S"); break;
        }
    }

    return genoma;
}

function initFormiche() {
    formicaio = new Formicaio(50, 25, 10);
    formica1 = new Formica(formicaio);
    formica2 = new Formica(formicaio);
    formica3 = new Formica(formicaio);
    formica4 = new Formica(formicaio);
    formica5 = new Formica(formicaio);
    formica6 = new Formica(formicaio);
    formica7 = new Formica(formicaio);
    formica8 = new Formica(formicaio);
    formica9 = new Formica(formicaio);
    formica10 = new Formica(formicaio);
}

function tira(min, max) {
    return Math.floor((Math.random() * max) + min);
}

class Formicaio {
    constructor(x, y, maxFormiche) {
        this.x = x;
        this.y = y;
        this.maxFormiche = maxFormiche;
        this.formiche = [];
        this.bestGenome = [];
        this.bestPerformance = 0;
    }

    getCount() {
        return this.formiche.length;
    }

    addFormica(formica) {
        if (this.formiche.length < (this.maxFormiche)) {
            this.formiche.push(formica);
        } else {
            console.log("Raggiunto il massimo numero di formiche");
        }
    }

    removeFormica(formica) {
        let id = this.formiche.indexOf(formica);
        this.bestGenome.push(this.formiche[id].getGenoma());
        //setta la migliore performance
        if(this.bestPerformance<this.formiche[id].movimenti) {
            this.bestPerformance = this.formiche[id].movimenti;
        }
        // Cancella la formica
        if (id > -1) {
            this.formiche.splice(id, 1);
        }

        // Causa della morte: di fame, di sete, di fame e di sete
        let causa = '';
        if (causa == '' && formica.fame == 0 && formica.sete == 0) {
            causa = 'di fame e di sete';
        }
        if (causa == '' && formica.fame != 0 && formica.sete == 0) {
            causa = 'di sete';
        }
        if (causa == '' && formica.fame == 0 && formica.sete != 0) {
            causa = 'di fame';
        }
        if (causa == '' && formica.eta == formica.maxEta) {
            causa = 'di vecchiaia';
        }

        console.log("Performance: " + formica.movimenti + " | Formica con id:" + formica.id + " rimossa dal formicaio perchè morta " + causa);
        //console.log("- Dati: " + formica.getDati());
    }
}

class Formica {
    constructor(formicaio) {
        this.x = formicaio.x;
        this.y = formicaio.y;
        this.formicaio = formicaio;
        this.eta = 0;
        this.salute = 100;
        this.fame = 100;
        this.sete = 100;
        this.movimenti = 0;
        this.id = formicaio.getCount();
        this.formicaio.addFormica(this);

        // variabili generali formiche
        this.giorno = 1440;
        this.maxEta = this.giorno * 365 * 10; // 3 anni
        this.tick = this.maxEta / 1000;

        // Genoma movimento
        // A avanti
        // I indietro
        // D destra
        // S sinistra
        this.genoma = [];

        // Randomizza genoma
        for (let i = 0; i < LUNGHEZZAGENOMA; i++) {
            let mov = tira(1, 4);
            switch (mov) {
                case 1: this.genoma.push("A"); break;
                case 2: this.genoma.push("I"); break;
                case 3: this.genoma.push("D"); break;
                case 4: this.genoma.push("S"); break;
            }
        }

        this.position = 0;
    }

    setGenoma(genoma) {
        this.genoma = genoma;
    }

    riduciSalute(value) {

        this.salute -= value;

        // controlla limiti
        if (this.salute > 100) {
            this.salute = 100;
        }
        if (this.salute < 0) {
            this.salute = 0;
        }
    }

    aumentaSalute(value) {

        this.salute += value;

        // controlla limiti
        if (this.salute > 100) {
            this.salute = 100;
        }
        if (this.salute < 0) {
            this.salute = 0;
        }
    }

    getGenoma() {
        return this.genoma;
    }

    getGenomaStr() {
        return this.genoma.toString();
    }

    vivi(mappa) {
        if ((this.salute <= 0) || (this.eta >= this.maxEta)) {
            this.formicaio.removeFormica(this);
        }

        // Muoviti
        if (this.position > (this.genoma.length - 1)) {
            this.position = 0;
        }
        switch (this.genoma[this.position]) {
            case "A": this.y += 1; break;
            case "I": this.y -= 1; break;
            case "D": this.x += 1; break;
            case "S": this.x -= 1; break;
        }
        this.position++;

        if (this.x >= mappa.width - 1) {
            this.x = mappa.width - 1;
        }
        if (this.y >= mappa.height - 1) {
            this.y = mappa.height - 1;
        }

        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.y <= 0) {
            this.y = 0;
        }

        // Controlla se la casella in cui sono c'è cibo o acqua
        // se si metti fame o sete a 100
        let checkAcqua = mappa.checkAcqua(this.x, this.y);
        let checkCibo = mappa.checkCibo(this.x, this.y);
        if (checkAcqua) {
            this.sete = 100;
            //console.log("Formica ID: " + this.id + " ha bevuto");            
        } else {
            if (this.sete > 0) {
                this.sete -= 1;
            } else {
                this.sete = 0;
            }
        }
        if (checkCibo) {
            this.fame = 100;
            //console.log("Formica ID: " + this.id + " ha mangiato");
        } else {
            if (this.fame > 0) {
                this.fame -= 1;
            } else {
                this.fame = 0;
            }
        }

        // ATTENZIONE CHE VENGONO PRESE TUTTE ASSIEME
        let checkSalute = false;

        // Se ho sia fame che sete la salute scende ancora più rapidamente
        if ((this.sete <= 0) && (this.fame <= 0) && !checkSalute) {
            checkSalute = true;
            this.riduciSalute(10);
        }

        // La sete fa scendere la salute più velocemente
        if ((this.sete <= 0) && !checkSalute) {
            checkSalute = true;
            this.riduciSalute(3);
        }

        // Controlla fame e sete per capire la salute
        if ((this.fame <= 0) && !checkSalute) {
            checkSalute = true;
            this.riduciSalute(1);
        }

        // Se sto bene, cioè non ho fame o sete, la salute risale
        if ((this.sete > 0) && (this.fame > 0) && !checkSalute) {
            checkSalute = true;
            this.aumentaSalute(1);
        }

        // Aumenta l'età
        this.eta += this.tick;

        // Aggiungi movimento
        this.movimenti += 1;
    }

    performance() {
        return this.eta.toFixed(2);
    }

    getDati() {
        return "ID:" + this.id + " | Movimenti:" + this.movimenti + " | Età:" + this.eta.toFixed(2) + " | Età max:" + this.maxEta.toFixed(2) + " | Salute:" + this.salute + " | Fame:" + this.fame + " | Sete:" + this.sete + " | Genoma:" + this.getGenomaStr();
    }
}

class Mappa {
    constructor(w, h) {
        this.width = w;
        this.height = h;

        this.caselle = w * h;
        this.terreno = [];

        for (let i = 0; i < w; i++) {
            // per ogni riga
            this.terreno[i] = [];
        }

        for (let r = 0; r < h; r++) {
            for (let c = 0; c < w; c++) {
                this.terreno[c][r] = '';
            }
        }

        let nCibo = this.caselle / 100;
        let nAcqua = this.caselle / 100;

        for (let i = 0; i < nCibo; i++) {
            this.terreno[tira(0, w)][tira(0, h)] = 'C';
        }

        for (let i = 0; i < nAcqua; i++) {
            this.terreno[tira(0, w)][tira(0, h)] = 'H';
        }

    }

    checkAcqua(x, y) {
        if (this.terreno[x][y] == 'H') {
            return true;
        } else {
            return false;
        }
    }

    checkCibo(x, y) {
        if (this.terreno[x][y] == 'C') {
            return true;
        } else {
            return false;
        }
    }

    disegna(formicaio) {

        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                switch (this.terreno[c][r]) {
                    case '':
                        fill(0, 0, 0);
                        break;
                    case 'H':
                        fill(0, 0, 255);
                        break;
                    case 'C':
                        fill(0, 255, 0);
                        break;
                }
                rect(c * 5, r * 5, 5, 5);
            }
        }

        formicaio.formiche.forEach(function (formica) {
            fill(255, 0, 0);
            rect(formica.x * 5, formica.y * 5, 5, 5);
        });

        //rect(0, 0, this.width * 5, this.height * 5);
    }
}