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
  }
});
</script>

<template>
  <div>
    <section class="fixed fixed-top text-center"></section>
    <main id="container" class="fixed-mid" v-lazytransition-root>

      <section class="landing h-100">
        <div class="center w-100 h-100">
          <p> White use Component Syntax</p>
          <p class="bg-spring-green"> Green use v-lazytransition Directive </p>
          <p class="bg-dark-blue"> Blue use v-lazytransition-group Directive </p>
        </div>
      </section>
      <section class="w-100">
        <div class="bg-blue">

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
          <lazy-transition :name="'side-fade-left'">
            <section class="animated">Regular element in lazy-transition component</section>
          </lazy-transition>

          <br/>

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
          <section class="animated bg-spring-green" v-lazytransition="'side-fade-right'">Regular element with
            v-lazytransition directive
          </section>
          <br/>
          <lazy-transition :name="'side-fade-left'" v-for="(num, i) in 5" :key="num">
            <section class="animated">v-for loop component {{i + 1}}</section>
          </lazy-transition>
          <br/>
          <div class="animated bg-spring-green" v-for="(num, i) in 5" :key="num+5"
               v-lazytransition="'side-fade-right'"> v-for loop element {{i}}
          </div>
        </div>
      </section>

      <br/>

      <section class="w-100">
        <div class="bg-green" v-lazytransition-group="'side-fade-right'">
          <section id="1" class="animated bg-dark-blue mt-0"> Regular element in transition group
          </section>
          <section id="2" class="animated bg-dark-blue"> Regular element in transition group
          </section>
          <section id="3" class="animated bg-dark-blue"> Regular element in transition group
          </section>
          <dummy-component id="4" class="animated bg-dark-blue"/>
          <dummy-component id="5" class="animated bg-dark-blue"/>
        </div>
      </section>

      <br/>

      <section class="last w-100">
        <function-component></function-component>
      </section>
    </main>
    <section class="fixed fixed-bottom text-center"></section>
  </div>
</template>
<style>
html, body {
  margin: 0;
  width: 100%;
  overflow: hidden;
}

main {
  overflow-y: scroll;
  overflow-x: hidden;
}

main::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #1E202F;
}

main::-webkit-scrollbar {
  width: 8px;
}

main::-webkit-scrollbar-thumb {
  background-color: #2ACC9F;
}

main::-webkit-scrollbar-track-piece {
  position: fixed;
}

.fixed {
  position: fixed;
}

.fixed-top {
  left: 0;
  right: 0;
  top: 0;
  height: 50px;
  background-color: #1E202F;
}

.fixed-bottom {
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  background-color: #1E202F;
}

.fixed-mid {
  position: fixed;
  top: 50px;
  right: 0;
  left: 0;
  bottom: 50px;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.component {
  border-color: gold !important;
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
  background-color: #2acca6;
}

.bg-dark-blue {
  background-color: #1E202F;
  color: whitesmoke;
}

.bg-darkslategray {
  background-color: #33fdc5;
  color: #1E202F;
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
.side-fade-left-leave {
  transform: translateX(100px);
  opacity: 0;
}

.side-fade-right-enter,
.side-fade-right-leave {
  transform: translateX(-100px);
  opacity: 0;
}

.scale-up-down {
  animation: scale-up-down 300ms ease-in;
}

/*animation*/
@keyframes scale-up-down {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@media only screen and (max-width: 768px) {
  .side-fade-left-enter,
  .side-fade-left-leave-to {
    transform: translateX(75px);
  }

  .side-fade-right-enter,
  .side-fade-right-leave-to {
    transform: translateX(-75px);
  }
}
</style>
