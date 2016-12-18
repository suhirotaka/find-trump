var fs = require('fs');
var client = require('cheerio-httpcli');

client.download
.on('ready', function(stream) {
  var matched = stream.type.match(/image\/(.+?)(;|$)/);
  if (!matched) {
    console.log('filetype mismatch: ' + stream.url.href);
    stream.pipe(fs.createWriteStream('/dev/null'));
    return;
  }
  var extension = matched[1];
  var fileName = stream.url.href.replace(/\//g, '-', 'g') + '.' + extension;
  stream.pipe(fs.createWriteStream('./imgs/trump/' + fileName));
  console.log('successfully downloaded ' + stream.url.href);
})
.on('error', function(err) {
  console.error('failed to download ' + err.url + ': ' + err.message);
})
.on('end', function() {
  console.log('downloads completed');
});

client.fetch('http://image.search.yahoo.co.jp/search', { p: 'donald trump' }, function(err, $, res) {
  $('.gridmodule img').each(function() {
    $(this).download();
  });
});
