const express = require("express");
const router = express.Router();
const fetchUtil = require("./FetchUtil");

// current page number
const page = {
  pageNum: 0,
};
// API Url for science news
const scienceNewsUrl = (pageNum) => {
  return (
    "https://api.nytimes.com/svc/" +
    'search/v2/articlesearch.json?fq=section_name:("Science")' +
    "&page=" +
    pageNum +
    "&sort=newest&api-key=" +
    fetchUtil.apiKey
  );
};
// fetch URL and convert to json object to render html page
const renderPage = async (req, res) => {
  const pgNum = page.pageNum;
  const jsonNewsData = await fetchUtil.fetchApi(scienceNewsUrl(pgNum));
  let scienceNews = null;
  if (jsonNewsData.response) {
    scienceNews = jsonNewsData.response.docs;
  }
  res.render("ScienceNews", { scienceNews, pgNum });
};

// set up science news http get
router.get("/science", async (req, res) => {
  renderPage(req, res);
});

// next page post route
router.post("/scienceNext", (req, res) => {
  page.pageNum += 1;
  renderPage(req, res);
});

// prev page post route
router.post("/sciencePrev", (req, res) => {
  if (page.pageNum > 0) {
    page.pageNum -= 1;
  }
  renderPage(req, res);
});

module.exports = router;
