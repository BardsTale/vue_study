<template>
  <div v-bind:class="className" v-on:mouseout="outSection">

    <slot name="left" v-bind:hoverSection="hoverSection" v-bind:clickSection="clickSection" v-bind:clickStateObj="clickStateObj"></slot>

    <slot name="center" v-bind:hoverSection="hoverSection" v-bind:clickSection="clickSection" v-bind:clickStateObj="clickStateObj"></slot>

    <slot name="right" v-bind:hoverSection="hoverSection" v-bind:clickSection="clickSection" v-bind:clickStateObj="clickStateObj"></slot>

  </div>
</template>

<script>
/* 애니매이션 모듈 */
export let splitModule = (() => {
  //gsap 애니매이션 변수
  let aniFuncObj = {};
  //애니매이션 쓰로틀링 변수
  let throttling = {};
  //클릭 체크 변수
  let clickState;
  return {
    //클릭 체크 변수 getter, setter
    getClickState : () => {
      return clickState;
    },
    setClickState : (value) => {
      clickState = value;
    },
    initClickState : () => {
      Object.keys(clickState).forEach(ele=>{clickState[ele] = false});
    },

    //gsap 애니매이션 변수 getter,setter
    getAniObj : () => {
      return aniFuncObj;
    },
    setAniObj : (name, func) => {
      aniFuncObj[name] = func;
    },

    //쓰로틀링 컨트롤
    setThrottling : (type, value) => {
      if(type === 'all'){
        Object.keys(throttling).forEach(ele=>{throttling[ele] = value});
      }else{
        throttling[type] = value;
      }
    },
    getThrottling : (type) => {
      return type === 'all'? Object.values(throttling) : throttling[type];
    },

    //애니매이션 컨트롤
    //재생
    playAni : (type, action) => {
      if(type !== 'init' && throttling['init']) return;
      throttling[type] = action; //애니매이션 쓰로틀링 걸기

      if(action !== 'start')aniFuncObj[`${action}_${type}`].invalidate();
      aniFuncObj[`${action}_${type}`].play(0);
    },

    //모듈 초기화
    initModule : () => {
      splitModule.setThrottling('all','');
      splitModule.playAni('all','out');
    }
  }
})();

export default {
  name: "splitExpand",
  props: {
    className: {
      type: String,
      required: true,
    },
    clickState: {
      type: Object,
      required: true,
    },
  },
  data:function (){
    return{
      clickStateObj:this.clickState
    }
  },
  methods: {
    //영역 마우스 오버
    hoverSection: function (name) {
      if(!splitModule.getThrottling(name)) splitModule.playAni(name, 'hover');
    },
    //영역 클릭(토글형)
    clickSection: function (name) {
      if(splitModule.getThrottling('init')) return;
      if(splitModule.getThrottling(name) === 'click'){
        splitModule.playAni(name, 'hover');
        this.clickStateObj[name] = false;
      }else{
        splitModule.playAni(name, 'click');
        this.clickStateObj[name] = true;
        splitModule.playAni(`${name}Init`, 'start');
      }
    },
    //영역 아웃
    outSection: function (event) {
      if (event.toElement == null || event.toElement.classList.contains('ncc-gnb-wrap__bg') ||
          event.toElement.classList.contains('promokit-page-menu__link') || 'UL' == event.toElement.tagName)
      {
        if(splitModule.getThrottling('all').indexOf('click') == -1) splitModule.playAni('all', 'out');
      }
    }
  },
  mounted() {
    /* 모듈에 clickStateObj 뷰 변수 등록 */
    splitModule.setClickState(this.clickStateObj);
  }
}
</script>

<style scoped>

</style>