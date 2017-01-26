$(function() {
  document.title = chrome.i18n.getMessage('extName') + ' Options Page';
  $('#header-title').text(chrome.i18n.getMessage('extName') + ' Options Page');
  $('#options-title').text(chrome.i18n.getMessage('option_prob') + ': ');
  chrome.storage.sync.get('prob', function(response) {
    let prob = response.prob ? response.prob : 10;
    $('#select-prob').val(prob);
  });
  $('#select-prob').change(function() {
    let newProb = $('#select-prob').find(':selected').val();
    chrome.storage.sync.set({ prob: newProb }, function(response) {
    });
  });
});
