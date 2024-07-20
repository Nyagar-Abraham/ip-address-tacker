import Bg from '@/components/Image';
import Map from '@/components/Map';
import SearchBar from '@/components/SearchBar';

export default async function Home({ params, searchParams }: any) {
	const res = await fetch(
		`https://geo.ipify.org/api/v2/country,city?apiKey=${
			process.env.KEY
		}&ipAddress=${searchParams?.ip ? searchParams?.ip : ''}`
	);

	const { ip, location, isp } = ({} = await res.json());

	const display = {
		ip,
		location: location?.city,
		timezone: location?.timezone,
		isp,
	};

	const position: [number, number] = [location?.lat || 0, location?.lng || 0];
	const place = location?.city;

	return (
		<main className="relative min-h-screen text-gray-700">
			<div className="relative z-10">
				<Bg />
			</div>
			<div className="z-30 md:top-5 absolute top-7 left-1/2 transform -translate-x-1/2 w-11/12 sm:w-10/22 md:w-9/12 mx-auto flex items-center justify-center flex-col">
				<h1 className="text-white text-center mb-6 md:mb-4 font-semibold text-xl">
					Ip Address Tracker
				</h1>
				<SearchBar />
				<ul className=" mt-2 w-6/12 sm:w-full  sm:mt-4  bg-white rounded-lg p-2 flex flex-col sm:flex-row gap-[4px] md:gap-2 divide-y divide-gray-300 sm:divide-x sm:justify-between sm:divide-y-0 mx-auto ">
					<li className="text-center md:text-start ">
						<h3 className="mb-2 uppercase pt-[4px] text-xs font-semibold text-gray-600 tracking-wider">
							IP address
						</h3>
						<p className="text-xl font-semibold text-gray-950">{display?.ip}</p>
					</li>
					<li className="text-center md:text-start md:pl-2">
						<h3 className="mb-2 uppercase pt-[4px] text-xs font-semibold text-gray-600 tracking-wider">
							location
						</h3>
						<p className="text-xl font-semibold text-gray-950">
							{display?.location}
						</p>
					</li>
					<li className="text-center md:text-start md:pl-2">
						<h3 className="mb-2 uppercase pt-[4px] text-xs font-semibold text-gray-600 tracking-wider">
							timezone
						</h3>
						<p className="text-xl font-semibold text-gray-950">
							{display?.timezone}
						</p>
					</li>
					<li className="text-center md:text-start md:pl-2">
						<h3 className="mb-2 uppercase pt-[4px] text-xs font-semibold text-gray-600 tracking-wider">
							isp
						</h3>
						<p className="text-xl font-semibold text-gray-950">
							{display?.isp}
						</p>
					</li>
				</ul>
			</div>
			<div className="relative z-0">
				<Map position={position} place={place} />
			</div>
		</main>
	);
}
