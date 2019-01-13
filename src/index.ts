import { MessageBot } from '@bhmb/bot'
import { UIExtensionExports } from '@bhmb/ui'

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

  const ul = tab.querySelector('ul')!

  tab.querySelector('button')!.addEventListener('click', () => {
    const warnings = migrate({
      remove: tab.querySelector<HTMLInputElement>('[data-for=remove]')!.checked,
      overwrite: tab.querySelector<HTMLInputElement>('[data-for=overwrite]')!.checked
    })

    while (ul.firstChild) ul.removeChild(ul.firstChild)

    for (const warning of warnings) {
      const li = ul.appendChild(document.createElement('li'))
      li.textContent = warning
    }
  })
})
