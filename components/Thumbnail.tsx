import Image from 'next/image';
import { Movie } from '../typings';

interface Props {
	movie: Movie;
}

const Thumbnail = ({ movie }: Props) => {
	return (
		<div className="relative h-20 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
			<Image className="rounded-sm md:rounded" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`} layout="fill" objectFit="cover" />
		</div>
	);
};

export default Thumbnail;
