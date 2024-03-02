<script setup lang="ts">
import { toRefs } from 'vue';
import { useStore } from '../store';

const props = defineProps<{ position: number }>();
const {position} = toRefs(props);
const store = useStore();

const dragoverHandler = (event: DragEvent) => {
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
  }
}
  
const dropHandler = () => {
  store.finishDrag(position.value);
}

</script>

<template>
  <div
    class="drop-zone"
    @dragover="dragoverHandler"
    @drop="dropHandler"
  >
    Drop here
  </div>
</template>

<style scoped>
.drop-zone {
  border: dotted;
  text-align: center;
}
</style>