const webcam = document.querySelector("video");
// var webcam;
const enableButton = document.querySelector("button");

enableButton.onclick = async function() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  webcam.srcObject = stream;
  await webcam.play();

  onWebcamEnabled();

  updateLandmarks();

  await initFaceDetection();
}

async function updateLandmarks() {
  if (webcam.paused || webcam.ended || !isFaceDetectionModelLoaded())
    return setTimeout(updateLandmarks);

  const options = getFaceDetectorOptions();
  const results = await faceapi.detectAllFaces(webcam, options);

  document.body.classList.remove("face-detected");
  if (results.length > 0) {
    document.body.classList.add("face-detected");
  }

  setTimeout(updateLandmarks);
}

// face functions

async function initFaceDetection() {
  await faceapi.loadFaceLandmarkModel("js/weights/")

  // load face detection and face landmark models
  if (!isFaceDetectionModelLoaded()) {
    await faceapi.nets.ssdMobilenetv1.load("js/weights/")
  }
}

function isFaceDetectionModelLoaded() {
  return !!faceapi.nets.ssdMobilenetv1.params
}

function getFaceDetectorOptions() {
  return new faceapi.SsdMobilenetv1Options({
    minConfidence: .8
  });
}
