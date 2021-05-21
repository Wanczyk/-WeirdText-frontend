<template>
  <b-container>
    <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Text"
      rows="6"
      class="mt-1"
    ></b-form-textarea>
    <b-form-input class="mt-1" v-model="original_words" placeholder="Original words"></b-form-input>
    <div>
      <b-button class="m-1" :disabled="isDisabled" variant="primary" v-on:click="encode">Encode</b-button>
      <b-button class="m-1" :disabled="!isDisabled" variant="primary" v-on:click="decode">Decode</b-button>
    </div>
  </b-container>
</template>

<script>

import axios from 'axios';

export default {
  name: 'App',
  data() {
      return {
        original_words: '',
        text: '',
        baseURI: 'https://weirdtext-backend.herokuapp.com',
      }
    },
  computed: {
      isDisabled() {
        return this.original_words.length > 0
      },
    },
  methods: {
      encode: function () {
        const request = { text: this.text };
        axios.post(this.baseURI + "/v1/encode", request)
          .then(response => {
            this.text = response.data.encoded_text;
            this.original_words = response.data.original_words.join(', ');
          }
        );
      },
      decode: function () {
        const request = { 
          text: this.text, 
          original_words: this.original_words.split(', ')
          };
        axios.post(this.baseURI + "/v1/decode", request)
          .then(response => {
            this.text = response.data.decoded_text;
            this.original_words = "";
          }
        );
      },
    },
}
</script>

<style>
#textarea {
  top: 50px;
}
</style>
