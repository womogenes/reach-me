module.exports = (app) => {
  const express = require('express');
  const path = require('path');
  const cors = require('cors');

  app.use(express.json());
  app.use(express.static("/js"));
  app.use(express.static("/css"));
  app.use(cors());

  app.use(express.static(path.join(__dirname, '/../client')));
}