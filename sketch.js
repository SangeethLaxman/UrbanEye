let video;
let pics = [];
let scores = [];
let imgCanvas;
let cameraEnabled = false;
let videoCanvas = document.getElementById("videoCanvas");
let checkbox = document.getElementById("cameraCheckbox");
let button = document.getElementById('cameraButton');
let indexElement = document.getElementById('indexElement');
let fileInput;
let index = 0;

function toggleCamera() {
  cameraEnabled = checkbox.checked;
  videoCanvas.toggleAttribute('hidden');
  button.toggleAttribute('disabled');
}

function videoP(p) {
  p.setup = function() {
    p.createCanvas(400, 400);
  }

  p.draw = function() {
    if (cameraEnabled && video) {
      p.image(video, 0, 0, 400, 400);
    }
  }
}

function moveIndex(change) {
  if (pics.length === 0) return;
  index = (index + change + pics.length) % pics.length;
  indexElement.innerHTML = "Index: " + index;
}

function draw() {
  background(0);
  if (pics.length > 0) {
    let currentImg = pics[index];
    image(currentImg, 0, 0, 400, 400); 
  } else {
    textAlign(CENTER, CENTER);
    fill(255);
    text("No images yet", width / 2, height / 2);
  }
}

function handleUpload(file) {
  if (file.type === 'image') {
    loadImage(file.data, (loadedImage) => {
      pics.push(loadedImage); 
      index = pics.length - 1;
      indexElement.innerHTML = "Index: " + index;
    });
  }
}

function setup() {
  video = createCapture(VIDEO);
  video.size(400, 400);
  video.hide();

  let videoP5 = new p5(videoP, 'videoCanvas');

  imgCanvas = createCanvas(400, 400);
  imgCanvas.parent("imageCanvas");
  background(0);

  fileInput = createFileInput(handleUpload);
  fileInput.parent("camControls");
}

function addToList(image) {
  if (image instanceof p5.Image) {
    pics.push(image);
  }
}

function take() {
  if (cameraEnabled && video) {
    let img = video.get(0, 0, 400, 400);
    addToList(img);
    index = pics.length - 1;
    indexElement.innerHTML = "Index: " + index;
  }
}
