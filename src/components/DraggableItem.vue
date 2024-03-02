<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStore } from '../store';
import { computed, toRefs } from 'vue';

const props = defineProps<{ id: string }>();
const {id} = toRefs(props);

const store = useStore();
const {selected, draggingPrimary, draggingSecondary, items} = storeToRefs(store);

const isSelected = computed({
  get() {
    return selected.value.includes(id.value)
  },
  set(value: boolean) {
    if (value) {
      store.select(id.value);
    }
    else {
      store.unselect(id.value);
    }
  }
});

const item = computed(() => items.value[id.value]);
const backgroundColor = computed(() => `rgb(${item.value.color.red}, ${item.value.color.green}, ${item.value.color.blue})`);

const isDraggingPrimary = computed(() => draggingPrimary.value === id.value);
const isDraggingSecondary = computed(() => draggingSecondary.value.includes(id.value));

const dragStartHandler = (event: DragEvent) => {
  console.log('event', event);
  event.dataTransfer?.setData("text/plain", id.value);
  store.startDrag(id.value);

  const offscreenDragImage = document.querySelector('.offscreen-drag-image');
  if (offscreenDragImage === null) {
    throw new Error('Could not find offscreen-drag-image')
  }
  event.dataTransfer?.setDragImage(offscreenDragImage, event.offsetX, event.offsetY);
}
const dragEndHandler = (event: DragEvent) => {
  if (event.dataTransfer?.dropEffect === "none") {
    store.cancelDrag();
  }
}

const classes = computed(() => ({
  'draggable-item--dragging-primary': isDraggingPrimary.value,
  'draggable-item--dragging-secondary': isDraggingSecondary.value,
  'draggable-item--selected': isSelected.value
}))

</script>

<template>
  <div
    class="draggable-item"
    :class="classes"
    draggable="true"
    @dragstart="dragStartHandler"
    @dragend="dragEndHandler"
  >
    <div>id: {{ id }}</div>
    <input 
      type="checkbox"
      v-model="isSelected"
    >
    <div>Dragging Primary: {{ isDraggingPrimary }}</div>
    <div>Dragging Secondary: {{ isDraggingSecondary }}</div>
  </div>
</template>

<style scoped>
.draggable-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 400px;
  height:125px;
  padding: 10px;
  border: solid;
  box-sizing: border-box;
  border-width: 0;
  background-color: v-bind(backgroundColor)
}
.draggable-item > * {
  color: white;
  mix-blend-mode: difference;
}
.draggable-item--dragging-primary {
  opacity: 0.4;
}
.draggable-item--dragging-secondary {
  opacity: 0.4;
}
.draggable-item--selected {
  border-width: 3px;
}
</style>
