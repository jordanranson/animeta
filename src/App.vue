<template>
  <div id="app">
    <div>
      <animeta-transition
        :to="{ opacity: 1, scale: 1, rotate: '1turn'  }"
        :from="{ opacity: 0, scale: 0.5, elasticity: 0 }"
        :options="{ duration: 500 }"
      >
        <div class="box" v-if="!hidden"></div>
      </animeta-transition>
      <br />
      <button @click="hidden = !hidden">Hide/Show</button>
    </div>
    <div>
      <input v-model="query">
      <animeta-transition-group
        tag="ul"
        :to="{ opacity: 1, height: 18 }"
        :from="{ opacity: 0, height: 0 }"
        :options="{ duration: 500, delay: 150, elasticity: 0, easing: 'linear' }"
      >
        <li
          v-for="(item, index) in computedList"
          v-bind:key="item.msg"
          v-bind:data-index="index"
        >
          {{ item.msg }}
        </li>
      </animeta-transition-group>
    </div>
  </div>
</template>

<script>
import { AnimetaTransition, AnimetaTransitionGroup } from '@/lib/animeta.js'

export default {
  name: 'App',

  data () {
    return {
      query: '',
      hidden: false,
      list: [
        { msg: 'Bruce Lee' },
        { msg: 'Jackie Chan' },
        { msg: 'Chuck Norris' },
        { msg: 'Jet Li' },
        { msg: 'Kung Fury' }
      ]
    }
  },

  computed: {
    computedList: function () {
      var vm = this
      return this.list.filter(function (item) {
        return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
      })
    }
  },

  components: {
    AnimetaTransition,
    AnimetaTransitionGroup
  }
}
</script>

<style>
#app {
  padding: 100px;
}

.box {
  width: 100px;
  height: 100px;
  position: relative;
  background: #30E3CA;
  border-radius: 7px;
}

li {
  position: relative;
  transform-origin: 0 50%;
}
</style>
