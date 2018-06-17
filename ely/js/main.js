$(document).ready(function(){
  $('.field').css('background','green');
  //MAP
  fieldX=$(document).width()/2;
  fieldY=$(document).height()/2;
  map_size = 900;
  //PLAYER
  maxspeedT = 10;
  maxspeedB = maxspeedT/1.2;
  maxspeedS = 5;
  axelerationT = 0.7;
  axelerationB = axelerationT/1.2;
  axelerationS = 0.5;
  movingX=0,movingY=0;
  pmovingX=0,pmovingY=0;
  towards = false;back = false;left = false;right = false;
  bodywidth = 40;
  bodyheight = 60;
  noseActive = false;
  holding = 0;
  //OBJECTS
  setInterval(update,1000/25);
  objs = [];
  //objs.push(new Object('tree',300,2));
  //objs.push(new Object('tree',60,30));
  //objs.push(new Object('rock',0,30));
  objs.push(new Object('rock',100,0));
  //objs.push(new Object('rock',-100,0));
  //objs.push(new Object('rock',30,30));
  //objs.push(new Object('rock',0,0));

  for(i=0;i<rand_range(100,300);i++){
    o_types = ['tree','tree','tree','tree','tree','tree','tree','tree','tree','rock'];
    objs.push(new Object(o_types[Math.round(rand_range(0,10))],rand_range(fieldX-$(document).width()-map_size,fieldX-$(document).width()+map_size),rand_range(fieldY-$(document).height()-map_size,fieldY-$(document).height()+map_size)));
  }
});
$(document).mousemove(function (e) {
  mX = e.clientX;
  mY = e.clientY;
  midX = $(document).width()/2;
  midY = $(document).height()/2;
  dist = Math.pow(Math.pow(Math.abs(mX-midX),2)+Math.pow(Math.abs(mY-midY),2),0.5);
  if(mX>midX&&mY>midY){//4
    mdeg = Math.sin(Math.abs(mY-midY)/dist)*107+90;
  }else if(mX<midX&&mY>midY){//3
    mdeg = Math.sin(Math.abs(mX-midX)/dist)*107+180;
  }else if(mX>midX&&mY<midY){//2
    mdeg = Math.sin(Math.abs(mX-midX)/dist)*107;
  }else if(mX<midX&&mY<midY){//1
    mdeg = Math.sin(Math.abs(mY-midY)/dist)*107+270;
  }
  headd = 0;
  nosed = 0;
  if(holding!=0){
    maxleft = 359;
    maxright = 1;
  }else{
    maxleft = 290;
    maxright = 70;
  }
  if(mdeg<maxright||mdeg>maxleft){
    headd = mdeg;
    nosed = 0;
  }else{
    if(mdeg<180){
      headd = maxright;
    }else{
      headd = maxleft;
    }

    if(holding!=0){
      nosed = 0;
    }else{
      nosed = mdeg-headd;
    }
  }
  $('.head').css('transform','rotate('+headd+'deg)');
  nosed1 = nosed/3;nosed -= nosed1;
  nosed2 = nosed/3;nosed -= nosed2;
  nosed3 = nosed;nosed = 0;
  $('.nose1').css('transform','rotate('+nosed1+'deg)');
  $('.nose2').css('transform','rotate('+nosed2+'deg)');
  $('.nose3').css('transform','rotate('+nosed3+'deg)');
});
$(document).mousedown(function (e) {
  noseActive = true;
});
$(document).mouseup(function (e) {
  noseActive = false;
});
document.onkeydown = function (e) {
  //console.log(e.key);
  switch(e.key){
    case 'w':towards = true;break;
    case 's':back = true;break;
    case 'a':left = true;break;
    case 'd':right = true;break;
  }
}
document.onkeyup = function (e) {
  switch(e.key){
    case 'w':towards = false;break;
    case 's':back = false;break;
    case 'a':left = false;break;
    case 'd':right = false;break;
  }

  /*if(towards){towards = false;
  }else if(back){back = false;
  }else if(left){left = false;
  }else if(right){right = false;
  }*/
}
update = function(){
  if(towards&&fieldY+movingY<map_size){
    if(movingY<maxspeedT){
      movingY+=axelerationT;
    }
    $('.feet').addClass('towards');
  }else{
    $('.feet').removeClass('towards');
  }
  if(back&&fieldY-movingY>-map_size){
    if(movingY>-maxspeedB){
      movingY-=axelerationB;
    }
    $('.feet').addClass('backwards');
  }else{
    $('.feet').removeClass('backwards');
  }
  if(!back&&!towards&&movingY!=0){
   if(movingY>0){
     if(movingY>axelerationT){
       movingY/=3;
     }else{
       movingY = 0
     }
   }else{
     if(movingY<-axelerationB){
       movingY/=3;
     }else{
       movingY=0;
     }
   }
 }
  if(left&&fieldX+maxspeedS<map_size){
    if(movingX<maxspeedS){
      movingX+=axelerationS;
    }
    $('.feet').addClass('left');
  }else{
    $('.feet').removeClass('left');
  }
  if(right&&fieldX-maxspeedS>-map_size){
    if(movingX>-maxspeedS){
      movingX-=maxspeedS;
    }
    $('.feet').addClass('right');
  }else{
    $('.feet').removeClass('right');
  }
  if(!left&&!right&&movingX!=0){
    if(movingX>0){
      if(movingX>axelerationS){
        movingX/=2;
      }else{
        movingX=0;
      }
    }else{
      if(movingX<-axelerationS){
        movingX/=2;
      }else{
        movingX=0;
      }
    }
  }
  let colision = [[],[]];
  for(obj in objs){
    res = objs[obj].checkPos(movingX,movingY);
    if(!res[0]){
      movingX = 0;
      $('.feet').removeClass('left').removeClass('right');
      colision[0].push(objs[obj].id);
    }
    if(!res[1]){
      movingY = 0;
      $('.feet').removeClass('towards').removeClass('backwards');
      colision[1].push(objs[obj].id);
    }
  }
  //console.log(colision[1].length);
  fieldX+=movingX;
  fieldY+=movingY;
  for(obj in objs){
    objs[obj].update([colision]);
  }
  pmovingX = movingX;pmovingY = movingY;
}

class Object{
  constructor(type = 'tree',x,y){
    this.id = Math.round(rand_range(0,99999));
    this.type = type;
    this.x = x;
    this.y = y;
    this.taken = false;
    switch(this.type){
      case 'tree':this.width = 20;this.height = 20;break;
      case 'rock':this.width = 30;this.height = 30;break;
      case 'plank':this.width = 50;this.height = 10;break;
      default :this.width = 30;this.height = 30;
    }
    this.create = function(){
      switch(this.type){
        case 'tree':$('.field').append('<div class="obj-tree obj-'+this.id+'"><div class="obj-tree-branches"></div></div>');break;//let thing = '<div class="obj-tree obj-'+this.id+'"><div class="obj-tree-branches"></div></div>';break;
        case 'rock':$('.field').append('<div class="obj-rock obj-'+this.id+'"></div>');break;//let thing = '<div class="obj-rock obj-'+this.id+'"></div>';break;
        case 'plank':$('.field').append('<div class="obj-plank obj-'+this.id+'"></div>');break;//let thing = '<div class="obj-rock obj-'+this.id+'"></div>';break;
        //default :let thing = '<div class="obj-tree obj-'+this.id+'"><div class="obj-tree-branches"></div></div>';break;
      }
      //$('field').append(thing);
    }
    this.update = function(data){
      //console.log(data);
      if(this.taken == true&&holding == this.id){
        this.x = fieldX-$(document).width()/2+(this.width+bodywidth)/1.8;
        this.y = fieldY-$(document).height()/2+bodyheight/2;
        if(this.type == 'rock'){
          this.x-=10;
          this.y+=12;
        }
        $('.obj-'+this.id).css({'top':fieldY-this.y+'px','left':fieldX-this.x+'px'});
      }else{
        $('.obj-'+this.id).css({'top':fieldY-this.y+'px','left':fieldX-this.x+'px'});
      }
      if(data[0][1].indexOf(this.id)!=-1&&this.type =='tree'&&pmovingY>=maxspeedT){
        //console.log('tree in the face'+this.type+this.id);
        this.delete();
        objs.push(new Object('plank',this.x,this.y));
      }
      if(this.type =='plank'||this.type =='rock'){
        if(this.type =='rock'){
          //console.log(Math.abs(Math.abs(fieldX-this.x)+(this.width)-($(document).width()/2)),Math.abs(Math.abs(fieldY-this.y)+bodywidth-10-$(document).height()/2));
        }
        if(Math.abs(Math.abs(fieldX-this.x)+(this.width)-($(document).width()/2))<20&&Math.abs(Math.abs(fieldY-this.y)+bodywidth-$(document).height()/2)<10&&(mdeg>350||mdeg<10)){
          //console.log('take this plank, bro');
          if(!noseActive){
            $('.nose1').removeClass('hold');
            $('.obj-'+this.id).addClass('glow');
            this.taken = false;
            holding = 0;
          }else{
            $('.nose1').addClass('hold');
            $('.obj-'+this.id).removeClass('glow');
            this.taken = true;
            if(holding ==0){
              holding = this.id;
            }
          }
        }else{
          if(!noseActive){
            $('.nose1').removeClass('hold');
            this.taken = false;
            holding = 0;
          }
          $('.obj-'+this.id).removeClass('glow');
        }

      }
    }
    this.checkPos = function (moveX,moveY){
      let res = [true,true];
      let distX = fieldX-this.x+this.width-$(document).width()/2;
      let distY = fieldY-this.y+this.height-$(document).height()/2-bodyheight/2-10;
      if(Math.abs(distX+moveX)<Math.abs(bodywidth/2+this.width/2)&&Math.abs(distY+moveY)<Math.abs(bodyheight/2+this.height/2)){
        res[0] = false;
        res[1] = false;
        if(Math.abs(distX)>Math.abs(bodywidth/2+this.width/2)){
          res[1] = true;
        }
        if(Math.abs(distY)>Math.abs(bodyheight/2+this.height/2)){
          res[0] = true;
        }
      }
      return res;
    }
    this.delete = function () {
      let element;
      for(obj in objs){
        if(objs[obj].id == this.id){
          element = obj;
        }
      }
      if(this.type == 'tree'){
        $('.obj-'+objs[element].id).addClass('fall');
        setTimeout(function(){
          $('.obj-'+objs[element].id)[0].remove();
          objs.splice(element,1);
        },2000);
      }
    }
    this.create();
  }
}
function rand_range(min, max) {
  return Math.random() * (max - min) + min;
}
