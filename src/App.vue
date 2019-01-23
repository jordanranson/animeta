<template>
  <div id="app">
    <div class="page">
      <nav class="section nav">
        <div class="section-inner">
          <span class="faded">View the source on </span>
          <a href="//github.com/jordanranson/animeta">GitHub</a>
        </div>
      </nav>

      <header class="hero section">
        <div class="section-inner">
          <img :src="require('./assets/Logo.png')" />
        </div>
      </header>

      <section class="section">
        <div class="section-inner">
          <h2 class="title is-small">Getting Started</h2>
          <p>
            The built-in transition system in VueJS is a breeze to use, but there
            is only so much you can do with CSS transitions. I wanted something
            more robust, but with same ease of use. Enter: Animeta.
          </p>
          <p>
            This VueJS library marries the awesome power of <a href="//animejs.com" target="_blank">AnimeJS</a> with Vue's
            great built-in transition system, allowing developers to effortlessly
            implement impressive animations and transitions in their Vue-based apps.
          </p>
          <hr class="rule is-small" />
          <p>
            Getting started is easy. First, install the package:
          </p>
          <pre class="code">npm install vue-animeta --save</pre>
          <p>
            Then, include it in the component you want to use it in:
          </p>
          <pre class="code">import animetaComponents from 'vue-animeta'

export default {
  components: {
    ...animetaComponents
  }
}</pre>

        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <h2 class="title is-small">Single Elements/Components</h2>
          <div class="columns">
            <div class="column">
              <p>
                The usage of the animeta transition component is the same as the
                built-in <a href="//vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components" target="_blank">VueJS transition</a>. The only difference is that instead
                of CSS, you pass a <strong>to</strong>, <strong>from</strong> and <strong>options</strong> object to the component
                to define the transition.
              </p>
              <p>
                You can find a full list of properties you can use in the
                <a href="//animejs.com/documentation" target="_blank">AnimeJS documentation</a>.
              </p>
              <div class="demo">
                <animeta-transition
                  :to="singleTo"
                  :from="singleFrom"
                  :options="singleOptions"
                >
                  <div class="demo-box" v-if="!singleHidden"></div>
                </animeta-transition>
              </div>
              <div class="demo-controls">
                <button class="button" @click="singleHidden = !singleHidden">Click me</button>
              </div>
            </div>
            <div class="column">
              <pre class="code">const to = {
  scale: 1,
  opacity: 1,
  translateX: 0,
  translateY: 0,
  borderRadius: 15
}

const from = {
  scale: 0,
  opacity: 0,
  translateX: 300,
  translateY: 300,
  borderRadius: 100
}

const options = {
  duration: 750
}

&lt;animeta-transition
  :to=&quot;{ ...to }&quot;
  :from=&quot;{ ...from }&quot;
  :options=&quot;{ ...options }&quot;
  @after-leave=&quot;doSomething()&quot;
  @after-enter=&quot;doSomething()&quot;
&gt;
  &lt;div v-if=&quot;!hidden&quot;&gt;&lt;/div&gt;
&lt;/animeta-transition&gt;</pre>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <h2 class="title is-small">Transition Lists</h2>
          <div class="columns">
            <div class="column">
              <p>
                As with single components, lists are also largely the same as their
                <a href="//vuejs.org/v2/guide/transitions.html#List-Transitions" target="_blank">Vue counterparts</a>. Transitions are defined the same way as single
                components.
              </p>
              <p>
                The one caveat is you <em>must</em> include the <strong>data-index</strong> property
                on the list items. This value should be the same as the index of
                the item in the array.
              </p>
              <div class="demo">
                <animeta-transition-group
                  tag="ul"
                  class="demo-list"
                  :to="{ scale: 1, opacity: 1 }"
                  :from="{ scale: 0, opacity: 0 }"
                  :options="{ duration: 500, delay: 50 }"
                >
                  <li
                    v-for="(item, i) in filteredList"
                    :key="i"
                    :data-index="i"
                  ></li>
                </animeta-transition-group>
              </div>
              <div class="demo-controls">
                <button class="button" @click="filterList = !filterList">Click me</button>
              </div>
            </div>
            <div class="column">
              <pre class="code">&lt;animeta-transition-group
  tag=&quot;ul&quot;
  :to=&quot;{ scale: 1, opacity: 1 }&quot;
  :from=&quot;{ scale: 0, opacity: 0 }&quot;
  :options=&quot;{ duration: 500, delay: 50 }&quot;
&gt;
  &lt;li
    v-for=&quot;(item, i) in computedList&quot;
    :key=&quot;i&quot;
    :data-index=&quot;i&quot;
  &gt;&lt;/li&gt;
&lt;/animeta-transition-group&gt;</pre>
            </div>
          </div>
        </div>
      </section>

      <div class="section">
        <hr class="rule" />
      </div>

      <footer class="footer section">
        <div class="section-inner faded">
          &copy; {{ currentYear }} Jordan Ranson
          <div style="margin-left:auto">
            <span class="faded">View the source on </span>
            <a href="//github.com/jordanranson/animeta">GitHub</a>
          </div>
        </div>
      </footer>

    </div>
  </div>
</template>

<script>
import animeta from '@/lib/animeta.js'

export default {
  name: 'App',

  data () {
    return {
      // Single component demo
      singleTo: {
        scale: 1,
        opacity: 1,
        translateX: 0,
        translateY: 0,
        borderRadius: 15
      },
      singleFrom: {
        scale: 0,
        opacity: 0,
        translateX: 300,
        translateY: 300,
        borderRadius: 100
      },
      singleOptions: {
        duration: 750
      },
      singleHidden: false,

      filterList: false,
      list: [ 1, 1, 1, 1, 1, 1, 1, 1 ]
    }
  },

  computed: {
    filteredList () {
      return this.list.filter((item, i) => {
        return this.filterList ? (i % 2 === 0) : true
      })
    },

    currentYear () {
      return (new Date()).getFullYear()
    }
  },

  components: {
    ...animeta
  }
}
</script>

<style lang="sass">
@import "@/styles/reset.sass"
@import "@/styles/styles.sass"
@import url("https://fonts.googleapis.com/css?family=Work+Sans:200,400,600")

#app,
input,
button
  font-family: 'Work Sans', 'Avenir', Helvetica, Arial, sans-serif

.nav
  text-align: right

.hero
  margin: $margin-lg auto
  img
    margin: 0 auto
    padding-left: 3vw
    width: 100%
    max-width: 559px
    display: block

.footer
  margin-bottom: $margin-md
  .section-inner
    div
      margin-top: $margin-sm
  +desktop
    .section-inner
      display: flex
      div
        margin-top: 0

.demo-box
  width: calc(50vw - #{$margin * 2})
  height: calc(50vw - #{$margin * 2})
  margin: 0 auto
  border-radius: 15px
  background: $color2 linear-gradient(to bottom, $color2, $color1)
  margin-top: $margin
  margin-bottom: $margin
  +desktop
    width: 20vw
    height: 20vw
    margin-top: 0

.demo-list
  display: flex
  flex-wrap: wrap
  li
    width: 90px
    height: 90px
    margin: 0 $margin-sm $margin-sm 0
    border-radius: 7px
    background: $color2 linear-gradient(to bottom, $color2, $color1)
    +desktop
</style>
