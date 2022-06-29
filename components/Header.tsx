import { SearchIcon } from '@heroicons/react/outline';
import { BellIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => (scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false));

		addEventListener('scroll', handleScroll);

		return () => removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header className={`${isScrolled ? 'bg-dark-primary' : ''}`}>
			<nav className="flex items-center space-x-2 md:space-x-10">
				<Link href="#">
					<a className="inline-flex">
						<Image src="https://rb.gy/ulxxee" width={100} height={30} objectFit="contain" alt="Netflix" />
					</a>
				</Link>
				<ul className="hidden space-x-4 md:flex">
					<li>
						<Link href="#">
							<a className="text-sm font-light text-light-primary transition-colors duration-[0.4s] hover:text-light-secondary" title="Home">
								Home
							</a>
						</Link>
					</li>
					<li>
						<Link href="#">
							<a className="text-sm font-light text-light-primary transition-colors duration-[0.4s] hover:text-light-secondary" title="TV Shows">
								TV Shows
							</a>
						</Link>
					</li>
					<li>
						<Link href="#">
							<a className="text-sm font-light text-light-primary transition-colors duration-[0.4s] hover:text-light-secondary" title="Movies">
								Movies
							</a>
						</Link>
					</li>
					<li>
						<Link href="#">
							<a className="text-sm font-light text-light-primary transition-colors duration-[0.4s] hover:text-light-secondary" title="New & Popular">
								New & Popular
							</a>
						</Link>
					</li>
					<li>
						<Link href="#">
							<a className="text-sm font-light text-light-primary transition-colors duration-[0.4s] hover:text-light-secondary" title="My Lists">
								My Lists
							</a>
						</Link>
					</li>
				</ul>
			</nav>

			<div className="flex items-center space-x-4 text-sm font-light">
				<SearchIcon className="hidden h-6 w-6 sm:inline" />
				<p className="hidden lg:inline">Kids</p>
				<BellIcon className="h-6 w-6" />
				<Link href="/account">
					<a className="inline-flex">
						<Image className="rounded" src="https://rb.gy/g1pwyx" width={24} height={24} alt="" />
					</a>
				</Link>
			</div>
		</header>
	);
};

export default Header;
