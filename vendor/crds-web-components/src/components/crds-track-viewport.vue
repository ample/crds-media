<template>
  <span>
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'CrdsTrackViewport',
    props: {
      trackableDuration: {
        type: Number,
        default: 5000
      }
    },
    data: function() {
      return {
        viewableAt: null,
        tracked: false
      }
    },
    mounted: function() {
      window.addEventListener('DOMContentLoaded', this.checkPosition, false);
      window.addEventListener('load', this.checkPosition, false);
      window.addEventListener('scroll', this.checkPosition, false);
      window.addEventListener('resize', this.checkPosition, false);
    },
    methods: {
      checkPosition: function() {
        if (this.tracked) return;

        var rect = this.$el.getBoundingClientRect();
        if (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
          rect.bottom >= 0 &&
          rect.right >= 0
        ) {
          this.beginCount();
        } else {
          this.stopCount();
        }
      },
      beginCount: function() {
        if (!this.viewableAt) this.viewableAt = new Date;
        setTimeout(this.count, this.trackableDuration + 100);
      },
      stopCount: function() {
        if (this.viewableAt) return this.viewableAt = null;
      },
      count: function() {
        if (!this.viewableAt) return;
        var viewableFor = new Date - this.viewableAt;
        if (viewableFor >= this.trackableDuration) this.track();
      },
      track: function() {
        if (this.tracked) return;
        console.log('TRACK');
        this.tracked = true;
      }
    }
  }
</script>
