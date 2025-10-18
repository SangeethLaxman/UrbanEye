let scoreReference = {
    "Water & Drainage Issues": -30,
    "Road Surface Damage": -40,
    "Lighting and Visibility Issues": -20,
    "Vegetation Overgrowth": -10,
    "Structural Damage": -50,
    "Smooth Road Surface": 40 ,
    "Efficient Drainage": 30,
    "Good Lighting and Visibility": 20,
    "Clean Environment": 10,
    "Safe Pedestrians and Traffic Signals": 40
}


let imageArray = [/*
    {
        "image": IMAGE OBJECT HERE,
        "label": "",
        "score": 0,
        "howTo": ""
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
let flipButton = document.getElementById('flipCamera')
let howToButton = document.getElementById('howToButton')
let responseArea = document.getElementById('responseArea')
let responseLoader = document.getElementById('responseLoader')
let classLoader = document.getElementById('classLoader')

function refreshResponseArea() {
    responseArea.innerHTML = markdownToHTML(imageArray[index]["howTo"])
}

function markdownToHTML(md) {
    let html = md;

  
    html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  
    html = html.replace(/^###### (.*)$/gm, "<h6>$1</h6>");
    html = html.replace(/^##### (.*)$/gm, "<h5>$1</h5>");
    html = html.replace(/^#### (.*)$/gm, "<h4>$1</h4>");
    html = html.replace(/^### (.*)$/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.*)$/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.*)$/gm, "<h1>$1</h1>");

    html = html.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    html = html.replace(/__(.*?)__/g, "<b>$1</b>");

    html = html.replace(/\*(.*?)\*/g, "<i>$1</i>");
    html = html.replace(/_(.*?)_/g, "<i>$1</i>");

    html = html.replace(/`(.*?)`/g, "<code>$1</code>");

    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    html = html.replace(/^\s*-\s+(.*)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>");

    html = html.replace(/^(?!<(h\d|ul|li|pre|code|blockquote|a)).+$/gm, "<p>$&</p>");

    return html;
}

howToButton.addEventListener('click', async (e) => {
    if (imageArray[index]["label"]!= "") {
        e.preventDefault();
        howToButton.disabled = true

        
        let tempImage = imageArray[index]['image']
        let tempCanvas = document.createElement("canvas");
        tempCanvas.width = tempImage.width;
        tempCanvas.height = tempImage.height;
        let ctx = tempCanvas.getContext("2d");
        let imageData = ctx.createImageData(tempImage.width, tempImage.height);
        tempImage.loadPixels()

        let imgBitmap = await createImageBitmap(tempImage.canvas || tempImage.elt);

        imageData.data.set(tempImage.pixels);
        ctx.drawImage(imgBitmap, 0, 0);

        convertedImage = tempCanvas.toDataURL("image/png").split(",")[1]

        inputAI = "You are UrbanEye, an AI model integrated into a website that allows users to recognize neighbourhood issues and add or lose score on their neighbourhood based on how much of a good condition their neighbourhood is at using images. You will be provided an image along with the recognized class and the score subtracted. mention how the user can help contribute to improving it. Mention how to solve the issue based on context clues in the image. Even provide on how the user can help authorities who arrive to fix the issue.DO NOT MENTION ABOUT ANYTHING BEFORE THIS SENTENCE."
        inputAI += "The Recognized Class is " + imageArray[index]["label"]
        inputAI += " The score subtracted is " + imageArray[index]['score']
        responseLoader.hidden = false
        try {
            
            responseArea.innerHTML = "Generating...."
            const response = await fetch("https://urbaneye-backend-nic.vercel.app/api/server", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image: convertedImage,
                    mineType: 'image/png',
                    prompt: inputAI
                })
            })

            const data = await response.json();
            console.log(data)
            imageArray[index]["howTo"] = data.text

            refreshResponseArea()
            
        } catch (error) {
            responseArea.innerHTML = "Unable To Generate"
            console.error(error)
        }

        howToButton.disabled = false
    }
    responseLoader.hidden = true
})


let useFrontCamera = false;

window.mobileAndTabletCheck = function() { // mobile device check. Credit to https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    if (check) {
        console.log("User is on a Mobile Device")
    } else {
        console.log("User is on a Desktop")
    }

    return check;
};

let totalScore = 0;
let fileInput;
let index = 0;
let classifier; //Variable for Model Classifier
let modelURL = "https://teachablemachine.withgoogle.com/models/kvz9cozfO/" //Techable Machine Model URL



function toggleCamera() { //Called when the 'Toggle Camera' checkbox is toggled
    cameraEnabled = checkbox.checked;
    videoCanvas.toggleAttribute('hidden');
    button.toggleAttribute('disabled');
    flipButton.toggleAttribute('disabled')
}

function videoP(p) { //Function to make a seperate Canvas for webcam
    p.setup = function() {
        p.createCanvas(400, 400);
    }

    p.draw = function() {
        if (cameraEnabled && video) {
            scaleFactor = 400/video.height
            newWidth = video.width*scaleFactor
            p.image(video, 0,0, newWidth,400,newWidth/2-200, 0); //draw webcam to canvas
        }
    }
}

function moveIndex(change) { //function to move the image index by a number
    if (imageArray.length == 0) return;// if the dictionary of images is empty, stop function
    index = (index + change + imageArray.length) % imageArray.length;    //Increase or Decrease index and clamp the index only to the extents of the dictionary
    indexElement.innerHTML = "Photo Number: " +(index+1); //Update Element
    console.log(!imageArray[index]['label'] == "" && imageArray[index]['score'] > 0)
    howToButton.disabled = !imageArray[index]['label'] == "" && imageArray[index]['score'] > 0
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

function flipCamera() {
    useFrontCamera = !useFrontCamera
    setupCamera()
}

function setupCamera() {
    if (video) {
        video.remove(); // remove existing capture
    }

    constraints = {
        video: {
            facingMode: useFrontCamera ? 'user' : 'environment'
        },
        audio: false
    }

    video = createCapture(constraints);
    video.hide();
}

function setup() {
    useFrontCamera = !window.mobileAndTabletCheck();
    if (!window.mobileAndTabletCheck()) {
        flipButton.hidden = true
    }

    setupCamera()

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
        howToButton.disabled = true
    }
    addScore()
}

function addToArray(image) {    //Function to add 'image' to the imageArray
    if (image instanceof p5.Image) {
        
        imageArray.push({ //Adds a dictionary containing the image, a blank label, and a score of zero, which will be modified during analysis
            "image": image,
            "label": "",
            "score": 0,
            "howTo": ""
        });
        index = imageArray.length - 1; //Set index to last index (newly added image)
        if (imageArray.length>0) { //If the imageArray is not empty, enable and hide specific elements
            hidden = true
            analyzeButton.disabled = false
            removeButton.disabled = false;
        }
    }
}

function addScore() {
    totalScore = 0

        for (let i=0; i<imageArray.length; i++) {
            totalScore += imageArray[i]["score"] 
        }

        totalScoreElement.innerHTML = "Total Score: " + totalScore //Add all points
}

function take() { //Function to take a picture from webcam
    if (cameraEnabled && video) { //If camera is enabled and video capture exists
        let img = video.get(); //Take the image from the current fram of Camera
        img.resize(0,400)
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
    howToButton.disabled = !imageArray[index]['label'] == "" && imageArray[index]['score'] > 0
    try { 
        imageArray[classificationIndex]["score"] = scoreReference[results[0].label] //Modify the score to the respective points
    } catch (error) {
        console.error(error)
    }

    imageArray[classificationIndex]["results"] = results

    if (classificationIndex+1<imageArray.length) { //Check if the next index is still within the imageArray
        classificationIndex+=1 //Increase classification index
        classifier.classify(imageArray[classificationIndex]["image"], getResults) //Run classify() again with the next image
    } else {
        analyzeButton.disabled = false; // if not, enable button
        addScore()
    }

    console.log("Classification Finished! Updated imageArray")
    analyzeButton.innerHTML = "🔍 Analyze"
    classLoader.hidden = true
    console.log(imageArray)
}

function startClassify() {
    console.log("Started Classification...")
    classLoader.hidden = false
    analyzeButton.innerHTML = "Analyzing..."
    analyzeButton.disabled = true;
    
    if (imageArray.length>0) {
        classificationIndex = 0
        classifier.classify(imageArray[classificationIndex]["image"], getResults) //classify the first image
        analyzeButton.innerHTML = "Analyzing..."
    }

}
