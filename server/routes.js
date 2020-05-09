const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const router = express.Router();

const generateCustomToken = (idToken) => {
  const decodedToken = jwt_decode(idToken);
  const {
    iss,
    azp,
    aud,
    email_verified,
    at_hash,
    picture,
    ...rest
  } = decodedToken;

  const { email } = rest;
  const scopes = [];
  if (email === 'conner.mckenna94@gmail.com') {
    scopes.push('ROLE_ADMIN');
  }

  const customToken = jwt.sign({
    scopes,
    ...rest
  }, process.env.SIGNING_SECRET);

  return customToken;
}

const routes = function () {

  router.get('/', (req, res) => {
    res.render('home');
  });

  router.get('/token', (req, res) => {
    const { query: { code } } = req;
    const redirectUri = process.env.REDIRECT_URI_TOKEN;
    const grantType = 'authorization_code';
    const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&redirect_uri=${redirectUri}&grant_type=${grantType}`;
    axios.post(url).then(response => {
      const { data: { id_token: idToken } } = response;
      const customToken = generateCustomToken(idToken);
      res.cookie('accessToken', customToken);
      res.redirect(302, '/');
    });
  });

  router.get('/*', (req, res) => {
    res.render('home');
  });

  return router;
}

module.exports = routes;
