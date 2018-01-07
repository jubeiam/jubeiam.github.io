<style scoped>
  div{
    width: 60px;
    height: 60px;
    border-radius: 40%;
    cursor: pointer;
  }

  div img{
    height: 100%;
  }

  .red{
    background-color: rgba(200, 0, 0, 0.3)
  }

  .green{
    background-color: rgba(0, 200, 0, 0.3)
  }

  .blue{
    background-color: rgba(0, 0, 200, 0.3)
  }


</style>

<template lang="pug">
  div(:class="{red: red, green: green, blue: blue}")
    img(src="../../assets/img/drum.png")
</template>

<script>
export default {
  props: {
    red: Boolean,
    green: Boolean,
    blue: Boolean
  }
}
</script>
