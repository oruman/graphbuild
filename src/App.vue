<script setup lang="ts">
import { ref } from "vue";
import GraphBuild from "@/components/GraphBuild.vue";
import FormEdit from "@/components/FormEdit.vue";
import type { CustomNode } from "@/types/custom";

const data = ref<CustomNode[]>([]);
</script>

<template>
  <div>
    <form-edit @update="args => data = args" />
    <hr :class="$style.hr" />
    <graph-build :data="data" />
  </div>
</template>

<style module>
.hr {
  margin: 40px 0;
}
</style>
