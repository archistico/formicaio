function setup() {
    formicaio = new Formicaio(300, 100, 10);
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

function draw() {
    //ellipse(50, 50, 80, 80);
    formicaio.formiche.forEach(function(formica) {
        formica.vivi();
    });
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

        this.maxVita = 86400 * 3;
    }

    vivi() {
        if (this.salute <= 0) {
            this.formicaio.removeFormica(this);
        }
        this.salute -= 86400;
        this.eta += 1;
    }

    // Azioni formica
    /**
     *  
     */
}