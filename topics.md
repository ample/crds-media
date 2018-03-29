---
layout: default
permalink: /topics/index.html
---

<div class="container">
  <h2 class="section-header">Topics</h2>
  <div data-card-deck class="card-deck card-deck--expanded-layout card-deck--wrap">
    {% for topic in site.blogs %}
      <div class="card card--layered">
        <a href="{{ topic.url }}">
          <div class="card-bgImage sixteen-nine bgCenter" style="background-image: url('{{ topic.image }}');"></div>
          <div class="card-block">
            <h4 class="card-title font-family-condensed-extra text-uppercase">
              {{ topic.title }}
            </h4>
            <h5 class="card-subtitle">{% include _count.html key="blog" subject=topic.title label="article" %}</h5>
          </div>
        </a>
      </div>
    {% endfor %}
  </div>
</div>

