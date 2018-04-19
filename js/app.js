let secondo = 0;

function setup() {
    var myCanvas = createCanvas(505, 505);
    myCanvas.parent('myCanvas');

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

    mappa = new Mappa(100, 50);
}

function draw() {
    //ellipse(50, 50, 80, 80);
    formicaio.formiche.forEach(function(formica) {
        formica.vivi(mappa);
    });

    mappa.disegna(formicaio);

    secondo++;
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
        if (id > -1) {
            this.formiche.splice(id, 1);
        }
        console.log("Formica con id: " + formica.id + " rimossa dal formicaio");
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
        this.id = formicaio.getCount();
        this.formicaio.addFormica(this);

        // variabili generali formiche
        this.maxEta = 86400 * 365 * 5; // 3 giorni
        this.maxFame = 86400 * 10;
        this.maxSete = 86400 * 3;
        this.tick = this.maxEta / 10000;
    }

    vivi(mappa) {
        if ((this.salute <= 0) || (this.eta >= this.maxEta)) {
            this.formicaio.removeFormica(this);
        }

        // Controlla se la casella in cui sono c'è cibo o acqua
        // se si metti fame o sete a 100
        if (mappa.checkAcqua(this.x, this.y)) {
            this.sete = 100;
        }
        if (mappa.checkCibo(this.x, this.y)) {
            this.fame = 100;
        }

        // Controlla fame e sete per capire la salute
        //this.salute -= 1;

        // Aumenta l'età
        this.eta += this.tick;
    }

    // Azioni formica
    /**
     *  
     */
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
        let nAcqua = this.caselle / 200;

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

        formicaio.formiche.forEach(function(formica) {
            fill(255, 0, 0);
            rect(formica.x * 5, formica.y * 5, 5, 5);
        });

        //rect(0, 0, this.width * 5, this.height * 5);
    }
}