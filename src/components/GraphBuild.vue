<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";
import type { Graph } from "@/types";
import { useGraph } from "@/composables/graph";

const props = defineProps({
  data: {
    type: Object as PropType<Graph>,
    default: () => ({})
  }
});

const graph = computed(() => useGraph(props.data as Graph));
</script>

<template>
  <div :class="$style.table">
    <template
      v-for="(column, i) of graph.table"
      :key="`column_${i}`"
    >
      <div :class="$style.column">
        <div
          v-for="(cell, j) of column"
          :key="`cell_${i}_${j}`"
          :class="$style.cell"
          :data-id="`end_${cell}`"
        >
          <h3>{{ graph.all[cell].text }}</h3>
          <div
            v-for="(child, k) of graph.all[cell].children"
            :key="`text_${i}_${j}_${k}`"
            :class="$style.child"
            :data-id="`start_${cell}_${k}`"
          >
            {{ child }}
          </div>
        </div>
      </div>
      <div />
    </template>
  </div>
</template>

<style module>
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
  & h3 {
    font-weight: bold;
    border-radius: 8px;
    background-color: #e6e6e6;
  }
}

.child {}
</style>
