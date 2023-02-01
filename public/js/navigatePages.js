// find prev and next page buttons
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

// After clicking the next button generate
// a url of the page. Then aLL query strings and '?' are removed
// from the url to prevent routing errors. Once
// url is created fetch the post url for the next page
nextBtn.addEventListener("click", () => {
  let url;
  if(document.URL.includes('?')){
    url = document.URL.substring(0, document.URL.indexOf('?'))
  }
  else{
    url = document.URL;
  }
  fetch(url+'Next', {
    method: "POST",
  }).catch((error) => {
    console.log(error);
  })
  .then( () => {
    window.location.href = document.URL;
  })
});

// explanation same for previous button above
prevBtn.addEventListener("click", () => {
  let url;
  if(document.URL.includes('?')){
    url = document.URL.substring(0, document.URL.indexOf('?'))
  }
  else{
    url = document.URL;
  }
  fetch(url+'Prev', {
    method: "POST",
  }).catch((error) => {
    console.log(error);
  })
  .then( () => {
    window.location.href = document.URL;
  })
})
