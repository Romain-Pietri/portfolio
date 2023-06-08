const apiUrl = 'https://api.www.root-me.org/auteurs/258934';
const apiKey = '258934_df3b738120acda816521ffb992ec2e57fc7b5549976a2097bc496107e58ce213';
const iud = 258934;
// Options de requête
const requestOptions = {
  headers: {
    'Cookie': `api_key=${apiKey}`
  }
};

// Envoyer la requête GET à l'API
async function get_rootme_data() {
    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      // Traiter les données de la réponse
      //console.log(data);
  
      return data; // Renvoyer les données récupérées
    } catch (error) {
      // Gérer les erreurs de requête
      console.error(error);
      throw error; // Lancer une exception pour signaler l'erreur
    }
  }
  
 
  
module.exports.get_rootme_data = get_rootme_data;