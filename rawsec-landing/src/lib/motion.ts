function makeSignal(): [() => void, () => Promise<void>] {
  let ready = false
  const resolvers: Array<() => void> = []
  const signal = () => { if (ready) return; ready = true; resolvers.splice(0).forEach(r => r()) }
  const wait = (): Promise<void> => ready ? Promise.resolve() : new Promise(r => resolvers.push(r))
  return [signal, wait]
}

export const [signalParticlesReady, waitForParticles] = makeSignal()
export const [signalAppReady, waitForAppReady] = makeSignal()
