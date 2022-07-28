<template>
  <!-- 2-2. 자식이 sonsEvent라는 event를 부여받음. -->
  <div v-bind:id="mamasId">

    <!-- 5. 자식이 mouseover 이벤트 발생 시 hoverEvent 메소드를 실행시킴. -->
    <span @mouseover="hoverEvent" :title="myMsg">{{myMsg}}</span>

    <!-- 4. 자식이 sonsMsg를 input(text)에 v-model로 바인딩 함. -->
    <input v-model="sonsMsg" placeholder="여기를 수정해보세요" />
  </div>
</template>

<script>
export default {
    name: 'HelloVue',
    props: {
        mamaString : String, //2-1. 자식이 mamaString이라는 prop을 받음.
        mamasId : String
    },
    data: function(){
      return{
        sonsMsg: this.mamaString // 3. 자식이 받은 mamaString을 본인의 변수 sonsMsg에다 집어넣음.
      }
    },
    computed: {
        myMsg: function () {
            return `${this.sonsMsg}, Hello mommy`;
        }
    },
    methods:{
      hoverEvent:function(){
        // 6-1. 자식의 hoverEvent 메소드 발생시 sonsEvent를 emit시킴(momsTouch를 실행시키는 트리거 이벤트)
        // 6-2. 자식의 sonsEvent를 emit 시 sonsMsg를 파라미터로 추가함.
        this.$emit('sonsEvent',this.sonsMsg);
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