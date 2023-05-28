package xyz.trival.image_viewer.modules.media.service

import xyz.trival.image_viewer.modules.library.model.{Library}
import zio.*
import java.util.UUID
import xyz.trival.image_viewer.modules.library.service.LibraryErrors.LibraryNotFound
import xyz.trival.image_viewer.modules.media.model.Media
import xyz.trival.image_viewer.modules.media.service.MediaErrors.PathNotFound
import xyz.trival.image_viewer.modules.media.persistence.MediaStorage
import xyz.trival.image_viewer.modules.library.service.LibraryService

object MediaErrors:
  case class PathNotFound(path: String) extends Exception
  case class MediaNotFound(mediaId: String) extends Exception

trait MediaService:
  def getLibraryMedia(libId: UUID): IO[LibraryNotFound, Seq[Media]]
  def reloadLibraryMedia(libId: UUID): IO[LibraryNotFound, Seq[Media]]
  def reloadLibraryMediaPath(
      libId: UUID,
      path: String,
  ): IO[LibraryNotFound | PathNotFound, Seq[Media]]

object MediaService:
  def getLibraryMedia(libId: UUID) =
    ZIO.serviceWithZIO[MediaService](_.getLibraryMedia(libId))
  def reloadLibraryMedia(libId: UUID) =
    ZIO.serviceWithZIO[MediaService](_.reloadLibraryMedia(libId))
  def reloadLibraryMediaPath(
      libId: UUID,
      path: String,
  ) =
    ZIO.serviceWithZIO[MediaService](_.reloadLibraryMediaPath(libId, path))

// Implementation

case class MediaServiceImpl(
    store: MediaStorage,
    libraryService: LibraryService,
) extends MediaService:
  import MediaErrors.*

  def getLibraryMedia(libId: UUID) =
    store.getLibraryMedia(libId)

  def reloadLibraryMedia(libId: UUID) =
    for
      lib <- libraryService.getLibraryById(libId)
      rootPath = os.Path(lib.rootPath)
      media = Media.collectInRootPath(
        rootPath,
        lib.ignorePaths.map(rootPath / _).toSeq,
      )
      _ <- store.saveLibraryMedia(libId, media)
      media <- store.getLibraryMedia(libId)
    yield media

  def reloadLibraryMediaPath(
      libId: UUID,
      path: String,
  ) = ???

end MediaServiceImpl

object MediaServiceImpl:
  def layer =
    ZLayer {
      for
        store <- ZIO.service[MediaStorage]
        libraryService <- ZIO.service[LibraryService]
      yield MediaServiceImpl(store, libraryService)
    }
