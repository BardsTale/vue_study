<template>
  <br>
  <!-- 익명 슬롯 : 부모가 자식 컴포넌트 태그 안에 기입한 html 템플릿 코드가 알아서 들어가는 곳. -->
  <slot></slot> 
  
  <br>
  <!-- emit번외 2-2. 자식이 sonsEvent라는 event를 부여받음. -->
  <div v-bind:id="mamasId">

    <!-- emit번외 5. 자식이 mouseover 이벤트 발생 시 hoverEvent 메소드를 실행시킴. -->
    <span @mouseover="hoverEvent" :title="myMsg">{{myMsg}}</span>


    <!-- emit번외 4. 자식이 sonsMsg를 input(text)에 v-model로 바인딩 함. -->
    <input v-model="sonsMsg" placeholder="여기를 수정해보세요" />

  </div>
  <!-- 기명 슬롯 : 지정한 이름을 받은 html 템플릿 코드가 들어가는 곳 -->
  <slot name="bottom"></slot>
</template>

<script>
export default {
    name: 'HelloVue',
    props: {
        mamaString : String, // emit번외 2-1. 자식이 mamaString이라는 prop을 받음.
        mamasId : String,
    },
    data: function(){
      return{
        sonsMsg: this.mamaString // emit번외 3. 자식이 받은 mamaString을 본인의 변수 sonsMsg에다 집어넣음.
      }
    },
    computed: {
        myMsg: function () {
            return `${this.sonsMsg}, Hello mommy`; // span태그에서 보간법과 title 바인딩으로 쓰이는 변경된 변수. 
        }
    },
    methods:{
      hoverEvent:function(){
        // emit번외 6-1. 자식의 hoverEvent 메소드 발생시 sonsEvent를 emit시킴(momsTouch를 실행시키는 트리거 이벤트)
        // emit번외 6-2. 자식의 sonsEvent를 emit 시 sonsMsg를 파라미터로 추가함.
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