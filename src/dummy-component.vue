<template>
  <section class="animated mb-5" id="inner"
           v-lazytransition="{transition: this.transition, onView: this.changeText}">
    Dummy component: <slot/>
    <p> {{ this.text }} </p>
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
      text: 'Data property in dummy component'
    }
  },
  methods: {
    changeText () {
      setTimeout(() => {
        this.text = this.text + ' that changed 2 seconds after it got here'
      }, 2000)
    }
  }
})
</script>
