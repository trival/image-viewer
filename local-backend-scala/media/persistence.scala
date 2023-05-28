package xyz.trival.image_viewer.modules.media.persistence

import xyz.trival.image_viewer.modules.media.model.Media
import java.util.UUID
import zio.*
import xyz.trival.image_viewer.modules.library.service.LibraryErrors.LibraryNotFound

type ProcessedMediaPath = String

trait MediaStorage:
  def getLibraryMedia(libId: UUID): IO[LibraryNotFound, Seq[Media]]

  def saveLibraryMedia(
      libId: UUID,
      media: Seq[Media],
  ): UIO[Seq[ProcessedMediaPath]]

  def deleteLibraryMedia(
      libId: UUID,
      mediaPaths: Seq[String],
  ): UIO[Seq[ProcessedMediaPath]]

// in memory storage implementation

case class InMemoryMediaStore() extends MediaStorage:
  private var media: Map[UUID, Set[Media]] = Map.empty

  def getLibraryMedia(libId: UUID) =
    ZIO
      .fromOption(media.get(libId))
      .mapError(_ => LibraryNotFound(libId))
      .map(_.toSeq)

  def saveLibraryMedia(
      libId: UUID,
      newMedia: Seq[Media],
  ) =
    val oldMedia = media.getOrElse(libId, Set.empty)
    media = media + (libId -> (oldMedia ++ newMedia))
    ZIO.succeed(media(libId).map(_.path).toSeq)

  def deleteLibraryMedia(
      libId: UUID,
      mediaIds: Seq[String],
  ) =
    media =
      media + (libId -> media(libId).filterNot(m => mediaIds.contains(m.path)))
    ZIO.succeed(mediaIds)

object InMemoryMediaStore:
  def layer = ZLayer.succeed(InMemoryMediaStore())
