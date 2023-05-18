<script setup lang="ts">
import {onMounted, ref} from "vue";
import sample from "@/data/custom.json";

const emit = defineEmits(["update"]);

const data = ref(JSON.stringify(sample));

const submit = () => {
  let json = [];
  try {
    json = JSON.parse(data.value)
  } catch {
    /* empty */
  }
  emit("update", json);
}

onMounted(() => {
  emit("update", sample)
})
</script>

<template>
  <form :class="$style.form" @submit.prevent="submit">
    <textarea v-model="data" rows="10" />
    <button type="submit">Show</button>
  </form>
</template>

<style module>
.form {
  max-width: 100%;
  width: 800px;
  display: flex;
  flex-direction: column;
}
</style>
