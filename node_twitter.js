var util   = require('util');
var https  = require('https');
var query        = require('querystring');
var Buffer       = require('buffer').Buffer;
//var spawn  = require('child_process').spawn;


var headers = {
  "User-Agent": 'rb_agent'
};

if (process.argv.length < 4 ) {
  console.log("Esegui il programma come: %s %s <username> <password>", process.argv[0], process.argv[1]);
  process.exit(1);
}
var user = process.argv[2];
var password = process.argv[3];
var postdata = query.stringify({'track': 'jquery,html5,symfony2'});

headers["Authorization"] = "Basic " + new Buffer(user + ":" + password).toString('base64');
headers['Content-Type'] = 'application/x-www-form-urlencoded';
headers['Content-Length'] = postdata.length;

var requestOptions = {
  host:    "stream.twitter.com",
  port:    443,
  path:    "/1/statuses/filter.json",
  method:  'POST',
  headers: headers
};





request = https.request(requestOptions, function(response) {
  response.on('data', function(chunk){
    //console.log("DATA: %s",chunk.toString('utf8'));
    var json = chunk.toString('utf8');
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
  });

  response.on('end', function() {
    console.log("END");
  });
});

request.write(postdata);
request.end();

request.on('error', function(e) {
  console.error(e);
});




/*
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
*/
