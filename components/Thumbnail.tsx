import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { Movie } from '../typings';

interface Props {
	movie: Movie;
}

const Thumbnail = ({ movie }: Props) => {
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

	return (
		<div
			className="relative h-20 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
			onClick={() => {
				setCurrentMovie(movie);
				setShowModal(true);
			}}
		>
			<Image className="rounded-sm md:rounded" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`} layout="fill" objectFit="cover" />
		</div>
	);
};

export default Thumbnail;
