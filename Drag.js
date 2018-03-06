function Drag(ele){
  this.ele = typeof ele === Object ? ele : document.getElementById(ele);

  //鼠标的初始位置
  this.startX = 0;
  this.startY = 0;
  //物体的初始位置
  this.targetX = 0;
  this.targetY = 0;

  this.init();
}

Drag.prototype = {
  constructor: Drag,

  init: function(){
    this.setDrag();
  },

  //得到对象的位置
  getPos: function(){
    var pos = {x: 0, y: 0},
        transformValue = this.getStyle('transform');

    if(transformValue === 'none'){
        this.ele.style.transform = 'translate(0, 0)';
    }else{
      //负号用于匹配当物体有一部分在屏幕外边时, 数值为负; ？指匹配0或一个
      var temp = transformValue.match(/-?\d+/g);
      
      //transformValue是一个矩阵, translate的x和y为第5和第6个值
      pos = {
        x: parseInt(temp[4].trim()),
        y: parseInt(temp[5].trim())
      }
    }
    return pos
  },

  getStyle: function(property){
    return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(this.ele)[property] : this.ele.currentStyle[property]
  },

  //设置对象的位置
  setPos: function(pos){
      this.ele.style.transform = 'translate(' + pos.x + 'px,' + pos.y + 'px)'
  },

  //用于绑定事件
  setDrag: function(){
    var that = this;
    this.ele.addEventListener('mousedown', start, false);

    function start(e){
      var pos = that.getPos();
      that.startX = e.pageX;
      that.startY = e.pageY;
      that.targetX = pos.x;
      that.targetY = pos.y;

      document.addEventListener('mousemove', move, false);
      document.addEventListener('mouseup', end, false);
    }

    function move(e){
      var currentX = e.pageX,
          currentY = e.pageY;

      var distanceX = currentX - that.startX,
          distanceY = currentY - that.startY;

      that.setPos({
        x: (that.targetX + distanceX).toFixed(),
        y: (that.targetY + distanceY).toFixed()
      })
    }

    function end(e){
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', end);
    }
  }
}