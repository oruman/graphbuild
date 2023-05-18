<script setup lang="ts">
import {computed, useCssModule} from "vue";
import type { PropType } from "vue";
import type { Boundaries } from "@/types";


const props = defineProps({
  path: {
    type: Array as PropType<number[]>,
  },
  column: Number,
  width: Number,
  boundaries: {
    type: Object as PropType<Boundaries>,
  }
});

const style = useCssModule();

const start = computed(() => props.boundaries?.[`${props.column}_${props.path?.[0]}_${props.path?.[1]}`]);
const end = computed(() => props.boundaries?.[`${props.column + 1}_${props.path?.[2]}`]);
const min = computed(() => Math.min(start.value, end.value));
const height = computed(() => Math.max(start.value, end.value));

const leftClasses = computed(() => start.value > end.value ? style.bottom : style.top);
const rightClasses = computed(() => start.value > end.value ? style.top : style.bottom);
</script>

<template>
  <div
    :class="$style.arrow"
    :style="{
      paddingTop: `${min}px`,
      height: `${height}px`
    }"
  >
    <div
      :class="[$style.left, leftClasses]"
      :style="{
        width: `${width * 20}px`
      }"
    />
    <div :class="rightClasses" />
  </div>
</template>

<style module>
.arrow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: min-content auto;
}

.left {
  border-right: solid 1px black;
}

.top {
  border-top: solid 1px black;
}

.bottom {
  border-bottom: solid 1px black;
}
</style>
