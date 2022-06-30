import { InformationCircleIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { useRecoilState } from 'recoil';

import { modalState, movieState } from '../atoms/modalAtom';
import { baseUrl } from '../constants/movie';
import { Movie } from '../typings';

interface Props {
	netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
	const [movie, setMovie] = useState<Movie | null>(null);
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

	useEffect(() => {
		setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);
	}, [netflixOriginals]);

	return (
		<section className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
			<div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
				<Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`} layout="fill" objectFit="cover" alt={`${movie?.title || movie?.name || movie?.original_name}`} priority />
			</div>
			<h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">{movie?.title || movie?.name || movie?.original_name}</h1>
			<p className="max-w-xs text-xs text-shadow-md md:max-w-lg lg:max-w-2xl lg:text-2xl">{movie?.overview}</p>
			<div className="flex space-x-3">
				<button type="button" className="flex items-center gap-x-2 rounded bg-white px-5 py-1.5 text-sm font-semibold text-black transition-opacity hover:opacity-75 md:py-2.5 md:px-8 md:text-xl">
					<FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
				</button>
				<button
					type="button"
					className="flex items-center gap-x-2 rounded bg-gray-500/70 px-5 py-1.5 text-sm font-semibold transition-opacity hover:opacity-75 md:py-2.5 md:px-8 md:text-xl"
					onClick={() => {
						setCurrentMovie(movie);
						setShowModal(true);
					}}
				>
					<InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" /> More Info
				</button>
			</div>
		</section>
	);
};

export default Banner;
