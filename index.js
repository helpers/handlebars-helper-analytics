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
 *      id:       xxxxxx
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


    if (placement === 'head' && account.length) {
      script = [
        '<script>',
        '  var _gaq = _gaq || [];',
        '  _gaq.push(["_setAccount", "' + account + '"]);',
        '  _gaq.push(["_trackPageview"]);',
        '  (function() {',
        '    var ga = document.createElement("script"); ga.async = true;',
        '    ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";',
        '    var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ga, s);',
        '  })();',
        '</script>'
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
