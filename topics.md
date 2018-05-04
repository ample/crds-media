---
layout: default
permalink: /topics/index.html
---

<div class="container">
  <h2 class="section-header">Topics</h2>
  <div data-card-deck class="card-deck">
    <div class="cards-4x">
      <div class="row">
      {% for topic in site.topics %}
        <div class="card">
          {{ topic.image }}
          <a href="{{ topic.url }}">
            {% for item in site.posts %}
              {% if item.topic == topic.title %}
                {% assign post = item %}
                {% break %}
              {% endif %}
            {% endfor %}
            <img class="card-img-top img-responsive" src="{{ post.image | imgix: site.imgix | append: site.imgix_placeholder_args }}" data-optimize-img>
          </a>
          <div class="card-block">
            <a href="{{ topic.url }}">
              <h4 class="card-title card-title--overlap text-uppercase">{{ topic.title }}</h4>
            </a>
            <h5 class="card-subtitle">{% include _count.html key="topic" subject=topic.title label="article" %}</h5>
          </div>
        </div>
      {% endfor %}
      </div>
    </div>
  </div>
</div>