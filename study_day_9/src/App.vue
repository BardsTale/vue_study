<template>
  <template v-if="momsNumber === 1">
    <img v-bind:style="imgStyle" :id="idList[0]" v-bind:class="'imgWidht'" alt="Vue logo" src="./assets/logo.png">
  </template>
  <template v-else-if="momsNumber > 1">
    <template v-for="num in momsNumber">
      <img v-bind:style="imgStyle" :id="`${idList[0]}_${num}`" v-bind:class="'imgWidht'" alt="Vue logo" src="./assets/logo.png">
    </template>
  </template>
  <template v-else>
    이미지 없음.
  </template>  
  <br>
  조회 버튼 클릭 횟수 {{momsNumber}}
  <br><br>
  <input v-model="momsMsg" placeholder="여기를 수정해보세요" />
  <p>맘스 메시지: {{ momsMsg }}</p>
  <br><br>
  <hello-vue :mamaString="momsMsg" :mamasId="idList[1]" />
  <button @click="buttonClick">조회</button>
</template>

<script>
import HelloVue from './components/HelloVue.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    'hello-vue' : HelloVue
  },
  data:function(){
    return {
      momsNumber : 0,
      momsMsg : 'hello little girl',
      imgStyle : {
        width : '50px',
        height : '50px'
      },
      idList : ['myId1','myId2'],
      memberList : []
    }
  },
  methods: {
    buttonClick: function (event){
      this.momsNumber++;
      axios.get('https://jsonplaceholder.typicode.com/users/') //get 요청(select)
        .then((response) => { // 응답 성공 시
          if(response.status >= 200 && response.status < 300){
            this.memberList = response.data;
            console.log(this.memberList);
          }
        })
        .catch((error) => { // 응답 실패 시
          console.log(error);
        });
    }
  },
  watch: {
    momsNumber: { 
      // immediate : true, //지켜보는 변수의 변화와 상관없이 watch 즉시 1회 실행 옵션. 
      deep: true,
      handler(value) {
        console.log('watch',value);
      },
    }
  },
  created: function(){
    console.log('엄마 탄생');
  },
  mounted: function(){
    this.$nextTick(function() { 
      //자식 컴포넌트의 dom 엘리먼트가 그려짐을 100% 보장함.
      console.log('틱!');
    }); 
    console.log('엄마 강림');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.imgWidht{
  width: 700px;
}
</style>
