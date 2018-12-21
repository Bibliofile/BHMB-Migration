import { Converter } from './abstract'

/**
 * From: http://blockheadsfans.com/messagebot/extension/Bibliofile/warnings
 * => warnings_log - string[]
 * => warnings_warns - { [k: string]: number }
 * => warnings_settings - {
 *       'threshold-ban': 5,
 *       'warn-kick': true,
 *       'response-warn': string
 *       'response-warn-ban': '{{Name}} has been banned after multiple warnings.',
 *       'response-warnlevel': 'Warnings for {{Name}}: {{amount}}',
 *       'response-set-warnings': '{{Name}} set {{Target}}\'s warnings to {{amount}}.',
 *       'response-unwarn': 'Warning removed from {{Name}}, {{Name}} now has {{left}} warnings.'
 *   }
 * To: https://gitcdn.xyz/repo/Bibliofile/BHMB-Warnings/master/build/bundle.js
 * => warns - { [k: string]: number }
 * => log - string[]
 * => settings - {
 *       'threshold-ban': number,
 *       'warn-kick': true,
 *       'response-warn': string
 *       'response-warn-ban': '{{Name}} has been banned after multiple warnings.',
 *       'response-warnlevel': 'Warnings for {{Name}}: {{amount}}',
 *       'response-set-warnings': '{{Name}} set {{Target}}\'s warnings to {{amount}}.',
 *       'response-unwarn': 'Warning removed from {{Name}}, {{Name}} now has {{left}} warnings.'
 *   }
 */
export class WarningConverter implements Converter {
  id = 'bibliofile/tempban'

  supports (key: string) {
    return key.startsWith('warnings_')
  }

  convert (key: string, data: string): { key: string; data: string } {
    return { key: key.replace('warnings_', ''), data }
  }
}
