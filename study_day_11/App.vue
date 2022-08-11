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

  <!-- emit번외 1-1. 부모가 momsMsg를 mamaString이란 이름으로 prop으로 자식에게 내려다 줌.  -->
  <!-- emit번외 1-2. 부모가 자식에게 momsTouch라는 메서드를 실행시킬 수 있는 sonsEvent를 자식에게 내려다 줌..  -->
  <hello-vue @sonsEvent="momsTouch" :mamaString="momsMsg" :mamasId="idList[1]"><!-- 1-3. 자식 컴포넌트 사용 -->
    <h1>첫 번째 hello-vue 시작</h1>
    <template v-slot:bottom>
      <h1>첫 번째 hello-vue 끝</h1>
    </template>
  </hello-vue>
  <hello-vue @sonsEvent="momsTouch" :mamaString="momsMsg" :mamasId="'hello_vue_2'">
    <h2>두 번째 hello-vue 시작</h2>
    <template v-slot:bottom>
      <h2>두 번째 hello-vue 끝 1234</h2>
    </template>
  </hello-vue>
  <button @click="buttonClick">조회</button>
  <string-grid>
    <template v-for="element in this.memberList">
      <tr>
        <td>{{element.name}}</td>
        <td>{{element.website}}</td>
        <td>{{element.email}}</td>
      </tr>
    </template>
  </string-grid>
  <string-grid>
    <template v-for="element in this.memberList">
      <tr>
        <td>{{element.username}}</td>
        <td>{{element.phone}}</td>
      </tr>
    </template>
  </string-grid>
</template>

<script>
import HelloVue from './components/HelloVue.vue'; // 1-1. 자식 컴포넌트 import
import StringGrid from './components/StringGrid.vue'; 
import axios from 'axios';

export default {
  name: 'App',
  components: {
    'hello-vue' : HelloVue, // 1-2. import 해온 HelloVue 모듈을 hello-vue 이름의 컴포넌트로 등록
    'string-grid' : StringGrid
  },
  data:function(){
    return {
      momsNumber : 0, // 조회 버튼 클릭 회수에서 사용될 변수
      momsMsg : 'hello little girl', // 부모 컴포넌트에서 보간법으로 사용하고 자식에게 mamaString으로 prop 내려주는 변수
      imgStyle : { 
        width : '50px',
        height : '50px'
      }, // img 태그의 로고에 쓰이는 스타일 값을 설정할 변수
      idList : ['myId1','myId2'], // 부모와 자식이 id 값에 바인딩 할 변수
      memberList : [] // axios get 통신 후, 값을 담을 변수 
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
    },
    momsTouch: function(data){ // 자식 컴포넌트의 sonsEvent 이벤트가 발생할 때 트리거되어 실행될 부모와 자식간 통신용 메서드, momsMsg의 값을 바꾸게 됨.
      console.log('mom : ',data);
      //7. 부모의 momsTouch 메서드가 실행될 시 momsMsg의 값을 파라미터 data(자식이 6-2에서 추가한 파라미터)로 변경함.
      this.momsMsg = data;
    }
  },
  watch: { 
    momsNumber: { // momsNumber의 변화를 감지하여 특정한 동작을 수행할 예정.
      // immediate : true, //지켜보는 변수의 변화와 상관없이 watch 즉시 1회 실행 옵션. 
      deep: true,
      handler(value) {
        console.log('watch',value); 
      },
    }
  },
  created: function(){
    console.log('엄마 탄생');
    this.$nextTick(function() { 
      //자식 컴포넌트의 dom 엘리먼트가 그려짐을 100% 보장함.
      console.log('틱!');
    }); 
  },
  mounted: function(){
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
