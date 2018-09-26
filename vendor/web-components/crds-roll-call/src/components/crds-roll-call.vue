import * as http from 'http';

<template>
  <div class="crds-roll-call">
    <div class="btn-group-bar">
      <button class="btn btn-lg btn-cyan btn-icon" v-on:click="decreaseTotal()" type="button">
        <svg class="icon icon-1" viewBox="0 0 256 256">
          <use xlink:href="/assets/svgs/icons.svg#minus"></use>
        </svg>
      </button>
      <button class="btn btn-lg btn-cyan btn-icon" v-on:click="increaseTotal()" type="button">
        <svg class="icon icon-1" viewBox="0 0 256 256">
          <use xlink:href="/assets/svgs/icons.svg#plus"></use>
        </svg>
      </button>
    </div>
    <div>
      {{ total }} {{ labelNoun }} {{ labelVerb }} discussing these questions
    </div>
    <div>
      <button class="btn btn-primary" v-on:click="submitData()">Submit group size</button>
    </div>
    <p>
      This information helps us ... do something?
    </p>
  </div>
</template>

<script>
  import * as http from 'http';
  import * as querystring from 'querystring';

  export default {
    name: 'CrdsRollCall',
    data: function() {
      return {
        total: 0,
        labelNoun: 'people',
        labelVerb: 'are'
      }
    },
    methods: {
      decreaseTotal: function() {
        if (this.total > 0) this.total--;
        this.updateLabel();
        return;
      },
      increaseTotal: function() {
        this.total++;
        this.updateLabel();
        return;
      },
      updateLabel: function() {
        if (this.total == 1) {
          this.labelNoun = 'person';
          this.labelVerb = 'is';
        } else {
          this.labelNoun = 'people';
          this.labelVerb = 'are';
        }
      },
      submitData: function() {

        // this.dispatchEvent(new CustomEvent('crds.rollcall.submitForm', { detail: this.location }));

        var postDataObj = {};
        postDataObj[process.env.VUE_APP_FIELD_ID] = this.total;

        var postData = querystring.stringify(postDataObj);

        var options = {
          hostname: process.env.VUE_APP_FORM_DOMAIN,
          port: 443,
          path: process.env.VUE_APP_FORM_PATH,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
          }
        };

        const req = http.request(options, (res) => {
          res.setEncoding('utf8');
        });

        req.on('error', (e) => {
          console.error(`Problem with request: ${e.message}`);
        });

        req.write(postData);
        req.end();
      }
    }
  }
</script>
