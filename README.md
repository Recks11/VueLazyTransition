# Vue Lazy Transition Plugin
This is a minimal Vue plugin to enable transitions or animations on scroll using custom animations and transitions defined by you.

## Install
```bash
npm i vue-lazy-transition
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

### <a id="Directive"></a> Directive
There are two lazy transition directives: 
- `v-lazytransition`
- `v-lazytransition-group`

When you want to apply a vue transition to a single component or HTMLElement, you simply add the `v-lazytransition` directive
and the name of the transition you created for the element.
```vue
<template>
   <your-component v-lazytransition="'transition-name'"></your-component>
</template>
```

The `v-lazytransition-group` should be used when you want to apply transitions on all children nodes of a parent node.

for example 
```vue
<template>
    <div class="parent" v-lazytransition-group="'transition-name'">
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

## Specifying Transitions/Animations
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

### CUSTOMISING BEHAVIOR WITH GLOBAL VARIABLE
the `$lazyObserver` instance variable gives access to the internal observer instance. you can use this to manually 
observe elements via `refs` or to manually dispose the observer.

### TODO
- add leave transitions
- Finish Customising Behavior Plugin
## License
MIT license
