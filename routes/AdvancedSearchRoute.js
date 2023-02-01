const express = require("express");
const router = express.Router();
const fetchUtil = require("./FetchUtil");

// generate api url based on sec_name, start_date,
// end_date, sort from oldest or newest, and page number
// These parameters are taken from an advanced search form
const uniqueUrl = (sec_name, start_date, end_date, sort_by, page) => {
  return (
    "https://api.nytimes.com/svc/search/v2" +
    "/articlesearch.json?fq=section_name:" +
    sec_name +
    "&begin_date=" +
    start_date +
    "&end_date=" +
    end_date +
    "&sort=" +
    sort_by +
    "&page=" +
    page +
    "&api-key=" +
    fetchUtil.apiKey
  );
};

// current page number
const page = {
  pageNum: 0,
};

// save search parameters
let saveReqQuery = {
  body: "",
};

// fetch URL and convert to json object to render html page
const renderPage = async (req, res) => {
  const pgNum = page.pageNum;
  const url = uniqueUrl(
    req.sections,
    req.start_date.replaceAll("-", ""),
    req.end_date.replaceAll("-", ""),
    req.sort.toLowerCase(),
    pgNum
  );
  const searchData = await fetchUtil.fetchApi(url);
  let advancedSearchResults = null;
  if (searchData.response) {
    advancedSearchResults = await searchData.response.docs;
  }
  res.render("AdvancedSearch", { advancedSearchResults, pgNum });
};

// get route for an advanced search
router.get("/advancedSearch", (req, res) => {
  if(saveReqQuery.body.sections !== req.query.sections){
    page.pageNum = 0;
  }
  saveReqQuery.body = req.query;
  renderPage(saveReqQuery.body, res);
});

// next page post route
router.post("/advancedSearchNext", async (req, res) => {
  page.pageNum += 1;
  renderPage(saveReqQuery.body, res);
});

// prev page post route
router.post("/advancedSearchPrev", async (req, res) => {
  if (page.pageNum > 0) {
    page.pageNum -= 1;
  }
  renderPage(saveReqQuery.body, res);
});

module.exports = router;
