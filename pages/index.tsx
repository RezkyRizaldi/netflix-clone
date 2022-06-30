import Head from 'next/head';
import { useRecoilValue } from 'recoil';

import { modalState } from '../atoms/modalAtom';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Row from '../components/Row';
import useAuth from '../hooks/useAuth';
import { Movie } from '../typings';
import requests from '../utils/requests';

interface Props {
	netflixOriginals: Movie[];
	trendingNow: Movie[];
	topRated: Movie[];
	actionMovies: Movie[];
	comedyMovies: Movie[];
	horrorMovies: Movie[];
	romanceMovies: Movie[];
	documentaryMovies: Movie[];
}

const Home = ({ netflixOriginals, trendingNow, topRated, actionMovies, comedyMovies, horrorMovies, romanceMovies, documentaryMovies }: Props) => {
	const { loading } = useAuth();
	const showModal = useRecoilValue(modalState);

	if (loading) return 'Loading...';

	return (
		<div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
			<Head>
				<title>Home - Netflix Clone</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />
			<main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
				<Banner netflixOriginals={netflixOriginals} />
				<section className="md:space-y-24">
					<Row title="Trending Now" movies={trendingNow} />
					<Row title="Top Rated" movies={topRated} />
					<Row title="Action Thrillers" movies={actionMovies} />
					<Row title="Comedies" movies={comedyMovies} />
					<Row title="Scary Movies" movies={horrorMovies} />
					<Row title="Romance Movies" movies={romanceMovies} />
					<Row title="Romance Movies" movies={romanceMovies} />
					<Row title="Documentary Movies" movies={documentaryMovies} />
				</section>
			</main>
			{showModal && <Modal />}
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	const [netflixOriginals, trendingNow, topRated, actionMovies, comedyMovies, horrorMovies, romanceMovies, documentaryMovies] = await Promise.all([
		fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
		fetch(requests.fetchTrending).then((res) => res.json()),
		fetch(requests.fetchTopRated).then((res) => res.json()),
		fetch(requests.fetchActionMovies).then((res) => res.json()),
		fetch(requests.fetchComedyMovies).then((res) => res.json()),
		fetch(requests.fetchHorrorMovies).then((res) => res.json()),
		fetch(requests.fetchRomanceMovies).then((res) => res.json()),
		fetch(requests.fetchDocumentaryMovies).then((res) => res.json()),
	]);

	return {
		props: {
			netflixOriginals: netflixOriginals.results,
			trendingNow: trendingNow.results,
			topRated: topRated.results,
			actionMovies: actionMovies.results,
			comedyMovies: comedyMovies.results,
			horrorMovies: horrorMovies.results,
			romanceMovies: romanceMovies.results,
			documentaryMovies: documentaryMovies.results,
		},
	};
};
