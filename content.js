function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
$(function() {
  const EXEC_PROB = 1 // 逆数が確率になる
  if (getRandInt(1, EXEC_PROB) == EXEC_PROB) {
    let $imgs = $('img:visible');
    if ($imgs.length == 0) {
      return;
    }
    let imgIndex = getRandInt(0, $imgs.length);
    let $targetImg = $($imgs[imgIndex]);
    $targetImg.attr({ src: 'http://blogs-images.forbes.com/robertwood/files/2016/02/Trump1.jpg?width=960' });
    $targetImg.click(function() {
      chrome.storage.local.get('score', function(response) {
        let oldScore = response.score ? parseInt(response.score) : 0;
        let newScore = (oldScore + 1);
        console.log(newScore);
        chrome.storage.local.set({ score: newScore }, function(response) {
          console.log('savedtostorage');
        });
      });
      return false;
    });
  }
});
