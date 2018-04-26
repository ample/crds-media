

// dom stuff
var title = document.querySelector('[data-title]');
var authorLink = document.querySelector('[data-author-link]');
var postDate = document.querySelector('[data-post-date]');
var postBody = document.querySelector('[data-body]');
var tagContainer = document.querySelector('[data-tags]');

function getUrlParameter() {
  var sPageURL = decodeURIComponent(window.location.search),
  sParameterName = sPageURL.split('=');
  return sParameterName[1];
}

function createTags(arr) {
  for (var i = 0; i < arr.length; i+= 1) {
    var elm = document.createElement('a');
    elm.classList.add('article_tag');
    elm.innerText = arr[i];
    tagContainer.appendChild(elm);
  }
}

function setImageSrc(obj) {

}

function parseBody(obj) {
  var parsed = markdown.toHTML(obj);
  postBody.innerHTML = parsed;
}

function setText(obj) {
  title.innerText = obj.title;
  postDate.innerText = obj.published_at;
  authorLink.innerText = obj.author.sys.id;
  
}

function renderPage(data) {
  parseBody(data.body);
  setText(data);
  createTags(data.tags);
}

function reqListener () {
  var res = JSON.parse(this.response);
  let data = [];
  console.log(res)
  for (let i = 0; i < res.items.length; i += 1) {
    var postId = getUrlParameter();
    if (res.items[i].sys.id == postId) {
      data.push(res.items[i].fields);
    }
  }
  console.log(data[0]);
  renderPage(data[0]);
}

// make a request to Contentful for preview content
function fetchData(url) {
  var newXHR = new XMLHttpRequest();
  newXHR.open( 'GET', url );
  newXHR.send();
  newXHR.addEventListener( 'load', reqListener );
}

fetchData('https://preview.contentful.com/spaces/y3a9myzsdjan/environments/master/entries?access_token=31349caf7c9b1e390583a84a741a754d976984c27c2c70d831050b9804e80edf');
