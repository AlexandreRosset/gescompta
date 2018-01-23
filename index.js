var http = require('http');
var app = require('express')();
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('./Config');
var Schema = require('./Schema').DB;

mongoose.connect(config.database);
app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




httpserver = http.createServer(app);
app.use(bodyParser.json());

app.post('/autentificate', function (req, res) {
    Schema.User.findOne({ 'login': req.body.login, 'isActive': true}, function (err, usr) {
        if (usr.password == req.body.password){
            res.json(usr).send();
        } else {
            res.status(401).send();
        }
    });
});

//USER

app.get('/search/user/:offset/:limit', function (req, res) {
    Schema.User.find({ 'isActive': true }, function (err, usrs) {
        res.json(usrs);
    }).skip(parseInt(req.params.offset)).limit(parseInt(req.body.limit)).exec();
});
app.get('/user/:id', function (req, res) {
    Schema.User.findById(req.params.id , function (err, usrs) {
        res.json(usrs);
    }).exec();
});
app.post('/user', function (req, res) {
    var usr = new Schema.User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        naissance: req.body.dateNaissance,
        login: req.body.login,
        password: req.body.password,
        entreprise: false,
        isActive: true
    });
    usr.save();
    res.status(200).send();
});
app.get('/user/delete/:id', function (req, res) {
    Schema.User.findByIdAndUpdate(req.params.id, {
        $set: {
            isActive: false
        }
    }, function (err, stat) {
        console.log(err);
        res.status(200).send();
    });
});

app.post('/user/update/:id', function (req, res) {
    Schema.User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, doc) {
        res.status(200).send();
    })
});

//PRODUIT

app.get('/search/produit/:offset/:limit', function (req, res) {
    Schema.Produit.find({ 'isActive': true }, function (err, prd) {
        res.json(prd);
    }).skip(parseInt(req.params.offset)).limit(parseInt(req.body.limit)).exec();
});
app.get('/produit/:id', function (req, res) {
    Schema.Produit.findById(req.params.id , function (err, prd) {
        res.json(prd);
    }).exec();
});
app.post('/produit', function (req, res) {
    var prd = new Schema.Produit({
        identifiantFonctionnel: req.body.identifiantFonctionnel,
        nom: req.body.nom,
        prix: req.body.prix,
        marque: req.body.marque,
        capaciteMemoire: req.body.capaciteMemoire,
        rafraichissement: req.body.rafraichissement,
        autonomie: req.body.autonomie,
        garantie: req.body.garantie,
        contact: req.body.contact,
        isActive: true,
        OS: [],
        interface: [],
        adresseRetour: req.body.adresseRetour
    });
    for (var i = 0; i < req.body.OS; i++){
        prd.OS.push(req.body.OS[i]);
    }
    for (var j = 0; j < req.body.interface; j++){
        prd.interface.push(req.body.interface[j]);
    }
    prd.save();
    res.status(200).send();
});
app.get('/produit/delete/:id', function (req, res) {
    Schema.Produit.findByIdAndUpdate(req.params.id, {
        $set: {
            isActive: false
        }
    }, function (err, stat) {
        console.log(err);
        res.status(200).send();
    });
});

app.post('/produit/update/:id', function (req, res) {
    Schema.Produit.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, doc) {
        res.status(200).send();
    })
});


//INTERFACE

app.get('/search/interface/:offset/:limit', function (req, res) {
    Schema.Interface.find({ 'isActive': true }, function (err, inf) {
        res.json(inf);
    }).skip(parseInt(req.params.offset)).limit(parseInt(req.body.limit)).exec();
});
app.get('/interface/:id', function (req, res) {
    Schema.Interface.findById(req.params.id , function (err, inf) {
        res.json(inf);
    }).exec();
});
app.post('/interface', function (req, res) {
    var inf = new Schema.Interface({
        nom: req.body.nom,
        isActive: true
    });
    inf.save();
    res.status(200).send();
});
app.get('/interface/delete/:id', function (req, res) {
    Schema.Interface.findByIdAndUpdate(req.params.id, {
        $set: {
            isActive: false
        }
    }, function (err, stat) {
        console.log(err);
        res.status(200).send();
    });
});

app.post('/interface/update/:id', function (req, res) {
    Schema.User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, doc) {
        res.status(200).send();
    })
});

//OS

app.get('/search/os/:offset/:limit', function (req, res) {
    Schema.OS.find({ 'isActive': true }, function (err, os) {
        res.json(os);
    }).skip(parseInt(req.params.offset)).limit(parseInt(req.body.limit)).exec();
});
app.get('/os/:id', function (req, res) {
    Schema.OS.findById(req.params.id , function (err, os) {
        res.json(os);
    }).exec();
});
app.post('/os', function (req, res) {
    var os = new Schema.OS({
        nom: req.body.nom,
        isActive: true
    });
    os.save();
    res.status(200).send();
});
app.get('/os/delete/:id', function (req, res) {
    Schema.OS.findByIdAndUpdate(req.params.id, {
        $set: {
            isActive: false
        }
    }, function (err, stat) {
        console.log(err);
        res.status(200).send();
    });
});

app.post('/os/update/:id', function (req, res) {
    Schema.OS.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, doc) {
        res.status(200).send();
    })
});

//MARQUE

app.get('/search/marque/:offset/:limit', function (req, res) {
    Schema.Marque.find({ 'isActive': true }, function (err, mrq) {
        res.json(mrq);
    }).skip(parseInt(req.params.offset)).limit(parseInt(req.body.limit)).exec();
});
app.get('/marque/:id', function (req, res) {
    Schema.Marque.findById(req.params.id , function (err, mrq) {
        res.json(mrq);
    }).exec();
});
app.post('/marque', function (req, res) {
    var mrq = new Schema.Marque({
        nom: req.body.nom,
        isActive: true
    });
    mrq.save();
    res.status(200).send();
});
app.get('/marque/delete/:id', function (req, res) {
    Schema.Marque.findByIdAndUpdate(req.params.id, {
        $set: {
            isActive: false
        }
    }, function (err, stat) {
        console.log(err);
        res.status(200).send();
    });
});

app.post('/marque/update/:id', function (req, res) {
    Schema.Marque.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, doc) {
        res.status(200).send();
    })
});

//ADRESSE

app.get('/search/adresse/:offset/:limit', function (req, res) {
    Schema.Adresse.find({ 'isActive': true }, function (err, adr) {
        res.json(adr);
    }).skip(parseInt(req.params.offset)).limit(parseInt(req.body.limit)).exec();
});

app.get('/adresse/:id', function (req, res) {
    Schema.Adresse.findById(req.params.id , function (err, usrs) {
        res.json(usrs);
    }).exec();
});
app.post('/adresse', function (req, res) {
    var adr = new Schema.Adresse({
        pays: req.body.pays,
        code_postal: req.body.code_postal,
        ville: req.body.ville,
        rue: req.body.rue,
        num_rue: req.body.num_rue,
        num_tel: req.body.num_tel,
        email: req.body.email,
        isActive: true
    });
    adr.save();
    res.status(200).send();
});
app.get('/adresse/delete/:id', function (req, res) {
    Schema.Adresse.findByIdAndUpdate(req.params.id, {
        $set: {
            isActive: false
        }
    }, function (err, stat) {
        console.log(err);
        res.status(200).send();
    });
});

app.post('/adresse/update/:id', function (req, res) {
    Schema.Adresse.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, doc) {
        res.status(200).send();
    })
});


//COMMANDE

app.get('/search/commande/:offset/:limit', function (req, res) {
    Schema.Commande.find({ 'isActive': true }, function (err, cmd) {
        res.json(cmd);
    }).skip(parseInt(req.params.offset)).limit(parseInt(req.body.limit)).exec();
});
app.get('/commande/:id', function (req, res) {
    Schema.Commande.findById(req.params.id , function (err, cmd) {
        res.json(cmd);
    }).exec();
});
app.post('/commande', function (req, res) {
    var cmd = new Schema.Commande({
        produit: req.body.produit,
        user: req.body.user,
        nombre: req.body.nombre,
        vendu: false,
        isActive: true
    });
    cmd.save();
    res.status(200).send();
});
app.get('/commande/delete/:id', function (req, res) {
    Schema.Commande.findByIdAndUpdate(req.params.id, {
        $set: {
            isActive: false
        }
    }, function (err, stat) {
        console.log(err);
        res.status(200).send();
    });
});

app.post('/commande/update/:id', function (req, res) {
    Schema.Commande.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, doc) {
        res.status(200).send();
    })
});


httpserver.listen(8081);


console.log('Server running at http://127.0.0.1:8081/');