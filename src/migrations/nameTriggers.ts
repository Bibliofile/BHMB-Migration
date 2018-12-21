import { Converter } from './abstract'

/**
 * From: http://blockheadsfans.com/messagebot/extension/Bibliofile/biblio_name_triggers
 * => biblio_name_triggers_preferences - { exactMatch: boolean }
 * => biblio_name_triggers_messages - { message: string, trigger: string }[]
 * Drop the default message as it is generated in MB7
 * To: https://gitcdn.xyz/repo/Bibliofile/BHMB-NameTriggers/master/build/bundle.js
 * => preferences - { exactMatch: boolean }
 * => messages - { message: string, trigger: string }[]
 */
export class NameTriggerConverter implements Converter {
  id = 'bibliofile/name_triggers'

  supports (key: string) {
    return key.startsWith('biblio_name_triggers')
  }

  convert (key: string, data: string): { key: string; data: string } {
    return { key: key.replace('biblio_name_triggers_', ''), data }
  }
}
