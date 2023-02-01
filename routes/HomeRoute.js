const express = require("express");
const fetchUtil = require("./FetchUtil");
const router = express.Router();

// current page number
const page = {
  pageNum: 0,
};
// API Url for top stories
const topNewsUrl = (pageNum) => {
  return (
    "https://api.nytimes.com/svc/" +
    'search/v2/articlesearch.json?fq=section_name:("U.S.")' +
    "&page=" +
    pageNum +
    "&sort=newest&api-key=" +
    fetchUtil.apiKey
  );
};

// fetch URL and convert to json object to render html page
const renderPage = async (req, res) => {
  const pgNum = page.pageNum;
  const jsonNewsData = await fetchUtil.fetchApi(topNewsUrl(pgNum));
  const popularStories = jsonNewsData.response.docs;
  res.render("HomePage", { popularStories, pgNum });
};

// set up home http get
router.get("/", (req, res) => {
  renderPage(req, res);
});
// next page post route
router.post("/Next", (req, res) => {
  page.pageNum += 1;
  renderPage(req, res);
});
// prev page post route
router.post("/Prev", (req, res) => {
  if (page.pageNum > 0) {
    page.pageNum -= 1;
  }
  renderPage(req, res);
});

module.exports = router;
