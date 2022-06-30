import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import useAuth from '../hooks/useAuth';

interface Inputs {
	email: string;
	password: string;
}

const Login = () => {
	const [login, setLogin] = useState(false);
	const { signIn, signUp } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
		if (login) {
			await signIn(email, password);
		} else {
			await signUp(email, password);
		}
	};

	return (
		<div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
			<Head>
				<title>Login - Netflix Clone</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Image className="-z-10 !hidden opacity-60 sm:!inline" src="https://rb.gy/p2hphi" layout="fill" objectFit="cover" />
			<Image className="absolute left-4 top-4 cursor-pointer md:left-10 md:top-6" src="https://rb.gy/ulxxee" width={150} height={150} objectFit="contain" />
			<form className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14" onSubmit={handleSubmit(onSubmit)}>
				<h1 className="text-4xl font-semibold">Sign In</h1>
				<div className="space-y-4">
					<label className="inline-block w-full" htmlFor="email">
						<input
							className={`w-full rounded bg-input-primary px-6 py-3.5 placeholder-gray-500 outline-none focus:bg-input-secondary${errors.email ? ' border-b-2 border-orange-500' : ''}`}
							type="email"
							id="email"
							placeholder="Email"
							{...register('email', { required: true })}
						/>
						{errors.email && <p className="p-1 text-[13px] font-light text-orange-500">Please enter a valid email.</p>}
					</label>
					<label className="inline-block w-full" htmlFor="password">
						<input
							className={`w-full rounded bg-input-primary px-6 py-3.5 placeholder-gray-500 outline-none focus:bg-input-secondary${errors.password ? ' border-b-2 border-orange-500' : ''}`}
							type="password"
							id="password"
							placeholder="Password"
							{...register('password', { required: true })}
						/>
						{errors.password && <p className="p-1 text-[13px] font-light text-orange-500">Your password must contain betwwen 4 and 60 characters.</p>}
					</label>
				</div>
				<button className="w-full rounded bg-netflix py-3 font-semibold" type="submit" onClick={() => setLogin(true)}>
					Sign In
				</button>
				<div className="text-gray-500">
					New to Netflix?{' '}
					<button className="text-white hover:underline" type="submit" onClick={() => setLogin(false)}>
						Sign up now
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
