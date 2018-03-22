---
layout: default
permalink: /authors/index.html
---

<div class="container">
  <h2 class="section-header">Authors</h2>
  <div data-card-deck class="card-deck card-deck--expanded-layout card-deck--wrap">
    {% for author in site.authors %}
    <div class="card">
        <a href="/authors/{{ author.link }}">
          <div class="card-bgImage sixteen-nine" style="background-image: url('{{ author.image }}');"></div>
          <div class="card-block">
            <h4 class="card-title">{{ author.name }}</h4>
            <h5 class="card-subtitle">{{ author.post_amount }} articles</h5>
          </div>
        </a>
      </div>
    {% endfor %}
  </div>
</div>
