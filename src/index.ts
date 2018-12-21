import { MessageBot } from '@bhmb/bot'
import { UIExtensionExports } from '@bhmb/ui'

// message is a string, you can also load .css and .html files like this
import html from './page.html'
import { migrate } from './migrate'

MessageBot.registerExtension('bibliofile/convert', function (ex) {
  const ui = ex.bot.getExports('ui') as UIExtensionExports | undefined
  if (!ui) {
    console.log('This extension requires a browser.')
    return
  }

  const tab = ui.addTab('Config Migration')
  tab.innerHTML = html

  tab.querySelector('button')!.addEventListener('click', () => {
    migrate({
      remove: tab.querySelector<HTMLInputElement>('[data-for=remove]')!.checked,
      overwrite: tab.querySelector<HTMLInputElement>('[data-for=overwrite]')!.checked
    })
  })
})
