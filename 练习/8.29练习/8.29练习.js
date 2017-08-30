let box = document.getElementById('box');

function Fun(params) {
    this.boxDown = params; //boxDown就是这个运动的div盒子;
    this.disX = 0;
    this.disY = 0;
    console.log(this); //这个里面的this是指向这个Fun这个对象;
}
let d = new Fun(box);
Fun.prototype.init = function () {
    console.log(this) //这个this的指向是谁调用this,呢么this就指向谁;
    this.boxDown.onmousedown = this.downFn.bind(this); //当boxDown这个盒子被点击的时候执行downFn这个函数;同时改变downFn这个函数的this指向为Fun这个对象;
}
Fun.prototype.downFn = function (ev) {
    console.log(this); //这个this本来的指向是box这个盒子自己,但是我们已经把他改为了Fun这个对象,所以现在指向Fun这个对象;
    this.disX = ev.clientX - this.boxDown.offsetLeft; //求的是鼠标点击这个盒子时的位置到盒子边缘的距离;
    this.disY = ev.clientY - this.boxDown.offsetTop;
    console.log(this.disX, this.disY)

    //此时这个函数里面的this指向的是box这个盒子,因此我们要把这个this改成指向init中的this,也就是Fun这个对象;
    //因为只有这个对象的原型下面才有prototype.mouseFn,所以要改变this指向;
    document.onmousemove = this.moveFn.bind(this);
    document.onmouseup = this.upFn.bind(this);
}
Fun.prototype.moveFn = function (ev) {
    console.log(this)
    this.boxDown.style.left = ev.clientX - this.disX + 'px';
    this.boxDown.style.top = ev.clientY - this.disY + 'px';
}
Fun.prototype.upFn = function (ev) {
    console.log(this);
    document.onmousemove = document.onmouseup = null;
}
d.init()