<template>
  <div>
    <h1>EventTest组件</h1>
    <Event1 />
    <Event2 />
  </div>
</template>

<script>
import Event1 from "./Event1";
import Event2 from "./Event2";
export default {
  name: "EventTest",
  components: {
    Event1,
    Event2,
  },
  methods: {},
};
</script>

<style>
</style>