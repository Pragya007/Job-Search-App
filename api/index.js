// imported dependencies and libraries
const createServer = require('http').createServer;
const url = require('url');
const axios = require('axios');
const chalk = require('chalk');
const config = require('./config');

// Object containing headers that needs to be send back to front-end
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
};

// Creating server
const server = createServer((req, res) => {

  // To get the URL and save into object
  const requestURL = url.parse(req.url);

  // decoding into { 'search': sde, 'location': india}
  const decodedParams = decodeParams(new URLSearchParams(requestURL.search));

  //Destructuring into individual variables
  const { search, location, country = 'in' }  = decodedParams;

  // constructing target URL
  const targetURL = `${config.BASE_URL}/${country.toLowerCase()}/${config.BASE_PARAMS}&app_id=${config.APP_ID}&app_key=${config.API_KEY}&what=${search}&where=${location}`;
  
    // Sending data to axios
    // Checking that only GET requests are send
    if (req.method === 'GET') { 

      // for debugging
      console.log(chalk.blue(`Proxy GET request to : ${targetURL}`));

      // Sending to axios if success then promise send back otherwise catching errors
      axios.get(targetURL)
        .then(response => {
          res.writeHead(200, headers);
          res.end(JSON.stringify(response.data));
        })
        .catch(response => {
          console.log(chalk.red(response));
          res.writeHead(500, headers);
          res.end(JSON.stringify(response));
        });
    } 
});

server.listen(3000, () => {
  console.log(chalk.green('Server listening to Port: 3000'));
} );

// ?search=sde&location=india
const decodeParams = searchParams => Array
  .from(searchParams.keys())
  .reduce((acc, key) => ({ ...acc, [key]: searchParams.get(key) }), {});