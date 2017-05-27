import { MessageBot } from 'blockheads-messagebot';

// message is a string, you can also load .css and .html files like this
import message = require('./message.txt');

MessageBot.registerExtension('bibliofile/starter', function(ex) {
    ex.bot.send(message);
});
