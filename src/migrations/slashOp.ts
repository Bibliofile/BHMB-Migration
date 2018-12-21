import { Converter } from './abstract'

/**
 * From: http://blockheadsfans.com/messagebot/extension/Bibliofile/biblio_op
 * => biblio_op_messages - { name: string, message: string, timestamp: string }[]
 * To: https://gitcdn.xyz/repo/Bibliofile/BHMB-Slash-OP/master/build/bundle.js
 * => messages - { name: string, message: string, timestamp: number }[]
 */
export class SlashOpConverter implements Converter {
  id = 'bibliofile/censoring'

  supports (key: string) {
    return key === 'biblio_op_messages'
  }

  convert (_key: string, data: string): { key: string; data: string } {
    const parsed = JSON.parse(data) as { name: string, message: string, timestamp: string }[]
    return {
      key: 'messages',
      data: JSON.stringify(parsed.map(e => {
        return {
          ...e,
          timestamp: +e.timestamp
        }
      }))
    }
  }
}
