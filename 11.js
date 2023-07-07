
let para = document.getElementById("time");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");


let startTime;
let nowTime;
let renderTime = 0;
let intval;
let stopIntVal;
let particleCreation;
let sno = 1;
let stopTime = 0;
let aaa = true;

para.innerHTML = "0:000"+"sec";

function start(a){

    if(a === 1){
        if(aaa){
            startTime = Date.now();
        clearInterval(stopIntVal);
        clearInterval(intval);
        intval = setInterval(()=>{
            nowTime = Date.now();
            renderTime = stopTime+(nowTime-startTime)/1000;
            para.innerHTML = renderTime.toFixed(3)+"sec";
            // para.style.boxShadow = '0px 0px 20px 1px rgb(40, 238, 10)';
        },10);

        
        clearInterval(particleCreation);
        particleCreation = setInterval(()=>{
            mouse.x = window.innerWidth/2;
            mouse.y = window.innerHeight/2+50;
            for(let i = 0; i<20; i++){
            particlesArray.push(new Particle());
            }
        },400);
        aaa = false;
    }
    }
    if(a === 2){
        aaa = true;
        stopTime = renderTime;
        let aa = true;
        clearInterval(intval);
        clearInterval(particleCreation);
        clearInterval(stopIntVal);
       if(para.innerHTML !== "0:000"+"sec"){
        stopIntVal = setInterval(()=>{
            if(aa){
                para.innerHTML = renderTime.toFixed(3)+"sec";
                aa = false;
            }
            else{
                para.innerHTML = "_";
                aa = true;
            }

        },500);
       }
    }
    if(a === 3){
        aaa = true;
        stopTime = 0;
        if(para.innerHTML !== "0:000"+"sec"){
          let div = document.createElement("div");
            div.innerHTML = `${sno} : `+para.innerHTML;
            sno++;
            document.getElementById("data").append(div);
            div.classList.add("dd")
        }
        clearInterval(stopIntVal);
        clearInterval(particleCreation);
        clearInterval(intval);
        para.innerHTML = "0:000"+"sec";
        renderTime = 0
        // para.style.boxShadow = null;
       
    }
}

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
    canvas.height = window.innerHeight
window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

})

let hue = 0;
let pp = 0;
let particlesArray = [];
let k = [];
const mouse = {
    x : undefined,
    y : undefined
}
canvas.addEventListener("mousedown",function(event){
     mouse.x = event.x;
     mouse.y = event.y;
     mouse.pressed = true;
     for(let i = 0; i<5; i++){
     particlesArray.push(new Particle());
  
     }
})

canvas.addEventListener("mouseup",function(event){
mouse.pressed = false;
});

canvas.addEventListener("mousemove",(event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
    if(mouse.pressed){
    for(let i = 0; i<2; i++){
        particlesArray.push(new Particle());
   
        }
    }
   })

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random()*canvas.width;
        // this.y = Math.random()*canvas.height;
        this.size = Math.round(Math.random()*20+1)
        this.speedX = Math.random()*3-1.5;
        this.speedY = Math.random()*3-1.5;
        this.color = `hsl(${hue},100%,50%)`
        // this.color = 'red'
    }
    update(){
        this.x+=this.speedX;
        this.y+=this.speedY;
        if(this.size>0.1) this.size-=0.05;        

    }
    draw(){
    
        ctx.fillStyle = this.color
    
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
        ctx.fill();
    }
}

function handlesParticles(){
    for(let i = 0; i<particlesArray.length; i++){
        
        particlesArray[i].draw();
        particlesArray[i].update();
       
        for(let j = i; j<particlesArray.length;j++){
          const dx = particlesArray[i].x-particlesArray[j].x;
          const dy = particlesArray[i].y-particlesArray[j].y;
          let distance = Math.sqrt(dx*dx+dy*dy);
          if(distance<120){
            ctx.beginPath();
            ctx.strokeStyle = particlesArray[i].color;
            // ctx.strokeStyle = 'purple';
            ctx.lineWidth = Math.round(Math.random()*30+1)/10
            ctx.lineWidth = 0.2;
            ctx.moveTo(particlesArray[i].x,particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x,particlesArray[j].y)
            ctx.stroke();
          }
        }
        if(particlesArray[i].size<=0.3){
            particlesArray.splice(i,1)
            i--;
        }
    }
}





let animate = ()=>{
ctx.fillStyle = "rgba(0,0,0)"
ctx.fillRect(0,0,canvas.width,canvas.height)
handlesParticles();
hue+=2;
if(hue==360){hue=0}
  requestAnimationFrame(animate);
}
animate();
