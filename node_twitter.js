var util = require('util');
var spawn = require('child_process').spawn;
console.log("aa");
var tail_child = spawn('sh', ['stream.sh'], {'cwd':'/Users/rbutti/scripts/twitter_streaming'});
var response = "";
console.log('Spawned child pid: ' + tail_child.pid);
//var tail_child = spawn('curl', ['-d',  '"track=test"', 'https://stream.twitter.com/1/statuses/filter.json', '-uDeveloperH:padella999']);
console.log("aa");
tail_child.stdout.setEncoding("utf8");
tail_child.stdout.on('data', function(data) {
  response += data.toString('utf8');
  var index, json;
  while((index = response.indexOf('\r\n')) > -1) {
    console.log(".");
    json = response.slice(0, index);
    response = response.slice(index + 2);
    if(json.length > 0) {
        try {
          var j = JSON.parse(json);
          console.log(j.text);
            //self.emit('tweet', JSON.parse(json));
        } catch(e) {
          console.log("ERRORE:"+e);
            //self.emit('error', e);
        }
    }
  }
  //console.dir("**************\n"+json+"************\n");
});


tail_child.stderr.on('data', function (data) {
});
tail_child.on('exit', function (code) {
  if (code !== 0) {
    console.log('process exited with code ' + code);
  }
});
console.log('Spawned child pid: ' + tail_child.pid);
