<script setup lang="ts">
import { computed, ref } from "vue";
import type { PropType } from "vue";
import { useGraph } from "@/composables/graph";
import type { CustomNode } from "@/types/custom";
import type { Boundaries } from "@/types";
import ArrowBlock from "@/components/ArrowBlock.vue";

const props = defineProps({
  data: {
    type: Array as PropType<CustomNode>,
    default: () => []
  }
});

const graph = computed(() => useGraph(props.data as CustomNode[]));

const internalRefTable = ref<HTMLElement | null>(null);
const boundaries = ref<Boundaries>({});
const setBoundary = () => {
  boundaries.value = {};
  if (!(internalRefTable.value instanceof HTMLElement)) {
    return;
  }
  const el = internalRefTable.value;
  const top = el.getBoundingClientRect().top;
  el.querySelectorAll("[data-path]").forEach((item) => {
    const id = item.attributes["data-path"].value;
    const rect = item.getBoundingClientRect();
    boundaries.value[id] = Math.round(rect.top - top + rect.height / 2);
  })
}

const refTable = computed({
  get: () => internalRefTable.value,
  set: (value: HTMLElement | null) => {
    internalRefTable.value = value;
    setBoundary();
  }
})
</script>

<template>
  <div :class="$style.wrapper">
    <div
      ref="refTable"
      :class="$style.table"
    >
      <template
        v-for="(column, i) of graph.table"
        :key="`column_${i}`"
      >
        <div :class="$style.column">
          <div
            v-for="(cell, j) of column"
            :key="`cell_${i}_${j}`"
            :class="$style.cell"
            :data-path="[i, j].join('_')"
          >
            <h3>{{ data[cell].text }}</h3>
            <div
              v-for="(child, k) of data[cell].child"
              :key="`text_${i}_${j}_${k}`"
              :class="$style.child"
              :data-path="[i,j,k].join('_')"
            >
              {{ child.tag }}
            </div>
          </div>
        </div>
        <div v-if="graph.arrows[i]" :class="$style.arrowColumn">
          <arrow-block
            v-for="(arrow, j) of graph.arrows[i]"
            :key="`arrow_${i}_${j}`"
            :column="i"
            :path="arrow"
            :width="(j + 1) / Math.max(1, graph.arrows[i].length)"
            :boundaries="boundaries"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<style module>
.wrapper {
  max-width: 100vw;
  overflow: auto;
}

.table {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 300px 40px;
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px 0;
}

.cell {
  border: solid 1px black;
  border-radius: 8px;
}

.cell h3 {
  font-weight: bold;
  border-radius: 8px;
  background-color: #e6e6e6;
}

.child {}

.arrowColumn {
  position: relative;
}
</style>
