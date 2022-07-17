<template>
  <div id="section-2" class="section-2">
    <split-expand v-bind:className="'section-2__expand'" v-bind:clickState="clickState"> 
        <template v-slot:left="slotProps">
          <div class="section-2__expand--left" v-on:click="slotProps.clickSection('left')">
            <div class="section-2__left-bg">
              <div class="section-2__contents--left" v-on:mouseover="slotProps.hoverSection('left')">
                <div class="section-2__title--left">왼쪽 영역</div>
              </div>
              <transition name="fade">
                <div v-show="slotProps.clickStateObj['left']" class="section-2__contents--left" id="left-movie" v-on:mousemove="moveCursor">
                  <div class="section-2__clicked-title--left">왼쪽 영역 클릭</div>
                  <div class="section-2__left--exit" v-bind:style="cursorXY"></div>
                  <div class="section-2__left--dimmed"></div>
                </div>
              </transition>
            </div>
          </div>
        </template>
        <template v-slot:center="slotProps">
          <div class="section-2__expand--center" v-on:click="slotProps.clickSection('center')">
            <div class="section-2__center-bg">
              <div class="section-2__contents--center" v-on:mouseover="slotProps.hoverSection('center')">
                <div class="section-2__title--center">중간 영역</div>
              </div>
              <transition name="fade">
                <div v-show="slotProps.clickStateObj['center']" class="section-2__contents--center" id="center-movie" v-on:mousemove="moveCursor">
                  <div class="section-2__clicked-title--center">중간 영역 클릭</div>
                  <div class="section-2__center--exit" v-bind:style="cursorXY"></div>
                  <div class="section-2__center--dimmed"></div>
                </div>
              </transition>
            </div>
          </div>
        </template>
        <template v-slot:right="slotProps">
          <div class="section-2__expand--right" v-on:click="slotProps.clickSection('right')">
            <div class="section-2__right-bg">
              <div class="section-2__contents--right" v-on:mouseover="slotProps.hoverSection('right')">
                <div class="section-2__title--right">오른쪽 영역</div>
              </div>
              <transition name="fade">
                <div v-show="slotProps.clickStateObj['right']" class="section-2__contents--right" id="right-movie" v-on:mousemove="moveCursor">
                  <div class="section-2__clicked-title--right">오른쪽 영역 클릭</div>
                  <div class="section-2__right--exit" v-bind:style="cursorXY"></div>
                  <div class="section-2__right--dimmed"></div>
                </div>
              </transition>
            </div>
          </div>
        </template>
      </split-expand>
  </div>
</template>

<script>
import {gsap} from 'gsap';
import SplitExpand, {splitModule} from './components/SplitExpand';

export default {
  name: 'App',
  data:function (){
    return{
      cursorXY:{
        left : 0,
        top : 0,
      },
      clickState: {
        left : false,
        right : false,
        center : false
      }
    }
  },
  components: {
    'split-expand': SplitExpand,
  },
  methods: {
    moveCursor: function (event){
      this.cursorXY.left = `${event.pageX}px`;
      this.cursorXY.top = `${event.pageY}px`;
    }
  },
  mounted() {
    /* SplitExpand의 module에서 사용할 gsap 애니매이션 선언부 */
    // 싱글파일컴포넌트 SplitExpand에서 받은 splitModule의 setAniObj 메소드를 이용하여 사용할 애니매이션을 추가.
    // 명명 규칙은 'action(동작)_name(이름)'
    splitModule.setAniObj('start_init', gsap.timeline({paused: true})
        .addLabel('start')
        .from('.section-2__expand--left', {duration: 0.3, y: '-=200', ease: 'circ.inOut'}, 'start+=.7')
        .from('.section-2__expand--right', {duration: 0.3, y: '-=200', ease: 'circ.inOut'}, 'start+=.7')
        .from('.section-2__expand--center', {duration: 0.3, y: '-=200', ease: 'circ.inOut'}, 'start+=.7')
        .from('.section-2__expand--left', {duration: 0.5, x: '+=52%', ease: 'circ.inOut'}, 'start+=1.1')
        .from('.section-2__expand--right', {duration: 0.5, x: '-=52%', ease: 'circ.inOut'}, 'start+=1.1')
        .from('.section-2__title--left', {duration: 0.5, opacity: 0, ease: 'circ.inOut'}, 'start+=1.5')
        .from('.section-2__title--right', {duration: 0.5, opacity: 0, ease: 'circ.inOut'}, 'start+=1.5')
        .from('.section-2__title--center', {duration: 0.5, opacity: 0, ease: 'circ.inOut'}, 'start+=1.5')
        .add(function(){
          splitModule.setThrottling('init','');
        }, ">-=.1")
    );

    splitModule.setAniObj('start_centerInit', gsap.timeline({paused: true})
        .addLabel('start')
        .from('.section-2__center--dimmed', { duration: 2, opacity: 1, ease: 'power4.easeIn' },'start+=.3')
        .from('#center-movie', { duration: 1.5, filter: 'blur(5px)', ease: 'power4.easeIn' },'start+=.1')
        .from('.section-2__clicked-title--center', { duration: 1.2, opacity: 0, ease: 'power4.easeIn' },'start+=.3')
    );

    splitModule.setAniObj('start_leftInit', gsap.timeline({paused: true})
        .addLabel('start')
        .from('.section-2__left--dimmed', { duration: 2, opacity: 1, ease: 'power4.easeIn' },'start+=.3')
        .from('#left-movie', { duration: 1.5, filter: 'blur(5px)', ease: 'power4.easeIn' },'start+=.1')
        .from('.section-2__clicked-title--left', { duration: 1.2, opacity: 0, ease: 'power4.easeIn' },'start+=.3')
    );

    splitModule.setAniObj('start_rightInit', gsap.timeline({paused: true})
        .addLabel('start')
        .from('.section-2__right--dimmed', { duration: 2, opacity: 1, ease: 'power4.easeIn' },'start+=.3')
        .from('#right-movie', { duration: 1.5, filter: 'blur(5px)', ease: 'power4.easeIn' },'start+=.1')
        .from('.section-2__clicked-title--right', { duration: 1.2, opacity: 0, ease: 'power4.easeIn' },'start+=.3')
    );

    splitModule.setAniObj('click_left', gsap.timeline({paused: true})
        .addLabel('start')
        .to('.section-2__expand--left', {duration: .3, left: '67%', ease: 'none'}, '-=.5')
        .to('.section-2__expand--center', {duration: .3, left: '135%', ease: 'none'}, '-=.5')
        .to('.section-2__expand--right', {duration: .3, right: '-35%', ease: 'none'}, '-=.5')
    );

    splitModule.setAniObj('click_right', gsap.timeline({paused: true})
        .addLabel('start')
        .to('.section-2__expand--left', {duration: .3, left: '-35%', ease: 'none'}, '-=.5')
        .to('.section-2__expand--center', {duration: .3, left: '-35%', ease: 'none'}, '-=.5')
        .to('.section-2__expand--right', {duration: .3, right: '67%', ease: 'none'}, '-=.5')
    );

    splitModule.setAniObj('click_center', gsap.timeline({paused: true})
        .addLabel('start')
        .to('.section-2__expand--left', {duration: .3, left: '-35%', ease: 'none'}, '-=.5')
        .to('.section-2__expand--center', {duration: .3, left: '50%', ease: 'none'}, '-=.5')
        .to('.section-2__expand--right', {duration: .3, right: '-35%', ease: 'none'}, '-=.5')
        .to('.section-2__expand--right', {duration: .3, right: '-35%', ease: 'none'}, '-=.5')
    );

    splitModule.setAniObj('hover_left', gsap.timeline({paused: true})
        .addLabel('start')
        .to('.section-2__expand--left', {duration: .4, left: '27%', ease: 'none'}, '-=.5')
        .to('.section-2__expand--right', {duration: .4, right: '-13%', ease: 'none'}, '-=.5')
        .to('.section-2__expand--center', {duration: .4, left: '70%', ease: 'none'}, '-=.5')
        .to('.section-2__title--left', {duration: .4, right: '20%', ease: 'none'}, 'start>-=.3')
        .to('.section-2__title--right', {duration: .4, left: '1%', ease: 'none'}, 'start>-=.3')
        .add(function(){
          splitModule.setThrottling('right','');
          splitModule.setThrottling('center','');
        }, ">-=.5")
    );

    splitModule.setAniObj('hover_right', gsap.timeline({paused: true})
        .addLabel('start')
        .to('.section-2__expand--left', {duration: .4, left: '-13%', ease: 'none'}, '-=.5')
        .to('.section-2__expand--right', {duration: .4, right: '27%', ease: 'none'}, '-=.5')
        .to('.section-2__expand--center', {duration: .4, left: '30%', ease: 'none'}, '-=.5')
        .to('.section-2__title--left', {duration: .4, right: '1%', ease: 'none'}, 'start>-=.3')
        .to('.section-2__title--right', {duration: .4, left: '20%', ease: 'none'}, 'start>-=.3')
        .add(function(){
          splitModule.setThrottling('left','');
          splitModule.setThrottling('center','');
        }, ">-=.5")
    );

    splitModule.setAniObj('hover_center', gsap.timeline({paused: true})
        .addLabel('start')
        .to('.section-2__expand--center', {duration: .4, left: '50%', ease: 'none'}, '-=.5')
        .to('.section-2__expand--left', {duration: .4, left: '-13%', ease: 'none'}, '-=.5')
        .to('.section-2__expand--right', {duration: .4, right: '-13%', ease: 'none'}, '-=.5')
        .to('.section-2__title--left', {duration: .4, right: '1%', ease: 'none'}, 'start>-=.3')
        .to('.section-2__title--right', {duration: .4, left: '1%', ease: 'none'}, 'start>-=.3')
        .add(function(){
          splitModule.setThrottling('left','');
          splitModule.setThrottling('right','');
        }, ">-=.5")
    );

    splitModule.setAniObj('out_all', gsap.timeline({paused: true})
        .addLabel('start')
        .to('.section-2__expand--left', {duration: .4, left: '0%', ease: 'none'}, '-=.5')
        .to('.section-2__expand--right', {duration: .4, right: '0%', ease: 'none'}, '-=.5')
        .to('.section-2__expand--center', {duration: .4, left: '50%', ease: 'none'}, '-=.5')
        .to('.section-2__title--left', {duration: .4,  right: '7%', ease: 'none'}, 'start>-=.3')
        .to('.section-2__title--right', {duration: .4, left: '7%', ease: 'none'}, 'start>-=.3')
        .add(function(){
          splitModule.setThrottling('left','');
          splitModule.setThrottling('right','');
          splitModule.setThrottling('center','');
        }, ">-=.5")
    );

    this.$nextTick(function() { 
      splitModule.playAni('init','start');
    }); 
  },
}
</script>

<style lang="scss">
@mixin position-abs($top: null, $bottom: null, $left: null, $right: null, $width:null, $height: null, $bp: null) {
	position: absolute;
	@if $top != null {
		top: $top;
	}
	@if $bottom != null {
		bottom: $bottom;
	}
	@if $left != null {
		left: $left;
	}
	@if $right != null {
		right: $right;
	}
	@if $width != null {
		width: $width;
	}
	@if $height != null {
		height: $height;
	}
	@if $top == 50% {
		margin-top: round( -(calc($height/2)) );
	}
	@if $bottom == 50% {
		margin-bottom: round( -(calc($height/2)) );
	}
	@if $left == 50% {
		margin-left: round( -(calc($width/2)) );
	}
	@if $right == 50% {
		margin-right: round( -(calc($width/2)) );
	}
	@if $bp != null {
		background-position: $bp;
	}
}

$splits: ('left', 'right', 'center');

body{
  overflow: hidden;
}

.section-2{
  background-color: black;
  min-width: 1650px;
  &__title{
    @each $split in $splits{
      &--#{$split}{
        @if($split == 'left') {
          @include position-abs($width:352px, $height:460px, $right:7%, $top:50%);
        }@else if($split == 'right'){
          @include position-abs($width:352px, $height:460px, $left:7%, $top:50%);
        }@else if($split == 'center'){
          @include position-abs($width:352px, $height:460px, $left:50%, $top:50%);
        }
        transition: 0.1s;
        overflow: hidden;
        margin-top: -388px;
      }
    }
  }

  &__clicked{
    &-title{
      @each $split in $splits{
        &--#{$split}{
          @include position-abs($width:478px, $height:151px, $left:50%, $top:50%);
          margin-top: -458px;
          z-index: 2;
          color: white;
        }
      }
    }
  }

  &__contents{
    @each $split in $splits{
      &--#{$split}{
        @if($split == 'left') {
          @include position-abs($width:100%, $height:100%, $left:50%);
        }
        @else {
          @include position-abs($width:100%, $height:100%, $right:50%);
        }
        overflow: hidden;
      }
    }
  }

  &__expand{
    width: 100%;
    height: 100%;
    @each $split in $splits{
      &--#{$split}{
        @if($split == 'left') {
          @include position-abs($width:33%, $height:100%, $left:0, $top:0);
          z-index: 2;
        }@else if($split == 'right'){
          @include position-abs($width:33%, $height:100%, $right:0, $top:0);
          z-index: 2;
        }@else if($split == 'center'){
          @include position-abs($width:100%, $height:100%, $left:50%, $top: 0);
          z-index: 1;
        }
        overflow: visible;
        display: inline-block;
        cursor: pointer;
        transition: 0.1s;
      }
    }
  }
  &__center{
    &-bg{
      @include position-abs($width:100vw, $height:100vh, $left:50%, $top:0);
      background-color: lightyellow;
      position: relative;
      min-height: 1080px;
    }
    &--dimmed{
      @include position-abs($width:100%, $height:100%, $left:50%);
      overflow: hidden;
      background-color: black;
      z-index: 1;
      opacity: 0.3;
    }
    &--exit{
      @include position-abs($width:105px, $height:99px, $top:0, $left:0);
      background-color: white;
      transition: 0.1s;
      transform:translate(-50%, -50%);
      z-index: 9999;
    }
  }
  &__left{
    &-bg{
      @include position-abs($width:100vw, $height:100vh, $left:0, $top:0);
      background-color: lightblue;
      float: right;
      position: relative;
      min-height: 1080px;
    }
    &--dimmed{
      @include position-abs($width:100%, $height:100%, $left:50%);
      overflow: hidden;
      background-color: black;
      z-index: 1;
      opacity: 0.3;
    }
    &--exit{
      @include position-abs($width:105px, $height:99px, $top:0, $left:0);
      background-color: white;
      transition: 0.1s;
      transform:translate(-50%, -50%);
      z-index: 9999;
    }
  }


  &__right{
    &-bg{
      @include position-abs($width:100vw, $height:100vh, $left:0, $top:0);
      background-color: lightcoral;
      float: left;
      position: relative;
      min-height: 1080px;
    }
    &--dimmed{
      @include position-abs($width:100%, $height:100%, $left:50%);
      overflow: hidden;
      background-color: black;
      z-index: 1;
      opacity: 0.3;
    }
    &--exit{
      @include position-abs($width:105px, $height:99px, $top:0, $left:0);
      background-color: white;
      transition: 0.1s;
      transform:translate(-50%, -50%);
      z-index: 9999;
    }
  }
}

//vue 트랜지션 태그
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>