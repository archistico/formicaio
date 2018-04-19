function setup() {
    formicaio = new Formicaio(300, 100, 1);
    formica1 = new Formica(formicaio);
    formica2 = new Formica(formicaio);
}

function draw() {
    ellipse(50, 50, 80, 80);
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
}

class Formica {
    constructor(formicaio) {
        this.x = formicaio.x;
        this.y = formicaio.y;
        this.id = formicaio.getCount() + 1;
        formicaio.addFormica(this);
    }
}