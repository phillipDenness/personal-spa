const fs = require('fs');
const argv = require('yargs');

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
const environment = argv.environment;
const isProd = environment === 'prod';

// console.log(environment);
// let targetPath = './src/environments/environment.ts';
// if (isProd) {
 const targetPath = './src/environments/environment.ts';
// }
const envConfigFile = `
export const environment = {
  production: true,
  firebase: {
    apiKey: "${process.env.FIREBASEKEY}",
    authDomain: "${process.env.FIREBASEAUTHDOMAIN}",
    databaseURL: "${process.env.FIREBASEDBURL}",
    projectId: "${process.env.FIREBASEPROJECTID}",
    storageBucket: "${process.env.FIREBASESTORAGEBUCKET}",
    messagingSenderId:"${process.env.FIREBASEMSSAGINGSENDERID}"
  },
  googleApi: {
      apiKey: "${process.env.GOOGLEAPIKEY}"
  },
  scraperApi: {
      url: "${process.env.SCRAPERAPIURL}"
  }
};
`;
fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
