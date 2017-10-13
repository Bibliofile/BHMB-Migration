(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@bhmb/bot')) :
	typeof define === 'function' && define.amd ? define(['@bhmb/bot'], factory) :
	(factory(global['@bhmb/bot']));
}(this, (function (bot) { 'use strict';

var message = "Extension launched!\r\n";

// message is a string, you can also load .css and .html files like this
bot.MessageBot.registerExtension('bibliofile/starter', function (ex) {
    ex.bot.send(message);
    let ui = ex.bot.getExports('ui');
    if (!ui)
        return;
    ui.notify('It works!');
});

})));
//# sourceMappingURL=bundle.js.map
