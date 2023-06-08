//envoie un message au serveur

fetch('/hello')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    }
    );
    
