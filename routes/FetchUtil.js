const express = require("express");
// hide NEWS_API_KEY
require("dotenv").config();
const apiKey = process.env.API_KEY;
// fetch News API given the url and returns a json
const fetchApi = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { apiKey, fetchApi };
