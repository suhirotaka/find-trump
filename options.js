$(function() {
  $('#options-title').text(chrome.i18n.getMessage('option_prob') + ': ');
  chrome.storage.local.get('prob', function(response) {
    let prob = response.prob ? response.prob : 10;
    $('#select-prob').val(prob);
  });
  $('#select-prob').change(function() {
    let newProb = $('#select-prob').find(':selected').val();
    chrome.storage.local.set({ prob: newProb }, function(response) {
      console.log('savedtostorage prob');
    });
  });
});
