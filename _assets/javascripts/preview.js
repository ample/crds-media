var Marked = marked;
Marked.setOptions({
  sanitize: false,
  smartLists: true,
  smartypants: false
});

var title = document.querySelector('[data-title]');
var authorNames = document.querySelectorAll('[data-author-name]');
var authorLinks = document.querySelectorAll('[data-author-link]');
var authorBio = document.querySelector('[data-author-bio]');
var authorImg = document.querySelector('[data-author-img]');
var postDate = document.querySelector('[data-post-date]');
var postBody = document.querySelector('[data-body]');
var tagContainer = document.querySelector('[data-tags]');
var heroContainer = document.querySelector('[data-hero-image]');
var heroCaption = document.querySelector('[data-hero-caption]');

function createTags(arr) {
  for (var i = 0; i < arr.length; i+= 1) {
    var elm = document.createElement('a');
    elm.classList.add('article_tag');
    elm.innerText = arr[i];
    tagContainer.appendChild(elm);
  }
}

function setHeroImage(src) {
  heroContainer.style = `background-image: url('${src}');`;
}

function parseBodyMarkdown(obj) {
  var parsed = Marked(obj);
  postBody.innerHTML = parsed;
}

function setAuthorInfo(name, slug, bio, img) {
  for (var i = 0; i < authorNames.length; i += 1) {
    authorNames[i].innerText = name;
  }

  for (var k = 0; k < authorLinks.length; k += 1) {
    authorLinks[k].href = `/authors/${slug}`;
  }

  authorBio.innerText = bio;
  getAsset(img).then(function(res) {
    authorImg.style = `background-image: url('${res.fields.file.url}')`;
  });
}

function setText(obj) {
  title.innerText = obj.title;
  postDate.innerText = obj.published_at;
}

function renderPage(data) {
  parseBodyMarkdown(data.body);
  setText(data);
  createTags(data.tags);
  
  // image
  getAsset(data.image.sys.id).then(function(res) {
    setHeroImage(res.fields.file.url);
  }).catch(function(err) {
    console.log(`error: ${err}`);
  });

  // author
  getSingleEntry(data.author.sys.id).then(function(res) {
    setAuthorInfo(res.fields.full_name, res.fields.slug, res.fields.summary, res.fields.image.sys.id);
  }).catch(function(err) {
    console.log(err);
  });
}

function getAsset(id) {
  return new Promise(function(resolve, reject) {
    var assetUrl = `https://preview.contentful.com/spaces/y3a9myzsdjan/assets/${id}?access_token=31349caf7c9b1e390583a84a741a754d976984c27c2c70d831050b9804e80edf`;
    resolve(makeRequest(assetUrl));
  })
}

function makeRequest(url) {
  return new Promise(function(resolve, reject)  {
    var xhr = new XMLHttpRequest();
    xhr.open( 'GET', url );
    xhr.send();
    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.response);
        resolve(data);
      } else {
        reject('data not received');
      }
    }
  });
};

function getUrlParameter() {
  var sPageURL = decodeURIComponent(window.location.search),
  sParameterName = sPageURL.split('=');
  return sParameterName[1];
}

// make a request to Contentful for preview content
function getSingleEntry(id) {
  return new Promise(function(resolve, reject) {
    var postId;
    id === undefined ? postId  = getUrlParameter() : postId = id;
    if (postId !== '') {
      var url = 'https://preview.contentful.com/spaces/y3a9myzsdjan/entries/' + postId + '?access_token=31349caf7c9b1e390583a84a741a754d976984c27c2c70d831050b9804e80edf';
      makeRequest(url).then(function(res) {
        resolve(res);
      })
    }  
  })
}

getSingleEntry().then(function(res) {
  renderPage(res.fields);
});
