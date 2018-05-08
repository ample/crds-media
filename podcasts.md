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
          <div class="card">
            <a href="{{ podcast.url }}">
              <img class="card-img-unrestrained" src="{{ podcast.image | imgix: site.imgix | append: site.imgix_placeholder_args }}" data-optimize-img>
            </a>
            <div class="card-block hard-bottom">
              <a href="{{ podcast.url }}">
                <h4 class="card-title card-title--overlap text-uppercase">{{ podcast.title }}</h4>
              </a>
              <p>{{ podcast.content | strip_html | truncatewords: 25 }}</p>
            </div>
          </div>
        {% endfor %}
        </div>
      </div>
    </div>
  </div>