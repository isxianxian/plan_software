<template>
  <div>
    首页
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  },
  methods: {},
  created() {
    this.$api.allProjects().then((res) => {
      console.log(res);
    });
  },
  mounted() {},
};
</script>

<style></style>
