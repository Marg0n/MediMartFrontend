import { useDispatch, useSelector, useStore } from 'react-redux'
import type { RootState, AppDispatch, AppStore } from './store'
// import type { TypedUseSelectorHook } from 'react-redux'

//* Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

//* Safe typed wrappers — compatible with all environments
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useAppStore = () => useStore<AppStore>();