import { MessageBot } from '@bhmb/bot'
import { UIExtensionExports } from '@bhmb/ui'

// message is a string, you can also load .css and .html files like this
import message from './message.txt'

MessageBot.registerExtension('bibliofile/starter', function (ex) {
  ex.bot.send(message)

  const ui = ex.bot.getExports('ui') as UIExtensionExports | undefined
  if (!ui) return

  ui.notify('It works!')
})
