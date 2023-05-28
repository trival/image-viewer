import { NextRequest } from "next/server"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { appRouter } from "@/backend/router"

async function handler(req: NextRequest) {
	return fetchRequestHandler({
		endpoint: "/api/trpc",
		router: appRouter,
		req,
		createContext: () => ({}),
	})
}

export { handler as GET, handler as POST }
