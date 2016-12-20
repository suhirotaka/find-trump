$(function() {
  $('#popup-desc').text(chrome.i18n.getMessage('popup_desc'))
  $('#link-to-option').text(chrome.i18n.getMessage('link_to_option'))
  $('#link-to-option').click(function() {
    chrome.runtime.openOptionsPage();
  });
  chrome.storage.sync.get('score', function(response) {
    $('#your-score').text(chrome.i18n.getMessage('popup_score') + ': ' + response.score);
  });

  let tableRows = $('table tr');
  let randScores = [];
  for (let i = 0; i < tableRows.length; i++) {
    randScores.push(getRandInt(100, 1000));
  }
  randScores = randScores.sort(function(a, b) {
    return b - a;
  });
  $.each(tableRows, function(i, tableRow) {
    let tableCols = $(tableRow).find('td');
    if (tableCols.length > 0) { // skip tr tag
      $(tableCols[0]).text(faker.name.findName());
      $(tableCols[1]).text(randScores[i]);
    }
  });
});
