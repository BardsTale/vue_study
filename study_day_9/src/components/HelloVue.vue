<template>
  <div v-bind:id="mamasId">
    {{myMsg}}
    <input v-model="mamaString" placeholder="여기를 수정해보세요" />
  </div>
</template>

<script>
export default {
    name: 'HelloVue',
    props: {
        //부모한테서 받은 프롭이름 : 값타입
        mamaString : String,
        mamasId : String
    },
    computed: {
        myMsg: function () {
            return `${this.mamaString}, Hello mommy`;
        }
    },
    created: function(){
      console.log('아들 응애');
    },
    mounted: function(){
      console.log('아들 강림');
    }
}
</script>

<style>

</style>