import vision from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
const { FaceLandmarker, FilesetResolver } = vision;

let faceLandmarker;
let runningMode = "VIDEO";
let webcamRunning = false;
let lastVideoTime;
let results;

const webcam = document.querySelector("video");
const enableWebcamButton = document.querySelector("button");

createFaceLandmarker();

async function createFaceLandmarker() {
  enableWebcamButton.disabled = true;

  const filesetResolver = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
  );
  faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
      delegate: "GPU"
    },
    outputFaceBlendshapes: false,
    runningMode: "VIDEO",
    numFaces: 1,
  });

  enableWebcamButton.onclick = enableWebcam;
  enableWebcamButton.disabled = false;
}

function enableWebcam(event) {
  const constraints = {
    video: true
  };

  navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    webcam.srcObject = stream;
    webcam.addEventListener("loadeddata", function() {
      // predictWebcam();
      // webcam.requestVideoFrameCallback(frameProcessing);
      const frameProcessing = (now, metadata) => {
        predictWebcam();
        webcam.requestVideoFrameCallback(frameProcessing);
      }
      webcam.requestVideoFrameCallback(frameProcessing);
    });
  });

  onWebcamEnabled();
}

async function predictWebcam() {
  let startTimeMs = performance.now();
  if (lastVideoTime !== webcam.currentTime) {
    lastVideoTime = webcam.currentTime;
    results = faceLandmarker.detectForVideo(webcam, startTimeMs);
  }

  document.body.classList.remove("face-detected");
  if (results.faceLandmarks) {
    sendData(results.faceLandmarks.length);
    if (results.faceLandmarks.length > 0) document.body.classList.add("face-detected");
  }

  // window.requestAnimationFrame(predictWebcam);
}
