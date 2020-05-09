const express = require('express');
const axios = require('axios');
const router = express.Router();

const routes = function () {

  router.get('/', (req, res) => {
    res.render('home');
  });

  router.get('/login', (req, res) => {
    console.log('AYYYYY');

    // const gState = '123';
    // const scope = 'https://www.googleapis.com/auth/plus.me';
    // const prompt = 'select_account';
    // const includeGrantedScopes = true;
    // const responseType = 'code';
    // const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&include_granted_scopes=${includeGrantedScopes}&response_type=${responseType}&state=${gState}&redirect_uri=${process.env.REDIRECT_URI}&client_id=${process.env.CLIENT_ID}&prompt=${prompt}`;
    // console.log('URL:', url);
    // res.set({
    //   'access-control-allow-origin': '*',
    //   'content-length': '100',
    //   'warning': "with content type charset encoding will be added by default"
    // });
    // res.redirect(url);
    // res.send(url);
  });

  router.get('/token', (req, res) => {
    const { query: { code } } = req;
    console.log('AUTH CODE:', code);

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const redirectUri = process.env.REDIRECT_URI;
    const grantType = 'authorization_code';
    const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&redirect_uri=${redirectUri}&grant_type=${grantType}`;
    console.log('URL:', url);
    axios.post(url, config);
    // res.render('home');
  });

  router.get('/redirect', (req, res) => {
    const { query: { code } } = req;
    console.log('\n====================');
    console.log('REDIRECT:', req);
    res.render('home');
  });

  router.get('/*', (req, res) => {
    res.render('home');
  });

  return router;
}

module.exports = routes;
