(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@bhmb/bot')) :
  typeof define === 'function' && define.amd ? define(['@bhmb/bot'], factory) :
  (global = global || self, factory(global['@bhmb/bot']));
}(this, function (bot) { 'use strict';

  var html = "<div class=\"container is-widescreen\">\n  <h3 class=\"subtitle\">Storage Migration</h3>\n  <p>The Bot's storage format has changed in the latest version of the bot. This extension lets you migrate saves from the old version to the new version. It is recommended to make a backup before running this migration in case something goes wrong.</p>\n\n  <p>If you do not remove old storage keys, this will roughly double the size of your backup.</p>\n\n  <p style=\"color: red\">Changes may not be correctly applied without a reload.</p>\n\n  <label>\n    <input type=\"checkbox\" data-for=\"overwrite\" checked>\n    Overwrite V7 configuration if present\n  </label>\n  <br>\n\n  <label>\n    <input type=\"checkbox\" data-for=\"remove\" checked>\n    Remove old storage keys\n  </label>\n  <br>\n\n  <button class=\"button is-primary\">Run Migration</button>\n\n  <ul></ul>\n</div>\n";

  /**
   * From: http://blockheadsfans.com/messagebot/extension/Bibliofile/afk
   * To: https://gitcdn.xyz/repo/Bibliofile/BHMB-AFKResponder/master/build/bundle.js
   */
  class AfkConverter {
      constructor() {
          this.id = 'bibliofile/afk';
      }
      supports(key) {
          return key === 'afk_settings';
      }
      convert(_key, data) {
          return { key: 'settings', data };
      }
  }
  //# sourceMappingURL=afk.js.map

  /**
   * From: http://blockheadsfans.com/messagebot/extension/Bibliofile/biblio_censor
   * To: https://gitcdn.xyz/repo/Bibliofile/BHMB-Censor-List/master/build/bundle.js
   */
  class CensorConverter {
      constructor() {
          this.id = 'bibliofile/censoring';
      }
      supports(key) {
          return key.startsWith('biblio_censor_');
      }
      convert(key, data) {
          return { key: key.replace('biblio_censor_', ''), data };
      }
  }
  //# sourceMappingURL=censor.js.map

  /**
   * From: http://blockheadsfans.com/messagebot/extension/dapersonmgn/DaPVPBeta
   * To: https://gitcdn.xyz/repo/dapersonmgn/BHMB-CombatMessages/master/build/bundle.js
   */
  class CombatConverter {
      constructor() {
          this.id = 'dapersonmgn/combatmessages';
      }
      supports(key) {
          return key === 'DaPVPBeta_msgs';
      }
      convert(key, data) {
          const parsed = JSON.parse(data);
          const newData = {
              pvp: parsed.PVP.map(old => {
                  return {
                      msg: old.msg,
                      victim: this.convertUser(old.sel1),
                      attacker: this.convertUser(old.sel2),
                      min: old.num1,
                      max: old.num2
                  };
              }),
              death: parsed.DEATH.map(old => {
                  return {
                      msg: old.msg,
                      victim: this.convertUser(old.sel1),
                      min: old.num1,
                      max: old.num2
                  };
              })
          };
          return {
              key: key.replace('DaPVPBeta_msgs', ''),
              data: JSON.stringify(newData)
          };
      }
      convertUser(old) {
          const map = {
              ALL: 'anyone',
              STAFF: 'mod',
              MOD: 'mod',
              ADMIN: 'admin',
              OWNER: 'owner'
          };
          return map[old];
      }
  }
  //# sourceMappingURL=combat.js.map

  /**
   * From: http://blockheadsfans.com/messagebot/extension/Bibliofile/biblio_cron_messages
   * => ex.messages.push({message: message.value, minutes: minutes.value});
   * To: https://gitcdn.xyz/repo/Bibliofile/BHMB-Cron-Messages/master/build/bundle.js
   * => messages.push({ message: message.value, minutes: minutes.value });
   */
  class CronConverter {
      constructor() {
          this.id = 'bibliofile/cron';
      }
      supports(key) {
          return key === 'biblio_cron_messages_messages';
      }
      convert(_key, data) {
          return { key: 'messages', data };
      }
  }
  //# sourceMappingURL=cron.js.map

  /**
   * From: http://blockheadsfans.com/messagebot/extension/Bibliofile/biblio_name_triggers
   * => biblio_name_triggers_preferences - { exactMatch: boolean }
   * => biblio_name_triggers_messages - { message: string, trigger: string }[]
   * Drop the default message as it is generated in MB7
   * To: https://gitcdn.xyz/repo/Bibliofile/BHMB-NameTriggers/master/build/bundle.js
   * => preferences - { exactMatch: boolean }
   * => messages - { message: string, trigger: string }[]
   */
  class NameTriggerConverter {
      constructor() {
          this.id = 'bibliofile/name_triggers';
      }
      supports(key) {
          return key.startsWith('biblio_name_triggers');
      }
      convert(key, data) {
          return { key: key.replace('biblio_name_triggers_', ''), data };
      }
  }
  //# sourceMappingURL=nameTriggers.js.map

  /**
   * From: http://blockheadsfans.com/messagebot/extension/Bibliofile/biblio_op
   * => biblio_op_messages - { name: string, message: string, timestamp: string }[]
   * To: https://gitcdn.xyz/repo/Bibliofile/BHMB-Slash-OP/master/build/bundle.js
   * => messages - { name: string, message: string, timestamp: number }[]
   */
  class SlashOpConverter {
      constructor() {
          this.id = 'bibliofile/censoring';
      }
      supports(key) {
          return key === 'biblio_op_messages';
      }
      convert(_key, data) {
          const parsed = JSON.parse(data);
          return {
              key: 'messages',
              data: JSON.stringify(parsed.map(e => {
                  return Object.assign({}, e, { timestamp: +e.timestamp });
              }))
          };
      }
  }
  //# sourceMappingURL=slashOp.js.map

  /**
   * From: http://blockheadsfans.com/messagebot/extension/Wingysam/discord
   * => botToken -string
   * => channelId - string
   * To: ???
   * TODO
   */
  class DiscordConverter {
      constructor() {
          this.id = 'xyz.wingysam.discord';
      }
      supports(key) {
          return ['botToken', 'channelId'].includes(key);
      }
      convert(_key, _data) {
          return [];
      }
  }
  //# sourceMappingURL=discord.js.map

  /**
   * From: http://blockheadsfans.com/messagebot/extension/Bibliofile/manpages
   * => manpages_messages - {default: string, parts: {[k: string]: string}}
   * Drop the default message as it is generated in MB7
   * To: https://gitcdn.xyz/repo/Bibliofile/BHMB-Manpages/master/build/bundle.js
   * => command - string = '/?'
   * => pages - {[k: string]: string};
   */
  class ManpageConverter {
      constructor() {
          this.id = 'bibliofile/manpages';
      }
      supports(key) {
          return key === 'manpages_messages';
      }
      convert(_key, data) {
          const parsed = JSON.parse(data);
          return [
              { key: 'pages', data: JSON.stringify(parsed.parts) },
              { key: 'command', data: '/?' }
          ];
      }
  }
  //# sourceMappingURL=manpages.js.map

  /**
   * From: http://blockheadsfans.com/messagebot/extension/Bibliofile/biblio_tempban
   * => biblio_tempban_preferences - { time: number, bans: { [k: string]: string } }
   * To: https://gitcdn.xyz/repo/Bibliofile/BHMB-TempBan/master/build/bundle.js
   * => config - { time: number, bans: { [k: string]: string } }
   */
  class TempbanConverter {
      constructor() {
          this.id = 'bibliofile/tempban';
      }
      supports(key) {
          return key === 'biblio_tempban_preferences';
      }
      convert(_key, data) {
          return { key: 'config', data };
      }
  }
  //# sourceMappingURL=tempban.js.map

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
  class WarningConverter {
      constructor() {
          this.id = 'bibliofile/tempban';
      }
      supports(key) {
          return key.startsWith('warnings_');
      }
      convert(key, data) {
          return { key: key.replace('warnings_', ''), data };
      }
  }
  //# sourceMappingURL=warnings.js.map

  /**
   * Old: https://github.com/Blockheads-Messagebot/MessageBot/blob/efd7a665e3c77338497bbf6a9e13e00a197073d7/dev/settings/bot/index.js#L7
   * New: https://github.com/Blockheads-Messagebot/Browser-Loader/blob/master/src/settings.ts#L9
   */
  function settingsConverter({ overwrite }) {
      if (!overwrite) {
          return [['mb_preferences'], ['Global settings from V6 were not copied to all worlds.']];
      }
      const worldIds = new Set(Array.from({ length: localStorage.length })
          .map((_, i) => localStorage.key(i))
          .filter(key => /\d$/.test(key))
          .map(key => key.replace(/.*?(\d+)$/, '$1')));
      const prefs = JSON.parse(localStorage.getItem('mb_preferences') || '{}');
      for (const id of worldIds) {
          localStorage.setItem(`/${id}/messages/announcementDelay`, prefs.announcementDelay.toString());
          localStorage.setItem(`/${id}/messages/maxResponses`, prefs.maxResponses.toString());
          localStorage.setItem(`/${id}/messages/regexTriggers`, JSON.stringify(prefs.regexTriggers));
          localStorage.setItem(`/${id}/messages/disableWhitespaceTrimming`, JSON.stringify(prefs.disableTrim));
          localStorage.setItem(`/${id}/splitMessages`, JSON.stringify(prefs.splitMessages));
          localStorage.setItem(`/${id}/splitToken`, JSON.stringify(prefs.splitToken));
      }
      return [['mb_preferences'], []];
  }
  //# sourceMappingURL=settings.js.map

  /**
   * mb_lastLogLoad -> lastPlayersUpdate
   */
  function logLoadConverter({ overwrite }) {
      const logLoads = Array.from({ length: localStorage.length })
          .map((_, i) => localStorage.key(i))
          .filter(key => key.startsWith('mb_lastLogLoad'));
      if (!overwrite) {
          return [logLoads, ['Last log updates were not copied from V6.']];
      }
      for (const key of logLoads) {
          const id = key.replace('mb_lastLogLoad', '');
          localStorage.setItem(`/${id}/lastPlayersUpdate`, localStorage.getItem(key));
      }
      return [logLoads, []];
  }
  function playersConverter({ overwrite }) {
      const players = Array.from({ length: localStorage.length })
          .map((_, i) => localStorage.key(i))
          .filter(key => key.startsWith('mb_players'));
      if (!overwrite) {
          return [players, ['Player lists were not copied from V6.']];
      }
      for (const key of players) {
          const id = key.replace('mb_players', '');
          localStorage.setItem(`/${id}/players`, localStorage.getItem(key));
      }
      return [players, []];
  }
  // No longer saved.
  function versionConverter() {
      localStorage.removeItem('mb_version');
      return [['mb_version'], []];
  }
  //# sourceMappingURL=housekeeping.js.map

  /**
   * From: http://blockheadsfans.com/messagebot/extension/Bibliofile/quests
   * => quests_log - { message: string, user: string, timestamp: number }[]
   * => quests_quests - { title: string, description: string, xp: string, code: string }[]
   * => quests_settings - {
   *      addxp: string,
   *      quest_already_completed: string,
   *      quest_complete: string,
   *      level: string,
   *      leveltop: string,
   *      player_does_not_exist: string,
   *      quest_details: string,
   *      quest_not_found: string,
   *      quest_list: string,
   *      quest_list_all_complete: string,
   *      removexp: string
   *   }
   * => quests_users - { [k: string]: { xp: string, questMaster?: boolean, completed: string[] }}
   * => quests_levels - { xp: number, title: string, onLevelUp: string }[]
   * To: https://gitcdn.xyz/repo/Bibliofile/BHMB-Quests/master/build/bundle.js
   * https://github.com/Bibliofile/BHMB-Quests/blob/master/src/quests-tab.ts
   * => quests - { id: number, name: string, code: string, description: string, xp: number, completeMessage: string }[]
   * => quest_id - number <- start at length of quests
   * => order - QuestList <- https://github.com/Bibliofile/BHMB-Quests/blob/master/src/quest.ts#L33
   * https://github.com/Bibliofile/BHMB-Quests/blob/master/src/log-tab.ts
   * => log - { message: string, timestamp: number, user: string }[]
   * https://github.com/Bibliofile/BHMB-Quests/blob/master/src/users-tab.ts
   * => users - { [k: string]: { xp: number, questmaster: boolean, completed: number[] }}
   * https://github.com/Bibliofile/BHMB-Quests/blob/master/src/levels-tab.ts
   * => levels - { xp: number, title: string, onLevelUp: string }[]
   */
  function questsConverter({ overwrite }) {
      const questsId = 'bibliofile/quests';
      const migrated = [];
      const warnings = [];
      const worldIds = new Set(Array.from({ length: localStorage.length })
          .map((_, i) => localStorage.key(i))
          .filter(key => key.startsWith('quests_'))
          .map(key => key.replace(/.*?(\d+)$/, '$1')));
      for (const id of worldIds) {
          const setOrWarn = (key, data) => {
              const saveKey = `/${id}/${questsId}/${key}`;
              migrated.push(`quests_${key}${id}`);
              if (localStorage.getItem(saveKey) != null && !overwrite) {
                  warnings.push(`Ignoring migration for ${saveKey} as there is already data present`);
              }
              else {
                  localStorage.setItem(saveKey, data);
              }
          };
          // Log, format is the same
          setOrWarn('log', localStorage.getItem('quests_log' + id) || '[]');
          // Levels format is the same.
          setOrWarn('levels', localStorage.getItem('quests_levels' + id) || '[]');
          // Settings is removed
          migrated.push('quests_settings' + id);
          // Users & Quests have changed
          // Users migration depends on quests migration.
          // quests -> quests, order
          const oldQuests = JSON.parse(localStorage.getItem('quests_quests' + id) || '[]');
          const order = oldQuests.map((_, i) => ({ id: i, children: [] }));
          const quests = oldQuests
              .map((q, i) => ({ name: q.title, description: q.description, id: i, code: q.code, xp: +q.xp, completeMessage: '' }));
          setOrWarn('order', JSON.stringify(order));
          setOrWarn('quest_id', JSON.stringify(order.length + 1));
          setOrWarn('quests', JSON.stringify(quests));
          // Transform the "completed" property of users to ids
          const oldUsers = JSON.parse(localStorage.getItem('quests_users' + id) || '{}');
          delete oldUsers.QUESTS_INVALID_NAME;
          const newUsers = {};
          for (const [name, data] of Object.entries(oldUsers)) {
              newUsers[name] = {
                  xp: +data.xp,
                  questmaster: !!data.questMaster,
                  completed: data.completed.map(c => quests.findIndex(q => q.code === c)).filter(id => id !== -1)
              };
          }
          setOrWarn('users', JSON.stringify(newUsers));
      }
      return [migrated, warnings];
  }
  //# sourceMappingURL=quests.js.map

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
  class BankingConverter {
      constructor() {
          this.id = 'bibliofile/banking';
      }
      supports(key) {
          return key.startsWith('biblio_banks_');
      }
      convert(key, data) {
          switch (key) {
              case 'biblio_banks_accounts': // Data has same key and format
              case 'biblio_banks_bankers':
              case 'biblio_banks_messages':
                  return { key: key.replace('biblio_banks_', ''), data };
              case 'biblio_banks_currency':
                  return { key: 'name', data };
              case 'biblio_banks_perms':
                  return { key: 'permissions', data };
              default: // Drop migration & limit
                  return [];
          }
      }
  }
  //# sourceMappingURL=banking.js.map

  /**
   * From: https://github.com/Blockheads-Messagebot/MessageBot/blob/efd7a66/dev/messages/announcements/index.js#L24
   * => announcementArr - { message: string }[]
   * https://github.com/Blockheads-Messagebot/MessageBot/blob/efd7a66/dev/messages/join/index.js#L50
   * => joinArr - { message: string, joins_low: number, joins_high: number, group: string, not_group: string }[]
   * https://github.com/Blockheads-Messagebot/MessageBot/blob/efd7a66/dev/messages/leave/index.js#L51
   * => leaveArr - { message: string, joins_low: number, joins_high: number, group: string, not_group: string }[]
   * https://github.com/Blockheads-Messagebot/MessageBot/blob/efd7a66/dev/messages/trigger/index.js#L52
   * => triggerArr - { message: string, trigger: string, joins_low: number, joins_high: number, group: string, not_group: string }[]
   * To: https://github.com/Blockheads-Messagebot/Messages-Extension/blob/master/src/index.ts#L9
   * => messages.push({ message: message.value, minutes: minutes.value });
   */
  class MessageConverter {
      constructor() {
          this.id = 'messages';
      }
      supports(key) {
          return ['announcementArr', 'joinArr', 'leaveArr', 'triggerArr'].includes(key);
      }
      convert(key, data) {
          return { key, data };
      }
  }
  //# sourceMappingURL=messages.js.map

  // For keys that are no longer used, even by the v6 bot... but were never cleaned up
  function obsoleteConverter() {
      const keys = Array.from({ length: localStorage.length })
          .map((_, i) => localStorage.key(i))
          .filter(key => key.startsWith('pvpArr') || key.includes('xtra') || key.startsWith('intervalArr'));
      return [keys, []];
  }
  //# sourceMappingURL=obsolete.js.map

  const extensionMap = {
      afk: 'bibliofile/afk',
      ban_messages: 'bibliofile/ban_messages',
      biblio_analytics: 'bibliofile/analytics',
      biblio_banks: 'bibliofile/banking',
      biblio_censor: 'bibliofile/censoring',
      biblio_cron_messages: 'bibliofile/cron',
      biblio_lists: 'bibliofile/lists',
      biblio_name_triggers: 'bibliofile/name_triggers',
      biblio_op: 'bibliofile/slash_op',
      biblio_tempban: 'bibliofile/tempban',
      DaPgroupManagement: 'dapersonmgn/groupmanagement',
      DaPVPBeta: 'dapersonmgn/combatmessages',
      dice: 'bibliofile/dice',
      gmt: 'xyz.wingysam.gmt',
      jemcount: 'bibliofile/countdown',
      lastseen: 'xyz.wingysam.lastseen',
      logviewer: 'bibliofile/logs',
      manpages: 'bibliofile/manpages',
      marcopolo: 'bibliofile/marcopolo',
      quests: 'bibliofile/quests',
      warnings: 'bibliofile/warnings',
      wingysam_repeat: 'xyz.wingysam.repeat',
      worldCommands: 'dapersonmgn/worldcommands'
  };
  const isRemoved = (id) => {
      return ['biblio_history', 'discord', 'biblio_storage'].includes(id);
  };
  function toNewId(id) {
      return extensionMap[id] || id;
  }
  function extensionsConverter({ overwrite }) {
      const worldIds = new Set(Array.from({ length: localStorage.length })
          .map((_, i) => localStorage.key(i))
          .filter(key => /\d$/.test(key))
          .map(key => key.replace(/.*?(\d+)$/, '$1')));
      const oldExtensions = JSON.parse(localStorage.getItem('mb_extensions') || '[]');
      const newIds = oldExtensions.filter(id => !isRemoved(id)).map(toNewId);
      const warnings = [];
      for (const worldId of worldIds) {
          const key = `/${worldId}/extensions/autoload`;
          if (localStorage.getItem(key) != null && !overwrite) {
              warnings.push('Not overwriting ' + key);
          }
          else {
              localStorage.setItem(key, JSON.stringify(newIds));
          }
      }
      return [['mb_extensions'], warnings];
  }

  const migrations = [
      new AfkConverter(),
      new BankingConverter(),
      new CensorConverter(),
      new CombatConverter(),
      new CronConverter(),
      new DiscordConverter(),
      new ManpageConverter(),
      new MessageConverter(),
      new NameTriggerConverter(),
      new SlashOpConverter(),
      new TempbanConverter(),
      new WarningConverter()
  ];
  const complexMigrations = [
      // groupConverter,
      settingsConverter,
      versionConverter,
      playersConverter,
      logLoadConverter,
      questsConverter,
      extensionsConverter,
      obsoleteConverter
  ];
  function toArray(data) {
      return Array.isArray(data) ? data : [data];
  }
  /**
   * Migrates all keys in localStorage to the new save format according to the migrations defined above.
   * @returns a list of warnings
   */
  function migrate({ remove = false, overwrite = false } = {}) {
      const [migrated, warnings] = complexMigrations.map(fn => fn({ overwrite }))
          .reduce(([a, b], [m, w]) => [a.concat(m), b.concat(w)], [[], []]);
      // Ignore MB7 keys
      const keys = Array.from({ length: localStorage.length })
          .map((_, i) => localStorage.key(i))
          .filter(key => !key.startsWith('/'))
          .filter(key => !key.startsWith('load_indicator')) // Non-standardly named, but used by MB7
          .filter(key => !migrated.includes(key));
      for (const key of keys) {
          const migrateKey = /\d+$/.test(key) ? key.replace(/\d+$/, '') : key;
          const migrator = migrations.find(m => m.supports(migrateKey));
          if (!migrator) {
              warnings.push(`Missing migration for ${key}. Go bug Bibliophile`);
              continue;
          }
          toArray(migrator.convert(migrateKey, localStorage.getItem(key))).forEach(({ key: outKey, data }) => {
              const saveKey = migrateKey === key ? outKey : `/${key.substr(migrateKey.length)}/${migrator.id.toLocaleLowerCase()}/${outKey}`;
              if (localStorage.getItem(saveKey) != null && !overwrite) {
                  warnings.push(`Ignoring migration for ${key} => ${saveKey} as there is already data present.`);
              }
              else {
                  localStorage.setItem(saveKey, data);
                  migrated.push(key);
              }
          });
      }
      if (remove) {
          for (const key of migrated) {
              localStorage.removeItem(key);
          }
      }
      return warnings;
  }
  //# sourceMappingURL=migrate.js.map

  bot.MessageBot.registerExtension('bibliofile/convert', function (ex) {
      const ui = ex.bot.getExports('ui');
      if (!ui) {
          console.log('This extension requires a browser.');
          return;
      }
      const tab = ui.addTab('Config Migration');
      tab.innerHTML = html;
      const ul = tab.querySelector('ul');
      tab.querySelector('button').addEventListener('click', () => {
          const warnings = migrate({
              remove: tab.querySelector('[data-for=remove]').checked,
              overwrite: tab.querySelector('[data-for=overwrite]').checked
          });
          while (ul.firstChild)
              ul.removeChild(ul.firstChild);
          for (const warning of warnings) {
              const li = ul.appendChild(document.createElement('li'));
              li.textContent = warning;
          }
      });
  });
  //# sourceMappingURL=index.js.map

}));
//# sourceMappingURL=bundle.js.map
