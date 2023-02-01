const express = require("express");
const router = express.Router();
const fetchUtil = require("./FetchUtil");

// current page number
const page = {
  pageNum: 0,
};

// API Url for sport news
const sportNewsUrl = (pageNum) => {
  return (
    "https://api.nytimes.com/svc/" +
    'search/v2/articlesearch.json?fq=section_name:("Sports")' +
    "&page=" +
    pageNum +
    "&sort=newest&api-key=" +
    fetchUtil.apiKey
  );
};

// fetch URL and convert to json object to render html page
const renderPage = async (req, res) => {
  const pgNum = page.pageNum;
  const jsonNewsData = await fetchUtil.fetchApi(sportNewsUrl(pgNum));
  const sportNews = jsonNewsData.response.docs;
  res.render("SportNews", { sportNews, pgNum });
};

// set up sports http get
router.get("/sports", async (req, res) => {
  renderPage(req, res);
});

// next page post route
router.post("/sportsNext", (req, res) => {
  page.pageNum += 1;
  renderPage(req, res);
});

// prev page post route
router.post("/sportsPrev", (req, res) => {
  if (page.pageNum > 0) {
    page.pageNum -= 1;
  }
  renderPage(req, res);
});

module.exports = router;
