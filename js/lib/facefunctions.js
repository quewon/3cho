async function initFaceDetection() {
  // load face detection and face landmark models
  if (!isFaceDetectionModelLoaded()) {
    await faceapi.nets.ssdMobilenetv1.load("js/lib/weights/")
  }

  await faceapi.loadFaceLandmarkModel("js/lib/weights/")
}

function isFaceDetectionModelLoaded() {
  return !!faceapi.nets.ssdMobilenetv1.params
}

function getFaceDetectorOptions() {
  // return new faceapi.TinyFaceDetectorOptions({
  //   inputSize: 512,
  //   scoreThreshold: .5
  // });
  return new faceapi.SsdMobilenetv1Options({
    minConfidence: .8
  });
}

function fillPoints(points) {
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  for (let i=1; i<points.length; i++) {
    context.lineTo(points[i].x, points[i].y)
  }
  context.lineTo(points[0].x, points[0].y);
  context.fill();
}

function centerOfPoints(points) {
  var center = { x:0, y:0 };

  for (point of points) {
    center.x += point.x;
    center.y += point.y;
  }

  center.x /= points.length;
  center.y /= points.length;

  return center;
}

function scalePoints(points, scaleX, scaleY) {
  scaleY = scaleY || scaleX;

  var center = centerOfPoints(points);

  var newPoints = [];

  for (let point of points) {
    newPoints.push({
      x: center.x + scaleX * (point.x - center.x),
      y: center.y + scaleY * (point.y - center.y)
    });
  }

  return newPoints;
}

function drawContour(ctx, points, isClosed) {
    if (isClosed === void 0) { isClosed = false; }
    ctx.beginPath();
    points.slice(1).forEach(function (_a, prevIdx) {
        var x = _a.x, y = _a.y;
        var from = points[prevIdx];
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(x, y);
    });
    if (isClosed) {
        var from = points[points.length - 1];
        var to = points[0];
        if (!from || !to) {
            return;
        }
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
    }
    ctx.stroke();
}

function pointsSize(points) {
  var min = { x:Infinity, y:Infinity };
  var max = { x:0, y:0 };
  for (let point of points) {
    if (point.x < min.x) min.x = point.x;
    if (point.y < min.y) min.y = point.y;
    if (point.x > max.x) max.x = point.x;
    if (point.y > max.y) max.y = point.y;
  }

  return {
    min: min,
    max: max,
    width: max.x - min.x,
    height: max.y - min.y
  }
}
