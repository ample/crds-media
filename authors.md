---
layout: default
---

<div class="container">
  <h2 class="section-header">Authors</h2>
  <div data-card-deck class="card-deck card-deck--expanded-layout card-deck--wrap">
    {% for author in site.authors %}
    <div class="card card--layered">
      <a href="{{ author.url }}">
        <img class="card-img-top img-responsive" src="{{ author.image }}">
      </a>
      <div class="card-block">
        <a href="{{ topic.url }}">
          <h4 class="card-title card-title--overlap text-uppercase">{{ author.name }}</h4>
        </a>
        <h5 class="card-subtitle">{% include _count.html key="author" subject=author.name label="article" %}</h5>
      </div>
    </div>
    {% endfor %}
  </div>
</div>
