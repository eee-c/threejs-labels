var LabelPlugin = {
  labels: [],
  init: function() {},
  add: function(l) {this.labels.push(l);},
  remove: function(l) {
   this.labels = this.labels.filter(function (label) {
     return label != l;
   });
  },
  render: function() {
    for (var i=0; i<this.labels.length; i++) {
      var args = Array.prototype.slice.call(arguments);
      this.labels[i].render.apply(this.labels[i], args);
    }
  }
};

var OriginalWebGLRenderer = THREE.WebGLRenderer;
THREE.WebGLRenderer = function(parameters) {
   var orig = new OriginalWebGLRenderer(parameters);
   orig.addPostPlugin(LabelPlugin);
   return orig;
};

var OriginalCanvasRenderer = THREE.CanvasRenderer;
THREE.CanvasRenderer = function(parameters) {
   var orig = new OriginalCanvasRenderer(parameters);
   orig.addPostPlugin(LabelPlugin);
   return orig;
};

function Label(object, content, duration) {
//     probably need to add options object here
  this.object = object;
  if (duration) this.remove(duration);

  this.el = this.buildElement();
  LabelPlugin.add(this);
}

Label.prototype.buildElement = function() {
  var el = document.createElement('div');
  el.classList.add("label3D");
  if(typeof this.content == "string"){
    el.textContent = this.content;
    }  else {
    var inp = document.createElement('input')
    inp.setAttribute("type","text")
    inp.setAttribute("value","enter your message")
    el.appendChild(inp);
    inp.focus();        
    }
  
  document.body.appendChild(el);
  return el;
};

Label.prototype.render = function(scene, cam) {
  if (this.object instanceof THREE.Vector3){
    p3d=this.object.clone()
  }
  else{
    var p3d = this.object.position.clone();
    p3d.z = p3d.z + this.object.geometry.boundingSphere.radius * Math.sin(cam.rotation.x);
    p3d.y = p3d.y + this.object.geometry.boundingSphere.radius * Math.cos(cam.rotation.x) * Math.cos(cam.rotation.z);
    p3d.x = p3d.x - this.object.geometry.boundingSphere.radius * Math.sin(cam.rotation.z) * Math.sin(cam.rotation.y);
  }

  var projector = new THREE.Projector(),
      pos = projector.projectVector(p3d, cam),
      width = window.innerWidth,
      height = window.innerHeight,
      w = this.el.offsetWidth,
      h = this.el.offsetHeight;
  this.el.style.top = '' + (height/2 - height/2 * pos.y - h - 10) + 'px';
  this.el.style.left = '' + (width/2 * pos.x + width/2 - w/2) + 'px';
};

Label.prototype.setContent = function(content) {
  this.content = content;
  this.el.textContent = this.content;
};

Label.prototype.remove = function(delay) {
  var that = this;
  if (delay) return setTimeout(function(){that.remove();}, delay * 1000);
  this.el.style.display = 'none';
  return LabelPlugin.remove(this);
};
