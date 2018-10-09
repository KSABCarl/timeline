function renderTimeline(project, target) {
   'use strict';
   const months = ['Aug', 'Sep', 'Okt', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun'];
   const colors = ['red', 'blue', 'green', 'purple'];

   const event_tpl = '<div class="event">' +
      '<svg height="18"  width="18" class="dot">' +
         '<circle cx="9" cy="9" r="5" />' +
      '</svg>' +
      '<div class="bar"></div>' +
      '<div class="info">' +
         '<h2>#title#</h2>' +
         '<h4>#info#</h4>' +
      '</div>' +
   '</div>';

   const month_tpl = '<div class="month"><p>#month#</p>#event#</div>';

   function render(data, target) {
      var $timeline = jQuery('<div class="timeline"></div>');
      
      var now = (new Date()).getMonth() -7;
      if (now < 0) now += 12;
      
      var isHigh = false;
      var shuffcol = colors.sort(() => Math.random() - 0.5);
      
      months.forEach(function(m, i) {
         var tpl = month_tpl.replace('#month#', m);
         var etpl = '';
         if (data.m[m]) {
            isHigh = !isHigh;
            var edata = data.m[m];
            etpl = event_tpl.replace('#title#',edata.name).replace('#info#', edata.note);
        }
        tpl = tpl.replace('#event#', etpl);
        var nextmonth = $(tpl);
        if (i <= now) {
            nextmonth.addClass('past');
        }
        if (i == now) {
            nextmonth.addClass('today');
        }
        if (isHigh) {
            nextmonth.find('.event').addClass('high');
        }
  
        var col = shuffcol[i % shuffcol.length];
        nextmonth.find('.event').addClass(col);
  
        $timeline.append(nextmonth);
      });
      
      jQuery(target).append($timeline);
      
   }
   fetch('https://docs.google.com/document/d/1zcmqf4vlLzNTbaUSUxUkIfNVSMm3NMoKYkB5vSRIHcs/export?format=txt')
      .then(resp => resp.json())
      .then(data => data.find(m => m.Projekt == project))
      .then(data => render(data, target));
}