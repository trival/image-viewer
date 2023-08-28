import { createLibraryService } from "./libraryService"
import { createLibraryStorage } from "./persistence/library"
import { createPersistenceUtils } from "./persistence/utils"
import { createTrpcRouter } from "./trpc"

const persistenceUtils = createPersistenceUtils(".trival-viewer")
const libraryStorage = createLibraryStorage(persistenceUtils)
const libraryService = createLibraryService(libraryStorage)

export const trpcRouter = createTrpcRouter({ libraryService })
