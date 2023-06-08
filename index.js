// Description: Fichier principal du serveur

// Importation des modules
const express = require('express');
const app = express();

const http = require('http').Server(app);
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const ProgressBar = require('cli-progress');

const session = require("express-session")({
// CIR2-chat encode in sha256
    secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        secure: false
    }
});
app.use(express.static(__dirname + 'front'));
app.use(urlencodedParser);
app.use(session);
app.use(jsonParser);


//  RECUP DATA FROM WEBSITE
const progressBar = new ProgressBar.SingleBar({}, ProgressBar.Presets.shades_classic);
const total_progress = 100;


rootme_api = require('./back/rootme.js');
//rootme_api.get_rootme_data();




/*##################################################*/
/*#                                                #*/
/*#                Getion Sockets                  #*/
/*#                                                #*/
/*##################################################*/

app.get('/hello', (req, res) => {
    console.log("hello");
    const rootme = new Promise((resolve, reject) => {
        rootme_api.get_rootme_data().then(data => {
            resolve(data);
        }).catch(error => {
            reject(error);
        });
    });
    console.log(rootme)
    Promise.all([rootme]).then(data => {
        res.send(data);
    }).catch(error => {
        res.send(error);
    }
    );
})


/*##################################################*/
/*#                                                #*/
/*#               Gestion du serveur               #*/
/*#                                                #*/
/*##################################################*/

app.use(express.static(__dirname + '/front/'));

app.get('/', (req, res) => {//cree la route pour la page d'accueil
    res.sendFile(__dirname + '/front/html/main.html');
});



http.listen(8080, "127.0.0.1",() => {
    console.log("\x1b[36m%s\x1b[0m",'Serveur lancé sur le port 4300 \u{1F525}');//lance le serveur
    //affiche l'heure de connection
    var date = new Date();
    var heure = date.getHours();
    var minutes = date.getMinutes();
    var secondes = date.getSeconds();
    var jour = date.getDate();
    var mois = date.getMonth() + 1;
    var annee = date.getFullYear();
    console.log("\x1b[36m%s\x1b[0m",` ${jour}/${mois}/${annee} à ${heure}:${minutes}:${secondes}`);

});
