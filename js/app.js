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

        // Causa della morte: di fame, di sete, di fame e di sete
        let causa = '';
        if(causa=='' && formica.fame == 0 && formica.sete == 0) {
            causa = 'di fame e di sete';
        }
        if(causa=='' && formica.fame != 0 && formica.sete == 0) {
            causa = 'di sete';
        }
        if(causa=='' && formica.fame == 0 && formica.sete != 0) {
            causa = 'di fame';
        }

        console.log("Formica con id:" + formica.id + " rimossa dal formicaio perchè morta "+causa);
        console.log("- Dati: "+formica.getDati());
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
        this.giorno = 1440;
        this.maxEta = this.giorno * 365; // 3 giorni
        this.tick = this.maxEta/365;

        // Genoma movimento
        // A avanti
        // I indietro
        // D destra
        // S sinistra
        this.genoma = [];

        // Randomizza genoma
        for(let i=0; i<50; i++) {
            let mov = tira(1, 4);
            switch(mov) {
                case 1: this.genoma.push("A"); break;
                case 2: this.genoma.push("I"); break;
                case 3: this.genoma.push("D"); break;
                case 4: this.genoma.push("S"); break;
            }
        }

        this.position = 0;
    }

    riduciSalute(value) {
        
        this.salute -= value;

        // controlla limiti
        if(this.salute > 100) {
            this.salute = 100;
        }
        if(this.salute < 0) {
            this.salute = 0;
        }
    }

    aumentaSalute(value) {
        
        this.salute += value;

        // controlla limiti
        if(this.salute > 100) {
            this.salute = 100;
        }
        if(this.salute < 0) {
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
        if(this.position > (this.genoma.length-1)) {
            this.position = 0;
        }
        switch(this.genoma[this.position]) {
            case "A": this.y+=1; break;
            case "I": this.y-=1; break;
            case "D": this.x+=1; break;
            case "S": this.x-=1; break;
        }
        this.position++;

        if(this.x >= mappa.width-1) {
            this.x = mappa.width-1;
        }
        if(this.y >= mappa.height-1) {
            this.y = mappa.height-1;
        }

        if(this.x <= 0) {
            this.x = 0;
        }
        if(this.y <= 0) {
            this.y = 0;
        }

        // Controlla se la casella in cui sono c'è cibo o acqua
        // se si metti fame o sete a 100
        let checkAcqua = mappa.checkAcqua(this.x, this.y);
        let checkCibo = mappa.checkCibo(this.x, this.y);
        if (checkAcqua) {
            this.sete = 100;
            console.log("Formica ID: " + this.id + " ha bevuto");            
        } else {
            if(this.sete>0) {
                this.sete -= 1;
            } else {
                this.sete = 0;
            }
        }
        if (checkCibo) {
            this.fame = 100;
            console.log("Formica ID: " + this.id + " ha mangiato");
        } else {
            if(this.fame>0) {
                this.fame -= 1;
            } else {
                this.fame = 0;
            }
        }
         
        // ATTENZIONE CHE VENGONO PRESE TUTTE ASSIEME
        let checkSalute = false;

        // Se ho sia fame che sete la salute scende ancora più rapidamente
        if((this.sete<=0) && (this.fame<=0) && !checkSalute) {
            checkSalute = true;
            this.riduciSalute(10);
        }

        // La sete fa scendere la salute più velocemente
        if((this.sete<=0) && !checkSalute) {
            checkSalute = true;
            this.riduciSalute(3);
        }

        // Controlla fame e sete per capire la salute
        if((this.fame<=0) && !checkSalute) {
            checkSalute = true;
            this.riduciSalute(1);
        }
        

        // Se sto bene, cioè non ho fame o sete, la salute risale
        if((this.sete>0) && (this.fame>0) && !checkSalute) {
            checkSalute = true;
            this.aumentaSalute(1);
        }

        // Aumenta l'età
        this.eta += this.tick;
    }

    performance() {
        return this.eta.toFixed(2);
    }

    getDati() {
        return "ID:" + this.id + " | Età:"+ this.eta.toFixed(2) + " | Età max:"+ this.maxEta.toFixed(2) +" | Salute:" + this.salute + " | Fame:" + this.fame + " | Sete:" + this.sete+ " | Genoma:" + this.getGenomaStr();
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

        formicaio.formiche.forEach(function(formica) {
            fill(255, 0, 0);
            rect(formica.x * 5, formica.y * 5, 5, 5);
        });

        //rect(0, 0, this.width * 5, this.height * 5);
    }
}