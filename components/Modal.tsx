import { PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon } from '@heroicons/react/outline';
import MuiModal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import ReactPlayer from 'react-player/lazy';
import { useRecoilState } from 'recoil';

import { modalState, movieState } from '../atoms/modalAtom';
import { Element, Genre } from '../typings';

const Modal = () => {
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [movie, setMovie] = useRecoilState(movieState);
	const [trailer, setTrailer] = useState('');
	const [genres, setGenres] = useState<Genre[]>([]);
	const [muted, setMuted] = useState(true);

	useEffect(() => {
		if (!movie) return;

		async function fetchMovie() {
			const data = await fetch(`https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'}/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=videos`).then((res) => res.json());

			if (data?.videos) {
				const index = data.videos.results.findIndex((element: Element) => element.type === 'Trailer');

				setTrailer(data.videos?.results[index]?.key);
			}

			if (data?.genres) setGenres(data.genres);
		}

		fetchMovie();
	}, [movie]);

	const handleClose = () => {
		setShowModal(false);
		setMovie(null);
	};

	return (
		<MuiModal className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-x-hidden overflow-y-scroll rounded-md scrollbar-hide" open={showModal} onClose={handleClose}>
			<>
				<button
					className="absolute right-5 top-5 !z-40 flex h-9 w-9 items-center justify-center rounded-full border-2 border-none border-gray-500 bg-dark-tertiary transition hover:border-white hover:bg-dark-tertiary"
					type="button"
					onClick={handleClose}
				>
					<XIcon className="h-6 w-6" />
					<span className="sr-only">Close</span>
				</button>
				<div className="relative pt-[56.25%]">
					<ReactPlayer url={`https://www.youtube.com/watch?v=${trailer}`} width="100%" height="100%" style={{ position: 'absolute', top: '0', left: '0' }} playing muted={muted} />
					<div className="absolute bottom-10 flex w-full items-center justify-between px-10">
						<div className="flex space-x-2">
							<button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-light-primary" type="button">
								<FaPlay className="h-7 w-7" />
								Play
							</button>
							<button className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gray-500 bg-[#2a2a2a]/60 transition hover:border-white hover:bg-white/10" type="button">
								<PlusIcon className="h-7 w-7" />
								<span className="sr-only">Add</span>
							</button>
							<button className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gray-500 bg-[#2a2a2a]/60 transition hover:border-white hover:bg-white/10" type="button">
								<ThumbUpIcon className="h-6 w-6" />
								<span className="sr-only">Like</span>
							</button>
						</div>
						<button className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gray-500 bg-[#2a2a2a]/60 transition hover:border-white hover:bg-white/10" type="button" onClick={() => setMuted(!muted)}>
							{muted ? <VolumeOffIcon className="h-6 w-6" /> : <VolumeUpIcon className="h-6 w-6" />}
							<span className="sr-only">Volume</span>
						</button>
					</div>
				</div>
				<div className="flex space-x-16 rounded-b-md bg-dark-tertiary px-10 py-8">
					<div className="space-y-6 text-lg">
						<div className="flex items-center space-x-2 text-sm">
							<p className="font-semibold text-green-400">{Math.floor(movie?.vote_average * 10)}% Match</p>
							<p className="font-light">{movie?.release_date || movie?.first_air_date}</p>
							<div className="flex items-center justify-center rounded border border-white/40 px-1.5 text-xs">HD</div>
						</div>
						<div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
							<p className="w-5/6">{movie?.overview}</p>
							<div className="flex flex-col space-y-3 text-sm">
								<div>
									<span className="text-gray-500">Genres: </span>
									{genres.map((genre) => genre.name).join(', ')}
								</div>
								<div>
									<span className="text-gray-500">Original languages: </span>
									{movie?.original_language}
								</div>
								<div>
									<span className="text-gray-500">Total votes: </span>
									{movie?.vote_count}
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		</MuiModal>
	);
};

export default Modal;
