// crawl charactor images using Yahoo image search
// example: `node crawlCharactorImgs.js mako "Mako Mankanshoku"`

let fs = require('fs');
let client = require('cheerio-httpcli');
let crypto = require('crypto');

let argv = process.argv;
if (argv.length != 4) {
  console.log('exppected 2 arguments, given ' + process.argv.length);
  process.exit();
}
let variation = argv[2];
let searchQuery = argv[3];

client.download
.on('ready', function(stream) {
  let matched = stream.type.match(/image\/(.+?)(;|$)/);
  if (!matched) {
    console.log('filetype mismatch: ' + stream.url.href);
    stream.pipe(fs.createWriteStream('/dev/null'));
    return;
  }
  let extension = matched[1];
  let md5Hash = crypto.createHash('md5');
  md5Hash.update(stream.url.href, 'binary');
  let fileName = md5Hash.digest('hex');
  stream.pipe(fs.createWriteStream('./variations/' + variation + '/imgs/' + variation + '/' + fileName + '.' + extension));
  console.log('successfully downloaded ' + stream.url.href);
})
.on('error', function(err) {
  console.error('failed to download ' + err.url + ': ' + err.message);
})
.on('end', function() {
  console.log('downloads completed');
});

client.fetch('http://image.search.yahoo.co.jp/search', { p: searchQuery }, function(err, $, res) {
  $('.gridmodule img').each(function() {
    $(this).download();
  });
});
