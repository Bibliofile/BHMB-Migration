import { Converter } from './abstract'

/**
 * From: http://blockheadsfans.com/messagebot/extension/Bibliofile/biblio_tempban
 * => biblio_tempban_preferences - { time: number, bans: { [k: string]: string } }
 * To: https://gitcdn.xyz/repo/Bibliofile/BHMB-TempBan/master/build/bundle.js
 * => config - { time: number, bans: { [k: string]: string } }
 */
export class TempbanConverter implements Converter {
  id = 'bibliofile/tempban'

  supports (key: string) {
    return key === 'biblio_tempban_preferences'
  }

  convert (_key: string, data: string): { key: string; data: string } {
    return { key: 'config', data }
  }
}
