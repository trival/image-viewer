package xyz.trival.image_viewer.modules.media.model

import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder, JsonDecoder, JsonEncoder}
import java.util.UUID
import scala.util.hashing.MurmurHash3

enum MediaType:
  case Image, Video

case class Media(
    directory: String,
    filename: String,
    /** size in bytes */
    size: Long = 0,
    /** width in pixels */
    width: Int = 0,
    /** height in pixels */
    height: Int = 0,
    /** Optional creation date */
    date: Option[Long] = None,
    /** Optional video length in seconds */
    length: Option[Int] = None,
) extends Ordered[Media]:

  val path = directory + '/' + filename

  val mediaType =
    // extract file extension from filename
    val ext =
      filename
        .substring(filename.lastIndexOf(".") + 1, filename.length)
        .toLowerCase

    if Media.imageExtensions.contains(ext) then MediaType.Image
    else if Media.videoExtensions.contains(ext) then MediaType.Video
    else throw new Exception("Unknown media type")

  override def compare(that: Media): Int =
    this.path.compare(that.path)

end Media

object Media:
  val webImageExtensions =
    Set("jpg", "jpeg", "png", "gif", "webp", "avif", "svg")
  val imageExtensions = webImageExtensions ++ Set("bmp", "heic", "tiff", "raw")
  val webVideoExtensions = Set("webm", "mp4")
  val videoExtensions = webVideoExtensions ++ Set(
    "mkv",
    "avi",
    "mov",
    "wmv",
    "flv",
    "mpg",
    "mpeg",
    "m4v",
    "3gp",
    "3g2",
    "ogv",
    "ogg",
    "ogm",
    "ogx",
    "rm",
    "rmvb",
    "vob",
    "asf",
    "amv",
    "m2v",
    "m4v",
    "svi",
    "mxf",
    "roq",
    "nsv",
    "f4v",
    "f4p",
    "f4a",
    "f4b",
  )
  val mediaExtensions = imageExtensions ++ videoExtensions

  def collectInRootPath(
      rootPath: os.Path,
      ignorePaths: Seq[os.Path],
  ): Seq[Media] =
    os
      .walk(rootPath)
      .filter(file =>
        os.isFile(file)
          && ignorePaths.forall(ignorePath => !file.startsWith(ignorePath))
          && mediaExtensions.contains(file.ext.toLowerCase),
      )
      .map(file =>
        val relativePath = file.relativeTo(rootPath).toString
        val (directory, filename) =
          relativePath.splitAt(relativePath.lastIndexOf('/'))
        Media(directory, filename.replace("/", "")),
      )
      .sorted

  def collectInRootPath(
      rootPath: String,
      ignorePaths: Seq[String] = Seq(),
  ): Seq[Media] =
    val path = os.Path(rootPath)
    collectInRootPath(path, ignorePaths.map(path / _))

  given JsonDecoder[Media] = DeriveJsonDecoder.gen[Media]
  given JsonEncoder[Media] = DeriveJsonEncoder.gen[Media]
