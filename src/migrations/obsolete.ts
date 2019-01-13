// For keys that are no longer used, even by the v6 bot... but were never cleaned up

export function obsoleteConverter (): [string[], string[]] {
  const keys = Array.from({ length: localStorage.length })
    .map((_, i) => localStorage.key(i)!)
    .filter(key => key.startsWith('pvpArr') || key.includes('xtra') || key.startsWith('intervalArr'))

  return [keys, []]
}
