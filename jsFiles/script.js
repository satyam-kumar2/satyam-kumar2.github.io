var canvas, ctx, saveButton, clearButton;
var pos = {x:0, y:0};
var rawImage;
var model;
	
function setPosition(e){
	pos.x = e.clientX-10;
	pos.y = e.clientY-100;
}
    
function draw(e) {
	if(e.buttons!=1) return;
	ctx.beginPath();
	ctx.lineWidth = 18;
	ctx.lineCap = 'round';
	ctx.strokeStyle = 'white';
	ctx.moveTo(pos.x, pos.y);
	setPosition(e);
	ctx.lineTo(pos.x, pos.y);
	ctx.stroke();
	rawImage.src = canvas.toDataURL('image/png');
}
    
function erase() {
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,480,480);
}
    
function save() {
	var raw = tf.browser.fromPixels(rawImage,1);
	var resized = tf.image.resizeBilinear(raw, [75,75]);
	var tensor = resized.expandDims(0);
    var prediction = model.predict(tensor);
    var pIndex = tf.argMax(prediction[0], 1).dataSync();
    var prom = prediction[1].array();
    var bbox;
    prom.then(function(value) {
        bbox = value;
    });
    console.log(bbox);
    document.getElementById("pred").innerHTML = "Predicted: " + pIndex.toString();
}
    
function init() {
	canvas = document.getElementById('canvas');
	rawImage = document.getElementById('canvasimg');
	ctx = canvas.getContext("2d");
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,480,480);
	canvas.addEventListener("mousemove", draw);
	canvas.addEventListener("mousedown", setPosition);
	canvas.addEventListener("mouseenter", setPosition);
	saveButton = document.getElementById('sb');
	saveButton.addEventListener("click", save);
	clearButton = document.getElementById('cb');
	clearButton.addEventListener("click", erase);
}


async function run(){
    const MODEL_URL = './models/model.json';
    model = await tf.loadLayersModel(MODEL_URL);
    console.log('working');
    console.log(model.summary());
    init();
}

document.addEventListener('DOMContentLoaded', run);



    