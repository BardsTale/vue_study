<template>
  <table>
    <slot></slot>
  </table>
</template>

<script>
export default {
    name: 'StringGrid',
}
</script>

<style>
    table tr td{
        border: 1px solid black;
    }
</style>