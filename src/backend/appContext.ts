import { createLibraryService } from "./libraryService"
import { createLibraryStorage } from "./persistence/library"
import { createTrpcRouter } from "./trpc"

const libraryStorage = createLibraryStorage()
const libraryService = createLibraryService(libraryStorage)

export const trpcRouter = createTrpcRouter({ libraryService })
