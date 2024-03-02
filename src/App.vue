<script setup lang="ts">
import { storeToRefs } from 'pinia';
import DraggableItem from './components/DraggableItem.vue';
import { useStore } from './store';
import DropZone from './components/DropZone.vue';
import OffscreenDragImage from './components/OffscreenDragImage.vue';

const store = useStore();
const {order} = storeToRefs(store);
</script>

<template>
  <OffscreenDragImage/>
  <div>
    <DropZone :position="0" />
    <template v-for="(id, index) in order"
      :key="id"
    >
      <DraggableItem :id="id" />
      <DropZone :position="index + 1" />
    </template>
    
  </div>
</template>
