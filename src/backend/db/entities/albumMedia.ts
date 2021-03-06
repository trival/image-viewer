import {
	Entity,
	Column,
	PrimaryColumn,
	ManyToOne,
	JoinColumn,
	Index,
} from 'typeorm'
import { ID } from '@/backend/types'
import { Album } from './album'
import { Media } from './media'

@Entity()
@Index(['album', 'media'], { unique: true })
export class AlbumMedia {
	@Column({ type: 'text', primary: true })
	albumId!: ID

	@Column({ type: 'text', primary: true })
	mediaId!: ID

	@ManyToOne(() => Album, { onDelete: 'CASCADE' })
	@JoinColumn()
	album!: Album

	@ManyToOne(() => Media, { onDelete: 'CASCADE' })
	@JoinColumn()
	media!: Media
}
