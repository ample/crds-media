---
layout: post
draft: true
title: Preview
image: "/assets/svgs/preview-placeholder.svg"
author: Brian Tome
topic: Preview
date: 2018-04-13T00:00-04:00
slug: its-a-preview
tags:
- Preview
---

<style>
@keyframes rotateInitLoadingSpinner {
  100% {
    transform:rotate(360deg);
  }
}
.preloader {
  position: fixed;
  display: block;
  top: calc(20% - 37.5px);
  left: calc(50% - 37.5px);
  width: 75px;
  height: 75px;
  margin: 0 auto;
  background: transparent;
  animation: rotateInitLoadingSpinner 700ms linear infinite;
}
.preloader-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: #ffffff;
  opacity: 1;
  z-index: 1;
}
</style>

<div class="preloader-wrapper" data-preview-preloader>
  <svg viewBox="0 0 102 101" class="preloader">
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(1 1)" stroke-width="2">
        <ellipse stroke="#eee" cx="50" cy="49.421" rx="50" ry="49.421"></ellipse>
        <path d="M50 98.842c27.614 0 50-22.127 50-49.42C100 22.125 77.614 0 50 0" stroke-opacity=".631" stroke="#3B6E8F"></path>
      </g>
    </g>
  </svg>
</div>
