/*!
 * Google Analytics Handlebars Helper:
 *
 *   example:
 *     {{analytics site.google.analytics 'head'}}
 *     {{analytics site.google.analytics 'footer'}}
 *
 * If you use Assemble, this will automatically insert the
 * google analytics script using data from the context. e.g.
 *
 *  google:
 *    analytics:
 *      siteid:       xxxxxx
 *      account:  UA-XXXXXXXXXX-XX
 *      domain:   assemble.github.io
 *
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT)
 */

'use strict';

module.exports.register = function (Handlebars) {

  Handlebars.registerHelper('analytics', function (context, placement) {
    context = context || {};
    context.hash = context.hash || {};
    placement = placement || 'head';
    var script;

    var account = context.account || context.hash.account || '';
    var siteid = context.siteid || context.hash.siteid || '';
    var domain = context.domain || context.hash.domain || 'auto';


    if (placement === 'head' && account.length) {
      script = [
        '<script>                                                                         ',
      	'  (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){   ',
      	'  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), ',
      	'  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)',
      	'  })(window,document,"script","//www.google-analytics.com/analytics.js","ga");   ',
      	'                                                                                 ',
      	'  ga("create", "'+ account +'", "'+ domain +'");                                 ',
      	'  ga("send", "pageview");                                                        ',
      	'                                                                                 ',
      	'</script>                                                                        '
      ].join('\n');
    } else if (placement === 'footer' && siteid.length) {
      script = [
        '<script>',
        '  var _gauges = _gauges || [];',
        '  (function() {',
        '    var t   = document.createElement("script");',
        '    t.async = true;',
        '    t.id    = "gauges-tracker";',
        '    t.setAttribute("data-site-id", "' + siteid + '");',
        '    t.src = "//secure.gaug.es/track.js";',
        '    var s = document.getElementsByTagName("script")[0];',
        '    s.parentNode.insertBefore(t, s);',
        '  })();',
        '</script>'
      ].join('\n');
    } else {
      script = '';
    }

    return new Handlebars.SafeString(script);
  });
};
