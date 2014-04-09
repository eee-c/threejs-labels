threejs-labels
==============

Rudimentary label plugin for Three.js objects.

This was factored out of some work that I did a while back at:

 * http://japhr.blogspot.com/2013/03/well-intentioned-threejs-constructor.html
 * http://japhr.blogspot.com/2013/03/fun-with-threejs-camera-orientation.html

Usage information is in those blog posts, but, given a mesh `mars`, you can create a label with:

```javascript
new Label(mars, "Mars");
```

This may not work well with more recent versions of Three.js (was tested with r52).
