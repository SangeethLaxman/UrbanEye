



//Dictionary to give points for each label
let scoreReference = {
  "Water & Drainage Issues": -3,
  "Road Surface Damage": -4,
  "Lighting and Visibility Issues": -2,
  "Vegetation Overgrowth": -1,
  "Structural Damage": -5,
  "Smooth Road Surface": 4,
  "Efficient Drainage": 3,
  "Good Lighting and Visibility": 2,
  "Clean Environment": 1,
  "Safe Pedestrians and Traffic Signals": 4
}

let imageArray = [/*
  {
    "image": IMAGE OBJECT HERE,
    "label": ""
    "score": 0
  }
  */
 ]

let video; //Webcam Capture Variable
let imgCanvas; //Image Canvas
let videoP5; // Webcam Canvas
let cameraEnabled = false; 

//Get Elements
let videoCanvas = document.getElementById("videoCanvas"); 
let checkbox = document.getElementById("cameraCheckbox");
let button = document.getElementById('cameraButton');
let indexElement = document.getElementById('indexElement');
let totalScoreElement = document.getElementById('totalScoreElement')
let analyzeButton = document.getElementById('analyzeButton')
let removeButton = document.getElementById('removeButton')



let totalScore = 0;
let fileInput;
let index = 0;
let classifier; //Variable for Model Classifier
let modelURL = "https://teachablemachine.withgoogle.com/models/kvz9cozfO/" //Techable Machine Model URL



function toggleCamera() { //Called when the 'Toggle Camera' checkbox is toggled
  cameraEnabled = checkbox.checked;
  videoCanvas.toggleAttribute('hidden');
  button.toggleAttribute('disabled');
}

function videoP(p) { //Function to make a seperate Canvas for webcam
  p.setup = function() {
    p.createCanvas(400, 400);
  }

  p.draw = function() {
    if (cameraEnabled && video) {
      p.image(video, 0,0, video.width,video.height,video.width/2-200, video.height/2-200); //draw webcam to canvas
    }
  }
}

function moveIndex(change) { //function to move the image index by a number
  if (imageArray.length == 0) return;// if the dictionary of images is empty, stop function
  index = (index + change + imageArray.length) % imageArray.length;  //Increase or Decrease index and clamp the index only to the extents of the dictionary
  indexElement.innerHTML = "Photo Number: " +(index+1); //Update Element
}

function draw() {

  background(0);

  if (imageArray.length > 0) {
    let currentImg = imageArray[index]["image"]; //Get Image of selected index from imageArray

    image(currentImg, 0,0, currentImg.width,currentImg.height,currentImg.width/2-200, currentImg.height/2-200); //draw to canvas
  
    if (imageArray[index]["label"]!="") { // if a label is recognized

      textSize(16)
      stroke(0,0,0)
      strokeWeight(7)
      textAlign(LEFT,BOTTOM)

      if (imageArray[index]["score"] < 0) {
        fill(255,0,0);
      } else {
        fill(0,255,0);
      }
  
      //Draw a text which displays the label and the score gained by that label
      if (imageArray[index]["score"]>0){
        text(`${imageArray[index]["label"]} (+${imageArray[index]["score"]})`, 20,height-20)
      } else {
        text(`${imageArray[index]["label"]} (${imageArray[index]["score"]})`, 20,height-20)
      }
    }
  } else { // if imageArray is empty
    textAlign(CENTER, CENTER);
    fill(255);
    text("No images uploaded yet", width / 2, height / 2);
  }
}

function handleUpload(file) {
  if (file.type === 'image') {
    loadImage(file.data, (loadedImage) => {
      loadedImage.resize(0,400) //resize to fit height
      
      addToArray(loadedImage) // add to imageArray
      indexElement.innerHTML = "Photo Number: " + (index+1); //Update Element
    });
  }
}

function setup() {

  video = createCapture(VIDEO); // Create the Video Capture
  //video.size(400, 400);
  video.hide(); //Hide the default video capture preview

  videoP5 = new p5(videoP, 'videoCanvas'); //make the new canvas for displaying webcam

  imgCanvas = createCanvas(400, 400); //Create canvas for displaying images added
  imgCanvas.parent("imageCanvas");
  background(0);

  fileInput = createFileInput(handleUpload); //create a fileInput to upload images from device
  fileInput.parent("camControls"); //Set fileInput's parent to 'camControls'

  classifier = ml5.imageClassifier(modelURL+"model.json ") //Initialize the Teachable Machine Model
}

function removeImage() { //function to remove the image at current index

  if (imageArray.length>0) {
    imageArray.splice(index,1)// remove the image at the current index
    index-=1
  }
  if (imageArray.length==0) { //If the imageArray is empty, disable and hide specific elements
    indexElement.hidden = true
    analyzeButton.disabled = true
    removeButton.disabled = true
  }
  
}

function addToArray(image) {  //Function to add 'image' to the imageArray
  if (image instanceof p5.Image) {
    
    imageArray.push({ //Adds a dictionary containing the image, a blank label, and a score of zero, which will be modified during analysis
      "image": image,
      "label": "",
      "score": 0
    });
    index = imageArray.length - 1; //Set index to last index (newly added image)
    if (imageArray.length>0) { //If the imageArray is not empty, enable and hide specific elements
      hidden = true
      analyzeButton.disabled = false
      removeButton.disabled = false;
    }
  }
}

function take() { //Function to take a picture from webcam
  if (cameraEnabled && video) { //If camera is enabled and video capture exists
    let img = video.get(0, 0, 400, 400); //Take the image from the current fram of Camera
    addToArray(img); 
    indexElement.innerHTML = "Photo Number: " + index;
  }
}

let classificationIndex = 0; 

function getResults(results, error) {

  if (error) { //Error Checking
    console.error(error);
    return;
  }

  imageArray[classificationIndex]["label"] = results[0].label //Modify the label to the recognized label

  try { 
    imageArray[classificationIndex]["score"] = scoreReference[results[0].label] //Modify the score to the respective points
  } catch (error) {
    console.error(error)
  }

  if (classificationIndex+1<imageArray.length) { //Check if the next index is still within the imageArray
    classificationIndex+=1 //Increase classification index
    classifier.classify(imageArray[classificationIndex]["image"], getResults) //Run classify() again with the next image
  } else {
    analyzeButton.disabled = false; // if not, enable button
    for (let i=0; i<imageArray.length; i++) {
      totalScore += imageArray[i]["score"] 
    }
    totalScoreElement.innerHTML = totalScore //Add all points
  }
  
  console.log("Classification Finished! Updated imageArray")
  console.log(imageArray)
}

function startClassify() {
  console.log("Started Classification...")
  analyzeButton.innerHTML = "Analyzing..."
  analyzeButton.disabled = true;
  if (imageArray.length>0) {
    classificationIndex = 0
    classifier.classify(imageArray[classificationIndex]["image"], getResults) //classify the first image
  }
  
}