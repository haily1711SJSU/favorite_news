const express = require("express");
const router = express.Router();
const fetchUtil = require("./FetchUtil");

// current page number
const page = {
  pageNum: 0,
};
// API Url for politics news
const politicsUrl = (pageNum) => {
  return (
    "https://api.nytimes.com/svc/" +
    'search/v2/articlesearch.json?fq=news_desk:("Politics")' +
    "&page=" +
    pageNum +
    "&sort=newest&api-key=" +
    fetchUtil.apiKey
  );
};

// fetch URL and convert to json object to render html page
const renderPage = async (req, res) => {
  const pgNum = page.pageNum;
  const jsonNewsData = await fetchUtil.fetchApi(politicsUrl(pgNum));
  let politicalNews = null;
  if (jsonNewsData.response) {
    politicalNews = jsonNewsData.response.docs;
  }
  res.render("PoliticalNews", { politicalNews, pgNum });
};
// set up politics news http get
router.get("/politics", async (req, res) => {
  renderPage(req, res);
});
// next page post route
router.post("/politicsNext", (req, res) => {
  page.pageNum += 1;
  renderPage(req, res);
});
// prev page post route
router.post("/politicsPrev", (req, res) => {
  if (page.pageNum > 0) {
    page.pageNum -= 1;
  }
  renderPage(req, res);
});

module.exports = router;
