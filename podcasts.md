---
layout: default
title: Podcasts
---

<div class="container media-podcast">
  <p class="breadcrumb flush-bottom hard"><a href="/">Media</a> /</p>
    <h2 class="section-header landing-header flush-top">Podcasts</h2>
    <div data-card-deck class="card-deck">
      <div class="cards-2x">
        <div class="row">
        {% for podcast in site.podcasts %}
          {% include _podcast-card.html %}
        {% endfor %}
        </div>
      </div>
    </div>
  </div>