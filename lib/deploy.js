var axios = require('axios');
require('dotenv').config();

exports.handler = function(event, context, callback) {
  axios.post(process.env.NETLIFY_BUILD_HOOK).
    then(function(response) {
      console.log(response);
      let json = {
        "response_type": "ephemeral",
        "text": `Thanks! A new deploy for \`crds-media: ENV=${process.env.JEKYLL_ENV}\` has just been triggered.`
      };
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(json)
      });
    }).
    catch(function(error) {
      console.log(error);
    });
};
