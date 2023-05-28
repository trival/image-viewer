package xyz.trival.image_viewer.modules.library.service

import xyz.trival.image_viewer.modules.library.model.{Library}
import zio.*
import java.util.UUID
import xyz.trival.image_viewer.modules.library.persistence.LibraryStorage
import xyz.trival.image_viewer.utils.files.isPathADirectory

object LibraryErrors:
  case class LibraryNotFound(id: UUID) extends Exception
  case class RootPathNotDirectory(path: String) extends Exception {
    override def getMessage = s"Path $path is not a directory"
  }

trait LibraryService:
  import LibraryErrors.*

  def getLibraries: UIO[Seq[Library]]

  def getLibraryById(id: UUID): IO[LibraryNotFound, Library]

  def createLibrary(
      name: String,
      rootPath: String,
  ): IO[RootPathNotDirectory, Library]

  def updateLibrary(
      id: UUID,
      name: Option[String],
      rootPath: Option[String],
      ignorePaths: Option[Set[String]],
  ): IO[LibraryNotFound, Library]

  def deleteLibrary(id: UUID): IO[LibraryNotFound, Unit]

object LibraryService:
  def getLibraries =
    ZIO.serviceWithZIO[LibraryService](_.getLibraries)

  def getLibraryById(id: UUID) =
    ZIO.serviceWithZIO[LibraryService](_.getLibraryById(id))

  def createLibrary(
      name: String,
      rootPath: String,
  ) =
    ZIO.serviceWithZIO[LibraryService](_.createLibrary(name, rootPath))

  def updateLibrary(
      id: UUID,
      name: Option[String],
      rootPath: Option[String],
      ignorePaths: Option[Set[String]],
  ) =
    ZIO.serviceWithZIO[LibraryService](
      _.updateLibrary(id, name, rootPath, ignorePaths),
    )

  def deleteLibrary(id: UUID) =
    ZIO.serviceWithZIO[LibraryService](_.deleteLibrary(id))

// Implementation

case class LibraryServiceImpl(
    store: LibraryStorage,
) extends LibraryService:

  import LibraryErrors.*

  def getLibraries: UIO[Seq[Library]] =
    store.getLibraries()

  def getLibraryById(id: UUID): IO[LibraryNotFound, Library] =
    store.getLibrary(id)

  def createLibrary(
      name: String,
      rootPath: String,
  ): IO[RootPathNotDirectory, Library] =
    if !isPathADirectory(rootPath)
    then ZIO.fail(RootPathNotDirectory(rootPath))
    else
      val lib = Library(name, rootPath)
      store.saveLibrary(lib).as(lib)

  def updateLibrary(
      id: UUID,
      name: Option[String],
      rootPath: Option[String],
      ignorePaths: Option[Set[String]],
  ): IO[LibraryNotFound, Library] =
    for
      lib <- store.getLibrary(id)
      updatedLib = lib.copy(
        name = name.getOrElse(lib.name),
        rootPath = rootPath.getOrElse(lib.rootPath),
        ignorePaths = ignorePaths.getOrElse(lib.ignorePaths),
      )
      _ <- store.saveLibrary(updatedLib)
    yield updatedLib

  def deleteLibrary(id: UUID): IO[LibraryNotFound, Unit] =
    store.deleteLibrary(id)

object LibraryServiceImpl:
  def layer: ZLayer[LibraryStorage, Nothing, LibraryService] =
    ZLayer {
      for store <- ZIO.service[LibraryStorage]
      yield LibraryServiceImpl(store)
    }
