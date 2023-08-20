import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client"
import { TrpcAppRouter } from "~/backend/trpc"

export const trpcClient = createTRPCProxyClient<TrpcAppRouter>({
	links: [
		loggerLink(),
		httpBatchLink({ url: "http://localhost:3000/api/trpc" }),
	],
})
