const express = require("express");
const router = express.Router();
const fetchUtil = require("./FetchUtil");

// current page number
const page = {
  pageNum: 0,
};

let search_field;

// generate api url based on search field and the page number
const generateUrl = (keyword, pageNum) => {
  return (
    "https://api.nytimes.com/svc/search/v2" +
    "/articlesearch.json?fq=headline:" +
    keyword +
    "&sort=newest" +
    "&page=" +
    pageNum +
    "&api-key=" +
    fetchUtil.apiKey
  );
};

// fetch URL and convert to json object to render html page
const renderPage = async (req, res) => {
  const pgNum = page.pageNum;
  const searchResultUrl = generateUrl(search_field, pgNum);
  const jsonSearchData = await fetchUtil.fetchApi(searchResultUrl);
  let filteredNews = null;
  if (jsonSearchData.response) {
    filteredNews = jsonSearchData.response.docs;
  }
  res.render("SearchResults", { filteredNews, search_field, pgNum });
};

// set up sports http get
router.get("/searchResults", (req, res) => {
  if(search_field !== req.query.search_field){
    page.pageNum = 0;
  }
  search_field = req.query.search_field;
  renderPage(req, res);
});

// next page post route
router.post("/searchResultsNext", (req, res) => {
  page.pageNum += 1;
  renderPage(req, res);
});

// prev page post route
router.post("/searchResultsPrev", (req, res) => {
  if (page.pageNum > 0) {
    page.pageNum -= 1;
  }
  renderPage(req, res);
});

module.exports = router;
