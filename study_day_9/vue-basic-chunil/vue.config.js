const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false // 빌드 시 eslint가 error를 띄우는 것을 끔. 
})
