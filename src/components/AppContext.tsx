import {
	ParentProps,
	ResolvedChildren,
	createContext,
	useContext,
} from "solid-js"
import { createStore } from "solid-js/store"
import { Library } from "~/backend/interfaces"

export interface State {
	currentLibrary: Library | null
	libraries: Library[]
}
export interface Actions {
	loadLibraries: () => void
	selectLibrary: (rootPath: string) => void
	createLibrary: (input: { rootPath: string; name: string }) => void
	updateLibrary: (input: { name?: string; ignorePaths?: string[] }) => void
}

export type AppStore = [State, Actions]

const appCtx = createContext<AppStore>()

export function AppStoreProvider(props: ParentProps) {
	const [state, setState] = createStore<State>({
		currentLibrary: null,
		libraries: [],
	})

	const store: AppStore = [
		state,
		{
			loadLibraries: () => {},
			selectLibrary: (rootPath) => {},
			createLibrary: (input) => {},
			updateLibrary: (input) => {},
		},
	]

	return <appCtx.Provider value={store}>{props.children}</appCtx.Provider>
}

export function useStore(): AppStore {
	return useContext(appCtx)!
}
