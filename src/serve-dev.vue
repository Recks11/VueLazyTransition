<script lang="ts">
import Vue from 'vue'
import LazyTransition from '@/component/LazyTransition.vue'
import DummyComponent from '@/dummy-component.vue'
import FunctionComponent from '@/FunctionComponent.vue'

export default Vue.extend({
  name: 'ServeDev',
  components: {
    LazyTransition,
    DummyComponent,
    FunctionComponent
  },
  mounted (): void {
  }
});
</script>

<template>
  <div>
    <section class="fixed fixed-top text-center"> top</section>
    <main id="container" class="fixed fixed-mid" ref="main" v-lazytransition-root="{observer: 'func'}">
      <section class=" h-100">
        <div class="h-100 bg-red">
          <div class="center w-100 h-100">
            <p> White Blocks use Component </p>
            <p class="bg-spring-green"> Green Blocks uses v-lazytransition Directive </p>
            <p class="bg-dark-blue"> blue Blocks uses v-lazytransition-group directive </p>
          </div>
        </div>
      </section>
      <section class="w-100">
        <div class="h-100 bg-blue">

          <lazy-transition :name="'side-fade-left'">
            <section class="animated"> Regular element in lazy-transition component</section>
          </lazy-transition>
          <lazy-transition :name="'side-fade-left'">
            <section class="animated">Regular element in lazy-transition component</section>
          </lazy-transition>
          <lazy-transition :name="'side-fade-left'">
            <section class="animated">Regular element in lazy-transition component</section>
          </lazy-transition>
          <lazy-transition :name="'side-fade-left'">
            <section class="animated">Regular element in lazy-transition component</section>
          </lazy-transition>

          <section class="animated bg-spring-green" v-lazytransition="'side-fade-right'">Regular element with
            v-lazytransition directive
          </section>
          <section class="animated bg-spring-green" v-lazytransition="'side-fade-right'">Regular element with
            v-lazytransition directive
          </section>
          <section class="animated bg-spring-green" v-lazytransition="'side-fade-right'">Regular element with
            v-lazytransition directive
          </section>
          <section class="animated bg-spring-green" v-lazytransition="'side-fade-right'">Regular element with
            v-lazytransition directive
          </section>

          <lazy-transition :name="'side-fade-left'" v-for="(num, i) in 5" :key="num">
            <section class="animated">v-for loop component {{i + 1}}</section>
          </lazy-transition>

          <div class="animated bg-spring-green" v-for="(num, i) in 5" :key="num+5"
               v-lazytransition="'side-fade-right'"> v-for loop element {{i}}
          </div>

        </div>
      </section>
      <section class="w-100">
        <div class="h-100 bg-green" v-lazytransition-group="'side-fade-right'">
          <section id="1" class="animated bg-dark-blue mt-0"> regular element in transition group
          </section>
          <section id="2" class="animated bg-dark-blue"> regular element in transition group
          </section>
          <section id="3" class="animated bg-dark-blue"> regular element in transition group
          </section>
          <dummy-component id="5" class="animated bg-dark-blue"> Component in transition
            group
          </dummy-component>
          <dummy-component id="9" class="animated bg-dark-blue"> Component in transition
            group
          </dummy-component>
          <section id="11" class="animated bg-dark-blue"> regular element in transition group
          </section>
        </div>
      </section>
      <section class="w-100">
        <function-component></function-component>
      </section>
    </main>
    <section class="fixed fixed-bottom text-center"> BOTTOM</section>
  </div>
</template>
<style>
html, body {
  margin: 0;
  width: 100%;
  overflow-y: hidden;
}

main {
  overflow-y: scroll;
  overflow-x: hidden;
}

#app {
  overflow-y: hidden;
}

.fixed {
  position: fixed;
}

.absolute {
  position: relative;
}

.fixed-top {
  left: 0;
  right: 0;
  top: 0;
  height: 80px;
  background-color: beige;
  border-bottom: 2px solid #1E202F;
}

.fixed-bottom {
  left: 0;
  right: 0;
  bottom: 0;
  height: 80px;
  background-color: beige;
  border-top: 2px solid #1E202F;
}

.fixed-mid {
  top: 80px;
  right: 0;
  left: 0;
  bottom: 80px;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.center p {
  border: 2px solid black;
  padding: 20px 30px;
  width: 600px;
}

.w-100 {
  width: 100%;
}

.h-100 {
  height: 100%;
}

.bg-spring-green {
  background-color: #2ACC9F;
}

.bg-dark-blue {
  background-color: #1E202F;
  color: whitesmoke;
}

.bg-darkslategray {
  background-color: darkslategray;
  color: whitesmoke;
}

.text-center {
  text-align: center;
}

.animated {
  width: 600px;
  height: calc(80px);
  margin: 40px auto;
  border: 2px solid black;
  padding: 20px;
}

@media screen and (max-width: 768px) {
  .animated {
    width: calc(80vw);
    height: 10%;
    margin: 20px auto;
  }

  .center p {
    width: 80vw;
  }
}

/*Transitions*/
.side-fade-left-enter-active,
.side-fade-right-enter-active {
  transition: all 400ms cubic-bezier(.14, 1.0, .38, 1.0);
}

.side-fade-left-leave-active,
.side-fade-right-leave-active {
  transition: all 400ms cubic-bezier(.15, .5, .6, 1);
}

.side-fade-left-enter,
.side-fade-left-leave-to {
  transform: translateX(100px);
  opacity: 0;
}

.side-fade-right-enter,
.side-fade-right-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}

@media only screen and (max-width: 768px) {
  .side-fade-left-enter,
  .side-fade-left-leave-to {
    transform: translateX(20px);
  }

  .side-fade-right-enter,
  .side-fade-right-leave-to {
    transform: translateX(-20px);
  }
}
</style>
