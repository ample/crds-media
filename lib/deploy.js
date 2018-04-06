require('dotenv').config();
const axios = require('axios');
const qs = require('querystring');
const envs = ['int', 'demo', 'prod'];
const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Headers": "Content-Type"
};

exports.handler = function(event, context, callback) {
  const params = qs.parse(event.body);
  if(envs.indexOf(params['text']) !== -1) {
    const env = params['text'].toUpperCase();
    const key = `NETLIFY_BUILD_${env}`;
    const build_url = `https://api.netlify.com/build_hooks/${process.env[key]}`;

    axios.post(build_url).
      then(function(response) {
        callback(null, {
          statusCode,
          headers,
          body: `Thanks! A new deploy for \`crds-media: ENV=${env}\` has just been triggered.`
        });
      }).
      catch(function(error) {
        console.log(error);
      });

  } else {
    callback(null, {
      statusCode,
      headers,
      body: `Environment not found. Please specify one of the following arguments: ${envs.join(', ')}`
    });
  }
};