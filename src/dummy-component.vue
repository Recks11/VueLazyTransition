<template>
  <section class="component animated mb-5" id="inner"
           v-lazytransition="{transition: this.transition, onView: this.changeText}">
    Dummy component: {{ this.text }}
  </section>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'dummy-component',
  props: {
    transition: {
      type: String,
      required: false,
      default: 'side-fade-right'
    }
  },
  data () {
    return {
      text: 'text'
    }
  },
  methods: {
    changeText () {
      setTimeout(() => {
        this.text = this.text + ' updated 2 seconds after it got here'
      }, 2000)
    }
  }
})
</script>
