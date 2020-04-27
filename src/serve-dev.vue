<script lang="ts">
import Vue from 'vue'
import LazyTransition from '@/component/lazy-transition.vue'
import DummyComponent from '@/dummy-component.vue'

export default Vue.extend({
  name: 'ServeDev',
  components: {
    LazyTransition,
    DummyComponent
  }
});
</script>

<template>
  <div id="app">
    <section class=" landing">
      <div class="h-100 bg-red">
        <div class="center w-100 h-100">
          <p> White Blocks use Component </p>
          <p class="bg-spring-green"> Green Blocks uses v-lazytransition Directive </p>
          <p class="bg-dark-blue"> blue Blocks uses v-lazytransition-group directive </p>
        </div>
      </div>
    </section>
    <section class="w-100 h-100">
      <div class="h-100 bg-blue">
        <lazy-transition :name="'side-fade-left'">
          <section class="animated"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, consequatur consequuntur deleniti earum eos explicabo id impedit ipsam iure laborum maiores non nostrum nulla, quia quo saepe sunt temporibus veritatis!</section>
        </lazy-transition>

          <section class="animated bg-spring-green" v-lazytransition="'side-fade-right'">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda beatae deserunt dolor doloribus eos id illo, illum iste molestias, omnis perferendis quasi qui ratione reiciendis repudiandae similique temporibus, veniam.</section>

        <lazy-transition :name="'side-fade-left'">
          <section class="animated">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium atque dolorem inventore iste maxime non provident qui voluptatum. Ad consequatur eligendi eos facilis fugiat illum molestias necessitatibus tempore velit voluptatibus?</section>
        </lazy-transition>

          <section class="animated bg-spring-green" v-lazytransition="'side-fade-right'">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus eligendi expedita ipsa maiores minima molestias, mollitia obcaecati odio perspiciatis praesentium qui rerum, sequi similique unde voluptates. Beatae debitis expedita quam?</section>

        <lazy-transition :name="'side-fade-left'">
          <section class="animated"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur exercitationem inventore iure, molestias nisi odit praesentium quam, recusandae similique sunt veritatis, voluptas. Asperiores dolores maxime minima recusandae reprehenderit sed ullam!</section>
        </lazy-transition>

          <section class="animated bg-spring-green" v-lazytransition="'side-fade-right'"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur exercitationem inventore iure, molestias nisi odit praesentium quam, recusandae similique sunt veritatis, voluptas. Asperiores dolores maxime minima recusandae reprehenderit sed ullam!</section>

        <lazy-transition :name="'side-fade-left'">
          <section class="animated"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur exercitationem inventore iure, molestias nisi odit praesentium quam, recusandae similique sunt veritatis, voluptas. Asperiores dolores maxime minima recusandae reprehenderit sed ullam!</section>
        </lazy-transition>

          <section class="animated bg-spring-green" v-lazytransition="'side-fade-right'"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur exercitationem inventore iure, molestias nisi odit praesentium quam, recusandae similique sunt veritatis, voluptas. Asperiores dolores maxime minima recusandae reprehenderit sed ullam!</section>

        <lazy-transition :name="'side-fade-left'">
          <section class="animated"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur exercitationem inventore iure, molestias nisi odit praesentium quam, recusandae similique sunt veritatis, voluptas. Asperiores dolores maxime minima recusandae reprehenderit sed ullam!</section>
        </lazy-transition>
      </div>
    </section>
    <section class="w-100 h-100">
      <div class="h-100 bg-green" v-lazytransition-group="'side-fade-right'">
        <section id="1" class="animated bg-dark-blue mt-0"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur dicta enim, maxime quam rem ut! Aliquam atque eos ipsum iure nesciunt nihil non perferendis praesentium quidem quisquam, quo repellendus, voluptatibus!</section>
        <section id="2" class="animated bg-dark-blue"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias dignissimos eveniet ex nostrum provident quae rem repellat. Beatae, eos ipsa necessitatibus odio optio placeat quae quidem sunt tempore veniam?</section>
        <section id="3" class="animated bg-dark-blue"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias dignissimos eveniet ex nostrum provident quae rem repellat. Beatae, eos ipsa necessitatibus odio optio placeat quae quidem sunt tempore veniam?</section>
        <section id="4" class="animated bg-dark-blue"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias dignissimos eveniet ex nostrum provident quae rem repellat. Beatae, eos ipsa necessitatibus odio optio placeat quae quidem sunt tempore veniam?</section>
        <dummy-component id="5" class="animated bg-dark-blue"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias dignissimos eveniet ex nostrum provident quae rem repellat. Beatae, eos ipsa necessitatibus odio optio placeat quae quidem sunt tempore veniam?</dummy-component>
        <section id="6" class="animated bg-dark-blue"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias dignissimos eveniet ex nostrum provident quae rem repellat. Beatae, eos ipsa necessitatibus odio optio placeat quae quidem sunt tempore veniam?</section>
        <section id="7" class="animated bg-dark-blue"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias dignissimos eveniet ex nostrum provident quae rem repellat. Beatae, eos ipsa necessitatibus odio optio placeat quae quidem sunt tempore veniam?</section>
        <section id="8" class="animated bg-dark-blue"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias dignissimos eveniet ex nostrum provident quae rem repellat. Beatae, eos ipsa necessitatibus odio optio placeat quae quidem sunt tempore veniam?</section>
        <dummy-component id="9" class="animated bg-dark-blue"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias dignissimos eveniet ex nostrum provident quae rem repellat. Beatae, eos ipsa necessitatibus odio optio placeat quae quidem sunt tempore veniam?</dummy-component>
        <dummy-component id="10" class="animated bg-dark-blue"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias dignissimos eveniet ex nostrum provident quae rem repellat. Beatae, eos ipsa necessitatibus odio optio placeat quae quidem sunt tempore veniam?</dummy-component>
        <section id="11" class="animated bg-dark-blue"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam, blanditiis commodi, distinctio ea eveniet iure minima molestiae non placeat quo tempore, ut. Ad doloremque exercitationem ipsam natus provident repellendus.</section>
      </div>
    </section>
  </div>
</template>
<style>
html, body {
  margin: 0;
  width: 100%;
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

.landing {
  height: 100vh;
}
.animated {
  width: 600px;
  height: calc(80px);
  margin: 40px auto;
  border: 2px solid black;
  padding: 20px;
}
/*Transitions*/
.side-fade-left-enter-active,
.side-fade-right-enter-active {
   transition: all 300ms cubic-bezier(.5, .15, .28, .91);
 }

.side-fade-left-leave-active,
.side-fade-right-leave-active {
   transition: all 300ms cubic-bezier(.15, .5, .6, 1);
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
</style>
