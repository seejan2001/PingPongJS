const cvs = document.getElementById('ping');
const ctx = ping.getContext("2d");

const clearCanvas=()=>{
    ctx.fillStyle="black";
    ctx.fillRect(0,0,cvs.width,cvs.height);
}
const drawRect = (x,y,w,h,color)=>{
    ctx.fillStyle=color;
    ctx.fillRect(x,y,w,h);
}
const drawCircle =(x,y,radius)=>{
    ctx.fillStyle="red";
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
}
const drawText =(x,y,text)=>{
    ctx.fillStyle="WHITE";
    ctx.font="50px fantasy";
    ctx.fillText(text,x,y);
}

const user={
    x:0,
    y:cvs.height/2 - 60,
    w:20,
    h:120,
    color:"red",
    drawUser:function(){
        drawRect(this.x,this.y,this.w,this.h,this.color);
    }
}

const computer={
    x:cvs.width-20,
    y:cvs.height/2 -60,
    w:20,
    h:120,
    color:"red",
    score:0,
    drawComputer:function(){
        drawRect(this.x,this.y,this.w,this.h,this.color);
    }
}

const net={
    x:cvs.width/2-2,
    y:0,
    w:4,
    h:10,
    color:"white",
    drawNet:function(){
        for(let i=0; i<cvs.height; i+=15)
        {
            drawRect(this.x,this.y + i,this.w,this.h,this.color);
        }
    }
}

// DRAWING SCORE IN BOARD
const userscore ={
    x:cvs.width/4,
    y:cvs.height/4-50,
    score:0,
    drawScore:function(){
        drawText(this.x,this.y,this.score);
    }
}
const comscore={
    x: cvs.width/4 *3,
    y:cvs.height/4 -50,
    score:0,
    drawScore:function(){
        drawText(this.x,this.y,this.score);
    }
}

const ball={
    x:cvs.width/2,
    y:cvs.height/2,
    radius:10,
    velocityX:5,
    velocityY:5,
    radius:10,
    drawBall:function(){
        drawCircle(this.x,this.y,this.radius)
    },
    update:function(){
        this.x+=this.velocityX;
        this.y+=this.velocityY;
        // ALERTING WINNER
        if(this.x <0)
        {
            this.x = cvs.width/2;
            this.y=cvs.height/2;
            this.velocityX -= this.velocityX*2;
            this.velocityY-=this.velocityY*2;
            comscore.score+=1;
        }
        // ALERTING WINNER
        if(this.x > cvs.width)
        {
            userscore.score +=1;
        }
        
        // SIMPLE AI
        computer.y = ball.y*0.8;

        // IF BALL HITS EITHER TOP OR BOTTOM ITS VELOCITY IS DECREASED
        if(ball.y+ball.radius > cvs.height || ball.y - ball.radius < 0){
            this.velocityY-=this.velocityY*2;
        }
        // PASSING PARAMETER FOR FUNCTION FOR CHECKING COLLISION 
       let pl= ball.x > cvs.width/2 ? computer : user;
       if(collision(pl,ball)){
        this.velocityX -= this.velocityX*2;
       }
    }, 

}

function collision(p,b){
     p.top = p.y;
     p.bottom = p.y + p.h;
     p.left = p.x;
     p.right = p.x + p.w;

     b.top = b.y - b.radius;
     b.bottom = b.y + b.radius;
     b.left = b.x - b.radius;
     b.right = b.x + b.radius;

    return b.right > p.left && b.bottom > p.top && b.top < p.bottom && b.left < p.right;
    }

//     if(player == user){
//     if(ball.x-ball.radius < player.x+ player.radius && ball.y+ball.radius > player.y- player.radius && ball.y - ball.radius < player.y + player.radius)
//     {
//         console.log("Collision");
//     }
//     else{
//         console.log("Not collision")
//     }
// }
// else{
//     if(ball.x + ball.radius > player.x- player.w 
//         && ball.y + ball.radius < player.y+ player.h 
//         && ball.y - ball.radius > player.y + player.h)
//     {
//         console.log("Collision");
//     }
//     else{

//         console.log("NOt collisitonout")
//     }
// }
 

const render=()=>{
    clearCanvas();
    user.drawUser();
    computer.drawComputer();
    net.drawNet();
    ball.drawBall();
}
const update=()=>{
    userscore.drawScore();
    comscore.drawScore();
    ball.update();
}
const game=()=>{
    render();   
    update();
}


cvs.addEventListener("mousemove",function(evt){
    let rect = cvs.getBoundingClientRect();
    user.y = evt.clientY-user.h/2-rect.top;
    
})

setInterval(game,10);


 
