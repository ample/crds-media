---
layout: default
title: Authors
---

<div class="container">
  <h2 class="section-header">Authors</h2>
  <div data-card-deck class="card-deck">
    <div class="cards-4x">
      <div class="row">
      {% for author in site.authors %}
        <div class="card">
          <a href="{{ author.url }}">
            <img class="card-img-top img-responsive" src="{{ author.image | imgix: site.imgix | append: site.imgix_placeholder_args }}">
          </a>
          <div class="card-block">
            <a href="{{ author.url }}">
              <h4 class="card-title card-title--overlap text-uppercase">{{ author.name }}</h4>
            </a>
            <h5 class="card-subtitle">{% include _count.html key="author" subject=author.name label="article" %}</h5>
          </div>
        </div>
      {% endfor %}
      </div>
    </div>
  </div>
</div>