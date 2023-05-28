"use client"

import { trpc } from "@/libs/trpc-hooks"

function Home() {
	const fufu = trpc.hello.useQuery({ text: "fufu" })
	return <main className="">hello: {fufu.data?.greeting}</main>
}

export default trpc.withTRPC(Home)
