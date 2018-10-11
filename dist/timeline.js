var timeline = (json_url) => {
  'use strict';

  const months = ['Aug', 'Sep', 'Okt', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun'];
  const colors = ['red', 'blue', 'green', 'purple'];

  const event_tpl = '<div class="event #eclasses#">' +
    '<svg height="18"  width="18" class="dot">' +
       '<circle cx="9" cy="9" r="5" />' +
    '</svg>' +
    '<div class="bar"></div>' +
    '<div class="info">' +
       '<h2>#title#</h2>' +
       '<h4>#info#</h4>' +
    '</div>' +
  '</div>';

  const month_tpl = '<div class="month #mclasses#"><p>#month#</p>#event#</div>';

  var applyTimelines = (data) => {
    let targets = document.querySelectorAll('timeline');
    targets.forEach((t) => {
      let name = t.getAttribute('for');
      let project = data.find(p => p.Projekt == name);
      render(project, t);
    });
  }

  var createFragment = (htmlStr) => {
    let frag = document.createDocumentFragment();
    let temp = document.createElement('div');

    temp.innerHTML = htmlStr;
    while(temp.firstChild) {
      frag.appendChild(temp.firstChild);
    }
    return frag;
  }

  var render = (data, target) => {

    let now = (new Date()).getMonth() - 7;
    if (now < 0) now += 12;

    let isHigh = true;
    let shuffcol = colors.sort(() => Math.random() - 0.5);

    let month_html = '';

    months.forEach((m, i) => {
      let tpl = month_tpl.replace('#month#', m);
      let etpl = '';
      if (data.m[m]) {
        isHigh = !isHigh;
        let edata = data.m[m];
        etpl = event_tpl.replace('#title#',edata.name).replace('#info#', edata.note);
      }
      tpl = tpl.replace('#event#', etpl);
      let mclasses = '';
      if (i < now) {
        tpl = tpl.replace('#mclasses#', 'past');
      } else if (i == now) {
        tpl = tpl.replace('#mclasses#', 'past today');
      } else {
        tpl = tpl.replace('#mclasses#', '');
      }

      let col = shuffcol[i % shuffcol.length];

      if (isHigh) {
        tpl = tpl.replace('#eclasses#', 'high '+col);
      } else {
        tpl = tpl.replace('#eclasses#', col);
      }
      month_html += tpl;
    });

    let $timeline = createFragment('<div class="timeline">'+month_html+'</div>');

    target.before($timeline);
    target.remove();
  }

  fetch(json_url)
    .then(resp => resp.json())
    .then(data => applyTimelines(data));
}
