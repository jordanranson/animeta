<template>
  <transition-group
    :css="false"
    :tag="tag"
    @enter="enter"
    @before-enter="beforeEnter"
    @leave="leave"
    @before-leave="beforeLeave"
  >
    <slot />
  </transition-group>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'AnimetaTransitionGroup',

  props: {
    tag: {
      type: String,
      default: 'div'
    },

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

  computed: {
    toDelay () {
      return this.to.delay || this.options.delay || 0
    },

    fromDelay () {
      return this.from.delay || this.options.delay || 0
    }
  },

  methods: {
    beforeEnter (el) {
      anime.remove(el)
    },

    enter (el, done) {
      const delay = el.dataset.index * this.toDelay

      anime({
        ...this.options,
        ...this.from,
        targets: el,
        duration: 0,
        elasticity: 0
      }).finished.then(() => {
        anime({
          ...this.options,
          ...this.to,
          delay,
          targets: el
        }).finished.then(done)
      })
    },

    beforeLeave (el) {
      anime.remove(el)
    },

    leave (el, done) {
      const delay = el.dataset.index * this.fromDelay

      anime({
        ...this.options,
        ...this.from,
        delay,
        targets: el
      }).finished.then(done)
    }
  }
}
</script>
