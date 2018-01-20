var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gescompta');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: Schema.Types.ObjectId,
    nom: Schema.Types.String,
    prenom: Schema.Types.String,
    naissance: Schema.Types.Date,
    login: Schema.Types.String,
    password: Schema.Types.String,
    entreprise: Schema.Types.Boolean,
    isActive: Schema.Types.Boolean
});
var produitSchema = new Schema({
    id: Schema.Types.ObjectId,
    identifiantFonctionnel: Schema.Types.String,
    nom: Schema.Types.String,
    prix: Schema.Types.Number,
    marque: { type: Schema.Types.ObjectId, ref: 'Marque'},
    capaciteMemoire: Schema.Types.Number,
    rafrachissement: Schema.Types.Number,
    autonomie: Schema.Types.Number,
    OS: [{ type: Schema.Types.ObjectId, ref: 'OS'}],
    interface: [{ type: Schema.Types.ObjectId, ref: 'Interface'}],
    garantie: Schema.Types.Number,
    contact: Schema.Types.String,
    adresseRetour: { type: Schema.Types.ObjectId, ref: 'Adresse'},
    IsActive: Schema.Types.Boolean
});
var interfaceSchema = new Schema({
    id: Schema.Types.ObjectId,
    nom: Schema.Types.String,
    IsActive: Schema.Types.Boolean
});
var OSSchema = new Schema ({
    id: Schema.Types.ObjectId,
    nom: Schema.Types.String,
    IsActive: Schema.Types.Boolean
});
var MarqueSchema = new Schema ({
    id: Schema.Types.ObjectId,
    nom: Schema.Types.String,
    IsActive: Schema.Types.Boolean
});
var adresseSchema = new Schema({
    id: Schema.Types.ObjectId,
    pays: Schema.Types.String,
    code_postal: Schema.Types.Number,
    ville: Schema.Types.String,
    rue: Schema.Types.String,
    num_rue: Schema.Types.String,
    num_tel: Schema.Types.Number,
    email: Schema.Types.String,
    isActive: Schema.Types.Boolean
});
var commandeSchema = new Schema({
    id: Schema.Types.ObjectId,
    produit: { type: Schema.Types.ObjectId, ref: 'Produit'},
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    nombre: Schema.Types.Number,
    vendu: Schema.Types.Boolean
});

var User = mongoose.model('User', userSchema);
var Produit = mongoose.model('Produit', produitSchema);
var Interface = mongoose.model('Interface', interfaceSchema);
var OS = mongoose.model('OS', OSSchema);
var Marque = mongoose.model('Marque', MarqueSchema);
var Adresse = mongoose.model('Adresse', adresseSchema);
var Commande = mongoose.model('Commande', commandeSchema);

module.exports.DB = {
    'User': User,
    'Produit': Produit,
    'Interface': Interface,
    'OS': OS,
    'Marque': Marque,
    'Adresse': Adresse,
    'Commande': Commande
};