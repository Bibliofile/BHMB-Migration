import { Converter } from './abstract'

type UserOld = 'ALL' | 'STAFF' | 'MOD' | 'ADMIN' | 'OWNER'

interface Old {
  PVP: {
    msg: string
    sel1: UserOld
    sel2: UserOld
    num1: string
    num2: string
  }[]
  DEATH: {
    msg: string
    sel1: UserOld
    num1: string
    num2: string
  }[]
}

type UserNew = 'anyone' | 'mod' | 'admin' | 'owner'

interface New {
  pvp: {
    attacker: UserNew,
    max: string,
    min: string,
    msg: string
    victim: UserNew
  }[]
  death: {
    max: string,
    min: string,
    msg: string
    victim: UserNew
  }[]
}

/**
 * From: http://blockheadsfans.com/messagebot/extension/dapersonmgn/DaPVPBeta
 * To: https://gitcdn.xyz/repo/dapersonmgn/BHMB-CombatMessages/master/build/bundle.js
 */
export class CombatConverter implements Converter {
  id = 'dapersonmgn/combatmessages'

  supports (key: string) {
    return key === 'DaPVPBeta_msgs'
  }

  convert (key: string, data: string): { key: string; data: string } {
    const parsed = JSON.parse(data) as Old
    const newData: New = {
      pvp: parsed.PVP.map(old => {
        return {
          msg: old.msg,
          victim: this.convertUser(old.sel1),
          attacker: this.convertUser(old.sel2),
          min: old.num1,
          max: old.num2
        }
      }),
      death: parsed.DEATH.map(old => {
        return {
          msg: old.msg,
          victim: this.convertUser(old.sel1),
          min: old.num1,
          max: old.num2
        }
      })
    }

    return {
      key: key.replace('biblio_censor_', ''),
      data: JSON.stringify(newData)
    }
  }

  convertUser (old: UserOld): UserNew {
    const map: { [k in UserOld]: UserNew } = {
      ALL: 'anyone',
      STAFF: 'mod', // Not ideal, but close enough
      MOD: 'mod',
      ADMIN: 'admin',
      OWNER: 'owner'
    }

    return map[old]
  }
}
