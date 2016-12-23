$(function() {
  const TRUMP_IMGS = [
    "185800a0a3a923b9fe1bda08be8a7c4c.jpeg",
    "89a96eebe4db829a629b2b43cc87240a.jpeg",
    //"20bd5ca64d24b1f7fa927d7288846cc2.jpeg",
    "970e0d21ec5f51b75477809139739195.jpeg",
    "2ea8a860c7c890c3c66198d03ee8766a.jpeg",
    "3c428ad02d3a2775ba0cca4762cc4375.jpeg",
    "a89d5b788cf0464e232d5a399d134cd4.jpeg",
    "40aeac1c0d8328b0317934255d4737f4.jpeg",
    "b089e2ec2a2db58d88ed952d57aa3886.jpeg",
    "4c0e057edcc1695a45621d0234f66fb9.jpeg",
    "b1c26f697f48721b0aaf65c9f35c22eb.jpeg",
    "4c42540a0bacc75153a4f4cde5625118.jpeg",
    "b2d30cec2259a5486c3181b9f19af563.jpeg",
    "54b63598d6fbabe774ec3f8096f2d7d7.jpeg",
    //"c734079fba19cb88ef0798f42d6e74f6.jpeg",
    //"55e6d1c0f7bdc1ac790bf4feb3d5a0c2.jpeg",
    "cba90447f7946a9750aa6f76f1a43189.jpeg",
    "56bda20da871dda7c61d371ae7d32578.jpeg",
    //"cffa7a2c80536f8629bc91a58aaea101.jpeg",
    //"6176960a865596841accf6c48df23281.jpeg",
    //"d903d2d2cbca886ed8fe029ad1dfeca4.jpeg",
    //"65804ed505393356ac11937a4777552d.jpeg",
    "e3046fb1f001cdfe15183c8ebb8bd51d.jpeg",
    "81354b9e9bd62117d30f1700dd12eb6c.jpeg",
    "e4d3fe6ab91a1b8858642e73010822d7.jpeg"
  ];

  let startGame = function() {
    let $imgs = $('img:visible');
    if ($imgs.length == 0) {
      return;
    }
    let imgIndex = getRandInt(0, $imgs.length);
    let $targetImg = $($imgs[imgIndex]);
    let origImgSrc = $targetImg.attr('src');
    $targetImg.attr({ src:  chrome.extension.getURL('imgs/trump/' + TRUMP_IMGS[getRandInt(0, TRUMP_IMGS.length - 1)]) });

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
