import { Converter } from './abstract'

/**
 * From: http://blockheadsfans.com/messagebot/extension/Bibliofile/biblio_censor
 * To: https://gitcdn.xyz/repo/Bibliofile/BHMB-Censor-List/master/build/bundle.js
 */
export class CensorConverter implements Converter {
  id = 'bibliofile/censoring'

  supports (key: string) {
    return key.startsWith('biblio_censor_')
  }

  convert (key: string, data: string): { key: string; data: string } {
    return { key: key.replace('biblio_censor_', ''), data }
  }
}
