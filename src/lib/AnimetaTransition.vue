<template>
  <transition
    @enter="enter"
    @before-enter="beforeEnter"
    @leave="leave"
    @before-leave="beforeLeave"
  >
    <slot />
  </transition>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'AnimetaTransition',

  props: {
    to: {
      type: Object,
      default () {
        return {
          opacity: 1
        }
      }
    },

    from: {
      type: Object,
      default () {
        return {
          opacity: 0
        }
      }
    },

    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  methods: {
    beforeEnter (el) {
      anime.remove(el)
    },

    enter (el, done) {
      anime({
        ...this.options,
        ...this.from,
        delay: 0,
        targets: el,
        duration: 0,
        elasticity: 0
      }).finished.then(() => {
        anime({
          ...this.options,
          ...this.to,
          targets: el
        }).finished.then(done)
      })
    },

    beforeLeave (el) {
      anime.remove(el)
    },

    leave (el, done) {
      anime({
        ...this.options,
        ...this.from,
        targets: el
      }).finished.then(done)
    }
  }
}
</script>
