# Vue Lazy Transition Plugin
This is a minimal Vue plugin to enable transitions or animations on scroll using custom animations and transitions defined by you.

## Table of contents

- [Install](#Install)
- [Configuration](#Configuration)
- [Usage](#Usage)
    - [Component Syntax](#Component)
    - [Directive Syntax](#Directive)
        - [`v-lazytransition`](#v-lazytransition)
        - [`v-lazytransition-group`](#v-lazytransition)
        - [`v-lazytransition-root`](#v-lazytransition)
- [Specifying CSS Transitions](#transitions-animations)
- [Callbacks `NEW`](#callbacks)
- [Adding an Observer `NEW`](#add-obs)
- [Global Variable `$lazyObserver`](#global-vars)

## Install
npm
```bash
npm i vue-lazy-transition
```
yarn
```bash
yarn add vue-lazy-transition
```
## Plugin Configuration
To use the plugin, you can choose to use the default configuration,
```js
import Vue from 'vue'
import LazyTransition from 'vue-lazy-transition'

Vue.use(LazyTransition)
```
or configure it manually
```js
import Vue from 'vue'
import LazyTransition from 'vue-lazy-transition'

// with default config
Vue.use(LazyTransition)
//OR
// with manual config
Vue.use(LazyTransition, {
  options: {
    root: null,
    rootMargin: '0px',
    threshold: [0.5, 0.75, 1]
  },
  intersectionRatio: 0.5
})
```
there are 4 items to configure:
- `root` - (optional) - the element used as the viewport to check if elements to be transitioned are in view. if null or empty the default
viewport will be used.
- `rootMargin` - (optional) - margin around the root element
- `threshold` - (optional) - a number or array of numbers between 0 and 1 representing the percentage of the element that must be in the viewport element before the observer triggers a transition
- `intersectionRatio` - minimum threshold percentage for the observer declares an element is in the viewport

## Usage
This Plugin can be used in two ways
- [`Component`](#Component)
- [`Directive`](#Directive)

### <a id="Component"> Component</a>
```vue
<template>
    <lazy-transition :name="'transition-name'">
        <your-component />
    </lazy-transition>
</template>
```
To apply lazy-transition effects using the component syntax, wrap the component you want to apply a transition to with 
the `<lazy-transition></lazy-transition>` 
component. The `name` property is the name of the transition or animation you want to apply to the element.
The animation will be applied when the `<lazy-transition>` component enters the viewport.

For Example:
```vue
<lazy-transition :name="'transition-name'">
    <your-component />
</lazy-transition>
```

## <a id="Directive"></a> Directive
There are two lazy transition directives: 
- `v-lazytransition`
- `v-lazytransition-group`
- `v-lazytransition-root`

### v-lazytransition
When you want to apply a vue transition to a single component or HTMLElement, you simply add the `v-lazytransition` directive
and the name of the transition you created for the element.
```vue
<template>
   <your-component v-lazytransition="'transition-name'"></your-component>
</template>
```
you can use the object syntax to specify more functionality such as callbacks to be executed when the element comes into view,
or if the transition is a vue trasition or a custom class you want to add to the element. or both :) discussed [here](#Using Callbacks)

### v-lazytransition-group
The `v-lazytransition-group` should be used when you want to apply transitions on all children nodes of a parent node.

for example 
```vue
<template>
    <div class="parent" v-lazytransition-group="'custom-transition'">
        <div class="child"> ... </div>
        <div class="child"> ... </div>
        <div class="child"> ... </div>
        <div class="child"> ... </div>
        <div class="child"> ... </div>
    </div>
</template>
```
applying the `v-lazytransition-group` directive here will apply the `custom-transition` to each child of the parent element
will perform the transition when each element enters the viewport.

using directives will bring better support for already made projects, as it doesn't add an extra component

### v-lazytransition-root
the `v-lazytransition-root` is used to change the root of the observer or create an observer with the bound element as the root
. it takes an object containing the name of the observer you wish to create.
if you don\'t specify an object, it replaces the default observer root with itself.

```vue

<template>
    <div id="#app" v-lazytransition-root="{observer: 'foo'}">
        <div class="child"> ... </div>
        <div class="child"> ... </div>
        <div class="child"> ... </div>
        <div class="child"> ... </div>
        <div ref="bar" > ... </div>
        <div class="child" v-lazytransition="{transition: 'bounce-out'}"> ... </div>
    </div>
</template>
```
this will create the observer 'foo' with the div with id #app as the root 
(of course the element has to be scrollable). you can then use that observer with the 
`$lazyObserver.observeWith()` method.

## <a id="transitions-animations"></a>Specifying Transitions/Animations
This package uses the `<transition>` vue component under the hood for the component syntax, and the directive uses 
the same syntax for its transitions. Therefore, to create transitions you should follow the guide provided in 
[the official docs](https://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components).

One main difference with this and the regular `<transition>` component in the docs is it DOES NOT depend on a `v-if`
you do not need a v-if statement to make the element appear then apply the transition (except the component syntax which has its own
show property at the moment). 
the transition will be applied when the element enters the specified viewport provided in the configuration.

Here is an example of a transition named `side-fade-left`:
```css
/*Transitions*/
.side-fade-left-enter-active{
   transition: all 300ms cubic-bezier(.5, .15, .28, .91);
 }

.side-fade-left-leave-active{
   transition: all 300ms cubic-bezier(.15, .5, .6, 1);
 }

.side-fade-left-enter,
.side-fade-left-leave-to {
   transform: translateX(100px);
   opacity: 0;
 }
```
To use this transition, bind the name to the name field of
 the lazytransition component 
```vue
<lazy-transition :name="'side-fade-left'">
    <your-component />
</lazy-transition>
```
or as a directive, provide the name

```vue
<template>
    <div class="main">
        <your-component v-lazytransition="'side-fade-left'"></your-component>
    </div>
</template>
```

##  <a id="callbacks"></a> Using Callbacks
You can observe an element and provide a callback to be executed when it is in view using the global variable or the 
directive syntax

### Directives
the `v-lazytransition` directive also takes an `ObserverBinding` object of the following syntax

```ts
type ObserverBinding = {
  transition?: string;
  isVue?: boolean;
  onView?: (el: BoundElement) => void;
  afterTransition?: (el: BoundElement) => void;
}
```
All fields are optional, you can specify one or the other.
- <strong>transition</strong>: the transition to be applied when the element is in view. if unset, the observer ignores this property and no style change happens.
- <strong>isVue</strong>: if true, then the transition will be treated as a vue transition, if false, it will add the transition string as a css class to the element when the element is in view. if unset, it defaults to true, then the transition will be treated as a vue transition.
- <strong>onView</strong>: the callback to be executed when an element comes into view
- <strong>afterTransition</strong>: the callback to be executed after the transition completes

### Global Variable
the global variable can also be used with the `ObserverBinding`

```ts
export default Vue.extend({
  mounted () {
    const element = this.$refs.bar
    this.$lazyObserver.startObserving( element, {
      transition: 'side-fade',
      onView: (el: BoundElement) => {
        // do something
      },
      afterTransition: (el) => el.classList.append('bounce-out')
    })  
  }
})
```

Example
```vue
// this calls the setStatus method when <your-component/> enters the observer root
<template>
    <div class="main">
        <your-component v-lazytransition="{transition: 'side-fade-left', onView: this.setStatus}" />
    </div>
</template>
```

## <a id="add-obs"></a> Adding an Observer
An observer can be added using the  `$lazyObserver.createObserver()` method. this takes three parameters
- `name`: The name/identifier of the observer
- `root`: the root element for the observer
- `callback`: the callback to be executed when an element observed by this observer intersects with the root element.

## <a id="global-vars"></a>The Global Variable
the `$lazyObserver` instance variable gives access to the internal observer instance. you can use this to manually 
observe elements via `refs` or to manually dispose the observer.

when using the global variable, you can specify a callback to be executed when an element is in view or after a transition is finished.
The global variable provides some useful methods as shown below

```ts
export declare class $lazyObserver {
  get observer (): IntersectionObserver

  get observerKey (): string

  createObserver (name: string, root?: BoundElement): void

  changeObserver (name: string, root?: BoundElement): void

  startObserving (el: BoundElement, binding: ObserverBinding): void

  observeWith (observer: string, el: BoundElement, binding: ObserverBinding): void

  stopObserving (el: BoundElement): void

  disposeObserver (): void
  
  killAll(): void
}
```

##  <a id="dev"></a> SETTING UP FOR DEVELOPMENT

clone the repository and run the dev server
```zsh
git clone https://github.com/Recks11/VueLazyTransition.git LazyTransitions
cd LazyTransitions
npm install
npm run serve
```

## License
MIT license
