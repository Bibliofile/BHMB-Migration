import { Converter, MaybeArray } from './abstract'

/**
 * From: http://blockheadsfans.com/messagebot/extension/Bibliofile/biblio_banks
 * => biblio_banks_accounts - { [k: string]: { balance: number, last_daily_award?: number }}
 * => biblio_banks_limit - number
 * => biblio_banks_bankers - string[]
 * => biblio_banks_currency - string
 * => biblio_banks_perms - {
 *       check: 'All',
 *       add: 'AdminBanker',
 *       silent: 'AdminBanker',
 *       daily: 'AdminBanker',
 *       lastdaily: 'AdminBanker',
 *       online: 'AdminBanker',
 *       remove: 'AdminBanker',
 *       banker: 'Admin'
 *     }
 * => biblio_banks_messages - {
 *       check: '{{Name}} currently has {{amount}} {{currency}}.',
 *       transfer: 'Transferred {{amount}} {{currency}} from {{From}} to {{To}}.',
 *       add: 'Added {{amount}} {{currency}} to {{Name}}.',
 *       online: 'Everyone online has recieved {{amount}} {{currency}}!',
 *       daily_yes: 'Added daily reward of {{currency}} to {{Name}}.',
 *       daily_no: '{{Name}} has already recieved their daily reward.',
 *       last_daily: '{{Name}} last recieved a daily award at {{time}}',
 *       remove: 'Removed {{amount}} {{currency}} from {{Name}}.',
 *       banker_yes: '{{Name}} has been added to the banker list.',
 *       banker_on_list_already: '{{Name}} was already on the banker list.',
 *       banker_no: '{{Name}} has been removed from the banker list.',
 *       banker_not_on_list: '{{Name}} was not on the banker list.',
 *       error_no_account: 'Error: unable to {{command}}, the specified account does not exist.',
 *       error_limit_reached: 'Error: {{Name}} can\'t have more {{currency}} added to their account.',
 *       error_funds: 'Error: {{Name}} does not have enough {{currency}} to transfer funds.'
 *     }
 * => biblio_banks_migration - number
 * To: https://gitcdn.xyz/repo/Bibliofile/BHMB-NameTriggers/master/build/bundle.js
 * => name - string = Server Coin
 * => accounts - { [k: string]: { balance: number, last_daily_award?: number }}
 * => permissions - {
 *       check: 'All',
 *       add: 'AdminBanker',
 *       silent: 'AdminBanker',
 *       daily: 'AdminBanker',
 *       lastdaily: 'AdminBanker',
 *       online: 'AdminBanker',
 *       remove: 'AdminBanker',
 *       banker: 'Admin',
 *     }
 * => messages - {
 *       check: '{{Name}} currently has {{amount}} {{currency}}.',
 *       transfer: 'Transferred {{amount}} {{currency}} from {{From}} to {{To}}.',
 *       add: 'Added {{amount}} {{currency}} to {{Name}}.',
 *       online: 'Everyone online has received {{amount}} {{currency}}!',
 *       daily_yes: 'Added daily reward of {{currency}} to {{Name}}.',
 *       daily_no: '{{Name}} has already received their daily reward.',
 *       last_daily: '{{Name}} last received a daily award at {{time}}',
 *       remove: 'Removed {{amount}} {{currency}} from {{Name}}.',
 *       banker_yes: '{{Name}} has been added to the banker list.',
 *       banker_on_list_already: '{{Name}} was already on the banker list.',
 *       banker_no: '{{Name}} has been removed from the banker list.',
 *       banker_not_on_list: '{{Name}} was not on the banker list.',
 *       error_no_account: 'Error: unable to {{command}}, the specified account does not exist.',
 *       error_limit_reached: 'Error: {{Name}} can\'t have more {{currency}} added to their account.',
 *       error_funds: 'Error: {{Name}} does not have enough {{currency}} to transfer funds.',
 *     }
 * => bankers - string[]
 */
export class BankingConverter implements Converter {
  id = 'bibliofile/banking'

  supports (key: string) {
    return key.startsWith('biblio_banks_')
  }

  convert (key: string, data: string): MaybeArray<{ key: string; data: string }> {
    switch (key) {
      case 'biblio_banks_accounts': // Data has same key and format
      case 'biblio_banks_bankers':
      case 'biblio_banks_messages':
        return { key: key.replace('biblio_banks_', ''), data }
      case 'biblio_banks_currency':
        return { key: 'name', data }
      case 'biblio_banks_perms':
        return { key: 'permissions', data }
      default: // Drop migration & limit
        return []
    }
  }
}
