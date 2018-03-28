---
layout: default
permalink: /topics/index.html
---

<div class="container">
  <h2 class="section-header">Topics</h2>
  <div data-card-deck class="card-deck card-deck--expanded-layout card-deck--wrap">
    {% for topic in site.topics %}
      <div class="card card--layered">
        <a href="/topics/{{ topic.link }}">
         <div class="card-bgImage sixteen-nine bgCenter" style="background-image: url('/images/default_card.jpg');"></div>
          <div class="card-block">
            <h4 class="card-title font-family-condensed-extra text-uppercase">
              {{ topic.name }}
            </h4>
            <h5 class="card-subtitle">{{ topic.posts }} articles</h5>
          </div>
        </a>
      </div>
    {% endfor %}
  </div>
</div>

  