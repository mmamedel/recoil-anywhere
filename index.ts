import { RecoilValue, RecoilState, useRecoilCallback, useRecoilSnapshot } from 'recoil'

interface Recoil {
    get: <T>(recoilValue: RecoilValue<T>) => T
    getPromise: <T>(recoilValue: RecoilValue<T>) => Promise<T>
    set: <T>(recoilVal: RecoilState<T>, valOrUpdater: ((currVal: T) => T) | T) => void;
    reset: (recoilVal: RecoilState<any>) => void
}

export let recoil: Recoil = {
    get: () => 0 as any,
    getPromise: () => 0 as any,
    set: () => {},
    reset: () => {},
}

export const RecoilAnywhere = () => {
    const snapshot = useRecoilSnapshot()
    const callback = useRecoilCallback(c => () => c)()
    recoil.get = <T>(recoilValue: RecoilValue<T> ) => snapshot.getLoadable(recoilValue).getValue()
    recoil.getPromise = snapshot.getPromise
    recoil.set = callback.set
    recoil.reset = callback.reset
}

class RecoilRef<T> {
    private recoilState: RecoilState<T>

    constructor(recoilState: RecoilState<T>) {
        this.recoilState = recoilState
    }

    get current(): T {
        return recoil.get(this.recoilState)
    }

    set current(value: T) {
        recoil.set(this.recoilState, value)
    }
}

export const useRecoilRef = <T>(recoilState: RecoilState<T>) => new RecoilRef(recoilState)