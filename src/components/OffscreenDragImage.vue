<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore } from '../store';

const store = useStore();
const {draggingSecondary} = storeToRefs(store);
const numberOfDraggingItems = computed(() => draggingSecondary.value.length + 1);
</script>

<template>
  <div class="offscreen-drag-image">
    <span>
    {{ numberOfDraggingItems }} Item(s)
    </span>
  </div>
</template>

<style scoped>
.offscreen-drag-image {
  width: 400px;
  height: 125px;
  box-sizing: border-box;;
  position: absolute;
  left: -100%;

  padding: 10px;

  background-color: rgb(0, 217, 255);
}
</style>