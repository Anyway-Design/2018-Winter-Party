var g = new Vue({
  el: '#party',
  data: {
    numbers: 100,
    hNumber: 18,
    rawHNumber: 18,
    midWidth: 200,
    midHeight: 200,
    midX: -200,
    midY: -200,
    vNumber: 6,
    isLoaded: false,
    showPopup: false,
    popupCount: 1,
    midVNumber: 4,
    peopleToTalk: 12,
    popupContent: "设计杂谈播客 Anyway.FM 的<span>北京线下活动</span>"
  },
  methods: {
    randomNumber: function (x) {
      x = Math.random() * x
      return (x.toFixed(0))
    },
    randomPercentage: function (x) {
      x = Math.random() * x * 2  - x
      return (x.toFixed(0))
    },
    isPopup: function(n){

      if (this.numbers - Math.floor(this.hNumber / 2) == n) {
        return true
      }

    },
    popUp: function(a){
      this.showPopup = true
      if (this.popupCount % 6 == 0) {
        this.popupContent = "设计杂谈播客 Anyway.FM 的<span>北京线下活动</span>"
      }
      switch (a) {
        case '1': this.popupContent += "，<em><strong>时间</strong>定于 12 月 22 日下午 2:00 - 6:00</em>"
          break
        case '2': this.popupContent += "，<em><strong>地点</strong>在望京的 8KM COFFEE</em>"
          break
        case '3': this.popupContent += "，<em><strong>内容</strong>包括：主播们的「抱团」分享 / 问答沙龙 / 新产品发布 / 到场嘉宾：请允许我们按北京站惯例保持神秘~</em>"
          break
        default:

      }
      this.popupCount ++
      if (this.popupCount % 6 == 0) {
        this.popupContent = "你是真皮……重来~"
      }

    },
    isRemoved: function(x) {

      if (this.vNumber % 2 == 0) {
        if (Math.abs(Math.floor( x / this.hNumber) + 1 - ( this.vNumber / 2 + 0.5) ) < (this.midVNumber / 2)) {
          if (Math.abs(x % this.hNumber - this.hNumber / 2 - 0.5) < 3) {
            return "removed"
          }
        }

      }
      else {
        if (Math.abs(Math.floor(x / this.hNumber) + 1 - ( this.vNumber / 2 + 0.5) ) < (this.midVNumber / 2 + 0.5)) {
          if (Math.abs(x % this.hNumber - this.hNumber / 2 - 0.5) < 3) {
            return "removed"
          }
        }
      }

    }
  }
})

initProcess = function() {
  singleWidth = window.getComputedStyle(document.getElementById('w1')).width.replace(/[^-\d\.]/g, '')
  singleHeight = window.getComputedStyle(document.getElementById('w1')).height.replace(/[^-\d\.]/g, '')

  fullWidth = window.getComputedStyle(document.getElementById('content')).width.replace(/[^-\d\.]/g, '')
  fullHeight = window.getComputedStyle(document.getElementById('content')).height.replace(/[^-\d\.]/g, '')

  screenWidth = window.getComputedStyle(document.getElementById('party')).width.replace(/[^-\d\.]/g, '')
  screenHeight = window.getComputedStyle(document.getElementById('party')).height.replace(/[^-\d\.]/g, '')

  g.rawHNumber = fullWidth / singleWidth

  g.hNumber = Math.floor( fullWidth / singleWidth )
  g.vNumber = Math.floor( fullHeight / singleHeight ) + 1
  g.numbers = g.hNumber * g.vNumber

  g.peopleToTalk = g.numbers - Math.floor(g.hNumber / 2)
  if (g.vNumber > 10) {
    g.midVNumber = 6
  }

  if (g.hNumber %2 == 0) {
    g.midX = fullWidth / 2 - singleWidth * 3
    g.midWidth = singleWidth * 6
  }
  else {
    g.midX = fullWidth / 2 - singleWidth * 2.5
    g.midWidth = singleWidth * 5
  }

  if (g.vNumber%2==0) {
    g.midY =( g.vNumber - g.midVNumber ) * singleHeight / 2
    g.midHeight = singleHeight * g.midVNumber
  }
  else {
    g.midY =( g.vNumber - g.midVNumber - 1 ) * singleHeight / 2
    g.midHeight = singleHeight * (g.midVNumber + 1)
  }

  g.isLoaded = true
}
window.onload = function(){
  initProcess()
}
window.onresize = function(){
  initProcess()
}
 document.body.addEventListener('touchstart', function () {});
