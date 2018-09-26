<template>
  <div id="app">
    <crds-roll-call></crds-roll-call>
  </div>
</template>

<script>
import CrdsRollCall from './components/crds-roll-call.vue'

export default {
  name: 'app',
  components: {
    CrdsRollCall
  }
}
</script>

<style>
  @import 'https://d1tmclqz61gqwd.cloudfront.net/styles/crds-styles-3.0.5.min.css';
</style>
