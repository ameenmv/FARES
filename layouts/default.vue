<template>
  <div class="layout-default">
    <LayoutAppPreloader @complete="onPreloaderComplete" />
    <LayoutAppHeader />
    <main>
      <slot />
    </main>
    <LayoutAppFooter />
    <LayoutAppCursor />
  </div>
</template>

<script setup lang="ts">
const preloaderDone = ref(false)

function onPreloaderComplete() {
  preloaderDone.value = true
}

provide('preloaderDone', preloaderDone)
</script>

<style scoped>
.layout-default {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>

