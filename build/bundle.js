(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@bhmb/bot')) :
  typeof define === 'function' && define.amd ? define(['@bhmb/bot'], factory) :
  (global = global || self, factory(global['@bhmb/bot']));
}(this, function (bot) { 'use strict';

  var message = "Extension launched!\n";

  bot.MessageBot.registerExtension('bibliofile/starter', function (ex) {
      ex.bot.send(message);
      const ui = ex.bot.getExports('ui');
      if (!ui)
          return;
      ui.notify('It works!');
  });

}));
//# sourceMappingURL=bundle.js.map
