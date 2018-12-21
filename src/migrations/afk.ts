import { Converter } from './abstract'

/**
 * From: http://blockheadsfans.com/messagebot/extension/Bibliofile/afk
 * To: https://gitcdn.xyz/repo/Bibliofile/BHMB-AFKResponder/master/build/bundle.js
 */
export class AfkConverter implements Converter {
  id = 'bibliofile/afk'

  supports (key: string) {
    return key === 'afk_settings'
  }

  convert (_key: string, data: string): { key: string; data: string } {
    return { key: 'settings', data }
  }
}
