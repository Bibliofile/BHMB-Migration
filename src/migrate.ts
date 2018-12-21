import { Converter } from './migrations/abstract'

import { AfkConverter } from './migrations/afk'
import { CensorConverter } from './migrations/censor'
import { CombatConverter } from './migrations/combat'
import { CronConverter } from './migrations/cron'
import { NameTriggerConverter } from './migrations/nameTriggers'
import { SlashOpConverter } from './migrations/slashOp'
import { DiscordConverter } from './migrations/discord'
import { ManpageConverter } from './migrations/manpages'
import { TempbanConverter } from './migrations/tempban'
import { WarningConverter } from './migrations/warnings'
import { ExtensionsConverter } from './migrations/extensions'
import { settingsConverter } from './migrations/setttings'
import { versionConverter, playersConverter, logLoadConverter } from './migrations/housekeeping'
import { questsConverter } from './migrations/quests'
import { BankingConverter } from './migrations/banking'
import { MessageConverter } from './migrations/messages'

const migrations: Converter[] = [
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
]

const complexMigrations: Array<(options: { overwrite: boolean }) => [string[], string[]]> = [
  // groupConverter,
  settingsConverter,
  versionConverter,
  playersConverter,
  logLoadConverter,
  questsConverter
]

const globalMigrations: Converter[] = [
  new ExtensionsConverter()
]

function toArray<T> (data: T | T[]): T[] {
  return Array.isArray(data) ? data : [data]
}

/**
 * Migrates all keys in localStorage to the new save format according to the migrations defined above.
 * @returns a list of warnings
 */
export function migrate ({ remove = false, overwrite = false } = {}): string[] {
  const [ migrated, warnings ] = complexMigrations.map(fn => fn({ overwrite }))
    .reduce<[string[], string[]]>(([ a, b ], [ m, w ]) => [ a.concat(m), b.concat(w) ], [[], []])

  // Ignore MB7 keys
  const keys = Array.from({ length: localStorage.length })
    .map((_, i) => localStorage.key(i)!)
    .filter(key => !key.startsWith('/'))
    .filter(key => !migrated.includes(key))

  for (const key of keys) {
    const migrateKey = /\d+$/.test(key) ? key.replace(/\d+$/, '') : key
    const migrator = (/\d+$/.test(key) ? migrations : globalMigrations)
      .find(m => m.supports(migrateKey))

    if (!migrator) {
      warnings.push(`Missing migration for ${key}. Go bug Bibliophile`)
      continue
    }

    toArray(migrator.convert(migrateKey, localStorage.getItem(key)!)).forEach(({ key: outKey, data }) => {
      const saveKey = migrateKey === key ? outKey : `/${key.substr(migrateKey.length)}/${migrator.id.toLocaleLowerCase()}/${outKey}`

      if (localStorage.getItem(saveKey) != null && !overwrite) {
        warnings.push(`Ignoring migration for ${key} => ${saveKey} as there is already data present.`)
      } else {
        localStorage.setItem(saveKey, data)
        migrated.push(key)
      }
    })
  }

  if (remove) {
    for (const key of migrated) {
      localStorage.removeItem(key)
    }
  }

  return warnings
}
