const express = require("express");
const router = express.Router();
const fetchUtil = require("./FetchUtil");

// current page number
const page = {
  pageNum: 0,
};

// API Url for health news
const healthNewsUrl = (pageNum) => {
  return (
    "https://api.nytimes.com/svc/" +
    'search/v2/articlesearch.json?fq=section_name:("Health")' +
    "&page=" +
    pageNum +
    "&sort=newest&api-key=" +
    fetchUtil.apiKey
  );
};
// fetch URL and convert to json object to render html page
async function renderPage(req, res) {
  const pgNum = page.pageNum;
  const jsonNewsData = await fetchUtil.fetchApi(healthNewsUrl(pgNum));
  let healthNews = null;
  if (jsonNewsData.response) {
    healthNews = jsonNewsData.response.docs;
  }
  res.render("HealthNews", { healthNews, pgNum });
}

// set up health http get
router.get("/health", (req, res) => {
  renderPage(req, res);
});

// next page post route
router.post("/healthNext", (req, res) => {
  page.pageNum += 1;
  renderPage(req, res);
});

// prev page post route
router.post("/healthPrev", (req, res) => {
  if (page.pageNum > 0) {
    page.pageNum -= 1;
  }
  renderPage(req, res);
});

module.exports = router;
