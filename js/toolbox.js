// last updated: 2023 8 9

function createElement(type, props) {
  const element = document.createElement(type);

  props = props || {};
  for (let property in props) {
    if (property in element) element[property] = props[property];
  }

  if (props.parent) props.parent.appendChild(element);
  return element;
}

function createTemplateCopy(template, props) {
  let div = document.createElement("div");
  let clone = template.content.cloneNode(true);
  div.appendChild(clone);

  for (let prop in props) {
    div.querySelector("[name='"+prop+"']").textContent = props[prop];
  }

  return div;
}

function getFormattedTime(milliseconds) {
  var seconds = milliseconds / 1000;
  var minutes = seconds / 60;

  // var ms = Math.floor(milliseconds % 1000 / 100);
  var sec = Math.floor(seconds % 60);
  var min = Math.floor(minutes % 60);
  var hour = Math.floor(minutes / 60);

  var time = "";
  if (hour >= 1) time += hour+":";
  time += min < 10 ? "0"+min : min;
  time += ":";
  time += sec < 10 ? "0"+sec : sec;
  // time += ".";
  // time += ms;

  return time;
}

function random(v1, v2) {
  if (v2 != null) {
    return Math.random() * (v2-v1) + v1
  } else {
    return Math.random() * (v1 || 1)
  }
}

function lerp(a, b, t) {
  return a * (1-t) + b * t;
}

function clamp(x, lowerlimit, upperlimit) {
  lowerlimit = lowerlimit || 0;
  upperlimit = upperlimit || 1;

  if (x < lowerlimit) return lowerlimit;
  if (x > upperlimit) return upperlimit;
  return x;
}

function smoothstep(x, edge0, edge1) {
  edge0 = edge0 || 0;
  edge1 = edge1 || 1;

  x = clamp((x - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
}

function smootherstep(x, edge0, edge1) {
  edge0 = edge0 || 0;
  edge1 = edge1 || 1;
  x = clamp((x - edge0) / (edge1 - edge0));
  return x * x * x * (3 * x * (2 * x - 5) + 10);
}

class Rect {
  constructor(x, y, w, h) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = w || 0;
    this.height = h || 0;
  }

  aabb(rect) {
    if (
      this.x <= rect.x + rect.width &&
      this.x + this.width >= rect.x &&
      this.y <= rect.y + rect.height &&
      this.y + this.height >= rect.y
    ) {
      return true;
    }
    return false;
  }

  pointCollides(vec) {
    if (
      vec.x <= this.x + this.width &&
      vec.x >= this.x &&
      vec.y <= this.y + this.height &&
      vec.y >= this.y
    ) {
      return true;
    }
    return false;
  }
}

class Vector2 {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  add(vec2) {
    return new Vector2(
      this.x + vec2.x,
      this.y + vec2.y
    );
  }

  sub(vec2) {
    return new Vector2(
      this.x - vec2.x,
      this.y - vec2.y
    );
  }

  mul(value) {
    return new Vector2(
      this.x * value,
      this.y * value
    )
  }

  div(value) {
    return new Vector2(
      this.x / value,
      this.y / value
    );
  }

  sqrMagnitude() {
    return this.x * this.x + this.y * this.y
  }

  magnitude() {
    return Math.sqrt(this.sqrMagnitude());
  }

  distance(vec2) {
    return this.sub(vec2).magnitude();
  }

  sqrDistance(vec2) {
    return this.sub(vec2).sqrMagnitude();
  }

  normalized() {
    var magnitude = this.magnitude();
    return new Vector2(
      this.x / magnitude,
      this.y / magnitude
    );
  }

  angle() {
    return 360 - (Math.atan2(this.x, this.y) * Rad2Deg * Math.sign(this.x));
  }

  copy() {
    return new Vector2(this.x, this.y);
  }
}

const Rad2Deg = 180 / Math.PI;
const Deg2Rad = Math.PI / 180;
