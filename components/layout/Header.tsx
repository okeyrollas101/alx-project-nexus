"use client";
import { Search, ShoppingCart, User, Info, Headphones, ChevronDown, MapPin, Award, Gift, PhoneCall } from 'lucide-react';

const Header: React.FC = () => {
	return (
		<header className='w-full flex flex-col'>
			<div className='flex w-full flex-wrap items-center justify-between bg-[#837E7E] md:px-8 py-4 px-4 gap-4'>
				<div className='text-2xl md:text-4xl font-bold text-[#A95F21] ml-[2rem]'>Shoppers.</div>

				{/* Center: Search Bar */}
				<div className="relative flex-1 max-w-[600px] w-full">
					<div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
						<Search className="h-5 w-5 text-gray-400" />
					</div>
					<input
						type="text"
						placeholder="Search products, brands, categories..."
						className="w-full h-[48px] md:h-[64px] rounded-full border border-gray-300 pl-12 pr-4 text-base"
					/>
				</div>


				{/* Right: Profile + Cart */}
				<div className="flex items-center gap-6 mr-[2rem]">
					<button className="flex flex-col items-center gap-1 text-[#000000]">
						<User className="h-4 w-4" />
						<span className="hidden sm:inline text-base font-medium">Profile</span>
					</button>

					<button className="flex flex-col items-center gap-1 text-[#000000]">
						<ShoppingCart className="h-4 w-4" />
						<span className="hidden sm:inline text-base font-medium">Cart</span>
					</button>
				</div>
			</div>
			{/* Second header section */}
			<div className="flex flex-wrap w-full items-center justify-between bg-[#A95F21] md:px-8 px-4 py-3 text-sm font-medium text-white gap-4">
				{/* Left navigation */}
				<div className="flex flex-wrap items-center gap-4 md:gap-6 pl-4">
					{/* All Category Dropdown */}
					<button className="flex items-center bg-[#F59D55] gap-1 px-3 py-2 hover:text-blue-600">
						<span>All Category</span>
						<ChevronDown className="h-4 w-4" />
					</button>

					{/* Track Order */}
					<button className="flex items-center gap-1 hover:text-blue-600">
						<MapPin className="h-5 w-5" />
						<span className="hidden sm:inline">Track Order</span>
					</button>

					{/* Popular Demand */}
					<button className="flex items-center gap-1 hover:text-blue-600">
						<Award className="h-5 w-5" />
						<span className="hidden sm:inline">Popular Demand</span>
					</button>

					{/* Offers */}
					<button className="flex items-center gap-1 hover:text-blue-600">
						<Gift className="h-5 w-5" />
						<span className="hidden sm:inline">Offers</span>
					</button>

					{/* Need Help */}
					<button className="flex items-center gap-1 hover:text-blue-600">
						<Info className="h-5 w-5" />
						<span className="hidden sm:inline">Need Help</span>
					</button>
				</div>

				{/* Right section */}
				<div className="flex flex-wrap items-center gap-4 pr-4">
					{/* Customer Support */}
					<div className="flex items-center gap-1 hover:text-blue-600">
						<Headphones className="h-5 w-5" />
						<span className="hidden sm:inline">Customer Support</span>
					</div>

					{/* Phone Number */}
					<div className="flex items-center gap-2 font-semibold">
						<PhoneCall className="h-5 w-5" />
						<span className="text-xs sm:text-sm md:text-base">+1-202-555-0104</span>
					</div>
				</div>
			</div>
		</header>
	);
};
export default Header;