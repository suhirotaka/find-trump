$(function() {
  let startGame = function() {
    let $imgs = $('img:visible');
    if ($imgs.length == 0) {
      return;
    }
    let imgIndex = getRandInt(0, $imgs.length);
    let $targetImg = $($imgs[imgIndex]);
    let origImgSrc = $targetImg.attr('src');
    $targetImg.attr({ src:  chrome.extension.getURL('imgs/charactor/' + CHARACTOR_IMGS[getRandInt(0, CHARACTOR_IMGS.length - 1)]) });

    $('<div id="find-trump-popup">test</div>').appendTo('body');

    let alreadyClicked = false;
    $targetImg.click(function(event) {
      if (alreadyClicked) {
        return true;
      }
      alreadyClicked = true;
      chrome.storage.sync.get('score', function(response) {
        let oldScore = response.score ? parseInt(response.score) : 0;
        let newScore = (oldScore + 1);
        chrome.storage.sync.set({ score: newScore }, function(response) {
        });
        $hitPopup = $('#find-trump-popup');
        $hitPopup.html(chrome.i18n.getMessage('popup_found') + '<br />' + chrome.i18n.getMessage('popup_score') + ': ' + newScore);
        let popupWidthMatched = $hitPopup.css('width').match(/[0-9]+/);
        let popupWidth = popupWidthMatched ? popupWidthMatched[0] : 0;
        let popupHeightMatched = $hitPopup.css('height').match(/[0-9]+/);
        let popupHeight = popupHeightMatched ? popupHeightMatched[0] : 0;
        $hitPopup.css('left', Math.max(0, event.pageX - popupWidth / 2));
        $hitPopup.css('top', Math.max(0, event.pageY - popupHeight - 10)); // :after擬似要素のmarginをハードコーディング
        $hitPopup.fadeIn('slow');
        $targetImg.attr({ src: origImgSrc });
        $hitPopup.delay(1500).queue(function() {
          $(this).fadeOut('slow').dequeue();
        });
      });
      return false;
    });
  }

  chrome.storage.sync.get('prob', function(response) {
    let execProb = 10; // 逆数が確率になる
    if (response.prob) {
      if (response.prob == 'none') {
        return;
      }
      execProb = parseInt(response.prob);
    }
    if (getRandInt(1, execProb) == execProb) {
      startGame();
    }
  });
});
