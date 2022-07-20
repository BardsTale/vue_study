<template>
  <div>
    {{myMsg}}
  </div>
</template>

<script>
export default {
    name: 'HelloVue',
    props: {
        //부모한테서 받은 프롭이름 : 값타입
        mamaString : String
    },
    computed: {
        myMsg: function () {
            return `${this.mamaString}, Hello mommy`;
        }
    },
}
</script>

<style>

</style>