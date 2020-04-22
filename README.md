# Vue Lazy Animation Plugin

This library currently depends on [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) 

## License
MIT license
## Install
```bash
npm i -s soon lol
```
## Configuration
The configuration takes two objects
...

## Usage
This Plugin can be used in two ways
- [`Component`](#Component)
- [`Directive`](#Directive)

### <a id="Component"></a> Component
```vue
<template>
    <lazy-animation :name="'transition-name'">
        <your-component />
    </lazy-animation>
</template>
```
Wrap the component you want to apply a transition to with the `<lazy-animation></lazy-animatinon>` 
component. The `name` property is the name of the transition or animation you want to apply to the element.
The animation will be applied when the `<lazy-animation>` component enters the viewport.

### <a id="Directive"></a> Directives
```vue
   <your-component v-lazy-animate.name="'transition'"></your-component>
```
using a directive will bring better support for already made projects, and minimise css rewriting
coming soon...

## Specifying Transitions/Animations
This component uses the `<transition>` vue component under the hood. it works the same way. the name property of the 
compnent is bound the name property of the `<transition>` component