xprop
==========

shells out to xprop to get the properties of x windows


```js
 
var xprop = require('xprop')

// to fetch the resultion of your desktop
xprop({prop:'_NET_DESKTOP_GEOMETRY',root:1},function(err,properties){

  console.log(properties[0]);
  // prints something like
  // {key:'_NET_DESKTOP_GEOMETRY',value:'1920, 1080',type:'CARDINAL'}
})

// get all available property names
xprop.properties(function(err,data){
  //

//todo
nged on the desktop!
stream = xprop.spy()
stream.on('data',function(){
 console.log('something changed on the desktop')
})

``

depends
-------

on xprop being available and that you are running an X server`
