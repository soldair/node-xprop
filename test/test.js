var test = require('tap')
var xh = require('../');

test("can get properties",function(t){
  xh.properties(function(err,props){
    t.ok(!err,'should not have error reading propeties');
    t.ok(props.length > 0,'should have properties') 
    t.end();
  })
  
});
