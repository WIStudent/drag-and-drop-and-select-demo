import { defineStore } from "pinia";
import { ref } from 'vue';

type ID = string;
interface Item {
  id: ID;
  color:  {
    red: number;
    green: number;
    blue: number;
  }
}

const createItems = (n: number): Record<ID, Item> => {
  const [id1, id2, id3, id4, id5] = Array.from({length: 5}, () => crypto.randomUUID());

  return {
    [id1]: {
      id: id1,
      color: {red: 255, green: 0, blue: 0}
    },
    [id2]: {
      id: id2,
      color: {red: 0, green: 255, blue: 0}
    },
    [id3]: {
      id: id3,
      color: {red: 0, green: 0, blue: 255}
    },
    [id4]: {
      id: id4,
      color: {red: 255, green: 255, blue: 0}
    },
    [id5]: {
      id: id5,
      color: {red: 0, green: 255, blue: 255}
    },
  }
}


export const useStore = defineStore("store", () => {
  const items = ref(createItems(5));
  const order = ref<ID[]>(Object.keys(items.value));
  const selected = ref<ID[]>([]);
  const draggingPrimary = ref<ID|null>(null);
  const draggingSecondary = ref<ID[]>([]);


  const select = (id: ID) => {
    if (selected.value.includes(id)) {
      return;
    }
    selected.value = [...selected.value, id];
  }

  const unselect = (id: ID) => {
    if (!selected.value.includes(id)) {
      return;
    }
    selected.value = selected.value.filter(selected => selected !== id);
  }

  const startDrag = (id: string) => {
    draggingPrimary.value = id;
    draggingSecondary.value = selected.value.includes(id)
      ? selected.value.filter(s => s !== id)
      : [];
  }

  const finishDrag = (targetPosition: number) => {
    if (draggingPrimary.value === null) {
      throw new Error('dragging was not started');
    }
    const move = [draggingPrimary.value, ...draggingSecondary.value]
    order.value = order.value.filter(o => !move.includes(o)).toSpliced(targetPosition, 0, ...move);

    draggingPrimary.value = null;
    draggingSecondary.value = [];
  }

  const cancelDrag = () => {
    draggingPrimary.value = null;
    draggingSecondary.value = [];
  }

  return {
    items,
    order,
    selected,
    draggingPrimary,
    draggingSecondary,
    select,
    unselect,
    startDrag,
    finishDrag,
    cancelDrag
  }
});