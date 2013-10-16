var cp = require('child_process')

module.exports = function(options,cb){
  options = options||{};
  if(typeof options == 'string'){
    options = {
      prop:options
    }
  }
 
  var args = [];
  if(options.args) {
    args = options.args;
  } else {
    if(options.id) args.push('-id',options.id)
    else if(options.root) args.push('-root')

    if(options.prop) args.push(options.prop)
  }

  cp.exec('xprop '+args.join(' '),function(err,data,stderr){
    cb(err,data?parse(data.toString()):false,stderr)
  }); 
}

module.exports.properties = function(cb){
  module.exports({prop:'_NET_SUPPORTED',root:1},function(err,data){
    cb(err,data?data[0].value.split(','):false);
  });
}

module.exports._parse = parse;

function parse(str){
  var lines = Array.isArray(str)?str:str.split("\n");

  var out = [];
  var current;
  

  for(var i=0;i<lines.length;++i){
    if(lines[i].charAt(0) != ' '){
      // new key
      if(current) out.push(current);
      current = valueObj();

      var parts = lines[i].split(' = ');
      if(parts.length > 1){
        keyparts = parts[0].split('(');
        lines[i] = parts[1];
        current.key = keyparts[0];
        current.type = keyparts[1].substr(0,keyparts[1].length-1);
      }
    }
    if(!current) current = valueObj();
    if(current.value.length) current.value += "\n";
    current.value += lines[i].replace(/^        /,'');// remove multiline value padding at start of line
  }
  if(current && current.value.length) out.push(current);
  return out; 
}


function valueObj(){
 return {key:false,value:'',type:false};
}
