<template>
  <div class="layout-default">
    <LayoutAppHeader />
    <main>
      <slot />
    </main>
    <LayoutAppFooter />
    <LayoutAppCursor />
  </div>
</template>

<script setup lang="ts">
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
