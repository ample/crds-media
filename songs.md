---
layout: default
title: Songs
---

<div class="container">
  <p class="breadcrumb flush-bottom hard"><a href="{{ site.url }}">Media</a> /</p>
  <h2 class="section-header flush-top">Songs</h2>
  <div data-card-deck class="card-deck">
    <div class="cards-4x">
      <div class="row">
      {% for song in site.songs %}
        <div class="card">
          <a href="{{ song.url }}">
            <img class="card-img-top img-responsive" src="{{ song.image | imgix: site.imgix }}?{{ site.imgix_params.placeholder_card }}" data-optimize-img>
          </a>
          <div class="card-block">
            <a href="{{ song.url }}">
              <h4 class="card-title card-title--overlap text-uppercase">{{ song.title }}</h4>
            </a>
          </div>
        </div>
      {% endfor %}
      </div>
    </div>
  </div>
</div>
