interface OldPrefs {
  announcementDelay: number
  maxResponses: number
  notify: boolean
  disableTrim: boolean
  regexTriggers: boolean
  splitMessages: boolean
  splitToken: string
}

/**
 * Old: https://github.com/Blockheads-Messagebot/MessageBot/blob/efd7a665e3c77338497bbf6a9e13e00a197073d7/dev/settings/bot/index.js#L7
 * New: https://github.com/Blockheads-Messagebot/Browser-Loader/blob/master/src/settings.ts#L9
 */
export function settingsConverter ({ overwrite }: { overwrite: boolean }): [string[], string[]] {
  if (!overwrite) {
    return [['mb_preferences'], ['Global settings from V6 were not copied to all worlds.']]
  }

  const worldIds = new Set(Array.from({ length: localStorage.length })
    .map((_, i) => localStorage.key(i)!)
    .filter(key => /\d$/.test(key))
    .map(key => key.replace(/.*?(\d+)$/, '$1')))

  const prefs = JSON.parse(localStorage.getItem('mb_preferences') || '{}') as OldPrefs

  for (const id of worldIds) {
    localStorage.setItem(`/${id}/messages/announcementDelay`, prefs.announcementDelay.toString())
    localStorage.setItem(`/${id}/messages/maxResponses`, prefs.maxResponses.toString())

    localStorage.setItem(`/${id}/messages/regexTriggers`, JSON.stringify(prefs.regexTriggers))
    localStorage.setItem(`/${id}/messages/disableWhitespaceTrimming`, JSON.stringify(prefs.disableTrim))
    localStorage.setItem(`/${id}/splitMessages`, JSON.stringify(prefs.splitMessages))
    localStorage.setItem(`/${id}/splitToken`, JSON.stringify(prefs.splitToken))
  }

  return [['mb_preferences'], []]
}
