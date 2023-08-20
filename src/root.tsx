// @refresh reload
import "./globals.css"
import { Suspense } from "solid-js"
import {
	Body,
	ErrorBoundary,
	FileRoutes,
	Head,
	Html,
	Meta,
	Routes,
	Scripts,
	Title,
} from "solid-start"
import { AppStoreProvider } from "./components/AppContext"

export default function Root() {
	return (
		<Html lang="en">
			<Head>
				<Title>Trival image viewer</Title>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta
					name="description"
					content="Browse your local desktop image collection"
				/>
			</Head>
			<Body>
				<Suspense>
					<ErrorBoundary>
						<AppStoreProvider>
							<Routes>
								<FileRoutes />
							</Routes>
						</AppStoreProvider>
					</ErrorBoundary>
				</Suspense>
				<Scripts />
			</Body>
		</Html>
	)
}
