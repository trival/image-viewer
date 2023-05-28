package xyz.trival.image_viewer.modules.library.persistence

import java.util.UUID
import zio.*
import xyz.trival.image_viewer.modules.library.model.{Library}
import xyz.trival.image_viewer.modules.library.service.LibraryErrors.LibraryNotFound

// library storage trait

trait LibraryStorage:
  def getLibraries(): UIO[Seq[Library]]
  def getLibrary(libId: UUID): IO[LibraryNotFound, Library]
  def saveLibrary(lib: Library): UIO[Unit]
  def deleteLibrary(libId: UUID): IO[LibraryNotFound, Unit]

object LibraryStorage:
  def getLibraries() =
    ZIO.serviceWithZIO[LibraryStorage](_.getLibraries())
  def getLibrary(libId: UUID) =
    ZIO.serviceWithZIO[LibraryStorage](_.getLibrary(libId))
  def saveLibrary(lib: Library) =
    ZIO.serviceWithZIO[LibraryStorage](_.saveLibrary(lib))
  def deleteLibrary(libId: UUID) =
    ZIO.serviceWithZIO[LibraryStorage](_.deleteLibrary(libId))

// in memory storage implementation

case class InMemoryLibraryStore() extends LibraryStorage:
  private var libraries: Map[UUID, Library] = Map.empty

  def getLibraries(): UIO[Seq[Library]] =
    ZIO.succeed(libraries.values.toSeq)

  def getLibrary(libId: UUID): IO[LibraryNotFound, Library] =
    libraries.get(libId) match
      case Some(lib) => ZIO.succeed(lib)
      case None      => ZIO.fail(LibraryNotFound(libId))

  def saveLibrary(lib: Library): UIO[Unit] =
    ZIO.succeed { libraries = libraries + (lib.id -> lib) }

  def deleteLibrary(libId: UUID): UIO[Unit] =
    ZIO.succeed { libraries = libraries - libId }

object InMemoryLibraryStore:
  def layer: ULayer[LibraryStorage] =
    ZLayer.succeed(InMemoryLibraryStore())
