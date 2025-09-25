import Facebook from "@/public/assets/images/facebook-02.png";
import Instagram from "@/public/assets/images/instagram.png";
import Twitter from "@/public/assets/images/new-twitter.png";
import Image from "next/image";
import SubscribeButton from "../common/button/SubscribeButton";
import { useState } from "react";

const Footer: React.FC = () => {
	const [subscribeMessage, setSubscribeMessage] = useState("");
	const [subscribe, setSubscribe] = useState({ email: "" });

	const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!subscribe.email) {
			setSubscribeMessage("Email is required for subscription 😒");
			setTimeout(() => setSubscribeMessage(""), 2000); // Clear message after 2s
			return;
		}

		setSubscribeMessage("You are subscribed to our newsletter 🎉");
		console.log("Subscribed", subscribe);

		setTimeout(() => {
			setSubscribeMessage("")
			setSubscribe({ email: "" })
		}

			, 2000); // Clear message after 2s
	};
	return (
		<footer className="bg-[#191C1F] text-[#77878F] px-10 py-12 md:px-16 max-h-[393px] overflow-y-auto">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
				{/* Brand Info */}
				<section>
					<h2 className="text-5xl font-bold text-white mb-4">Shoppers.</h2>
					<p className="text-sm leading-relaxed mb-6">
						Your one-stop marketplace for all shopping needs. Quality product,
						competitive prices, fast delivery.
					</p>
					<div className="flex space-x-4">
						<a href="https://facebook.com" className="hover:text-white">
							<Image src={Facebook} alt="Facebook" className="h-5 w-5" />
						</a>
						<a href="https://twitter.com" className="hover:text-white">
							<Image src={Twitter} alt="Twitter" className="h-5 w-5" />
						</a>
						<a href="https://instagram.com" className="hover:text-white">
							<Image src={Instagram} alt="Instagram" className="h-5 w-5" />
						</a>
					</div>
				</section>
				{/* Resources */}
				<section>
					<h3 className="font-semibold text-white mb-4">RESOURCES</h3>
					<ul className="space-y-2">
						<li><a href="#" className="hover:text-white hover:translate-x-1.5 transition duration-500 ease-in-out">Blog</a></li>
						<li><a href="#" className="hover:text-white hover:translate-x-1.5 transition duration-500 ease-in-out">FAQ</a></li>
						<li><a href="#" className="hover:text-white hover:translate-x-1.5 transition duration-500 ease-in-out">Support</a></li>
						<li><a href="#" className="hover:text-white hover:translate-x-1.5 transition duration-500 ease-in-out">Privacy Policy</a></li>
					</ul>
				</section>
				{/* Quick Links */}
				<section>
					<h3 className="font-semibold text-white mb-4">QUICK LINKS</h3>
					<ul className="space-y-2">
						<li><a href="/" className="hover:text-white hover:translate-x-1.5 transition duration-500 ease-in-out">Home</a></li>
						<li><a href="/catalog" className="hover:text-white hover:translate-x-1.5 transition duration-500 ease-in-out">Catalog</a></li>
						<li><a href="/categories" className="hover:text-white hover:translate-x-1.5 transition duration-500 ease-in-out">Category</a></li>
						<li><a href="/about" className="hover:text-white hover:translate-x-1.5 transition duration-500 ease-in-out">About Us</a></li>
						<li><a href="#" className="text-[#A95F21] font-medium hover:text-white flex items-center gap-1">Browse All Product →</a></li>
					</ul>
				</section>
				{/* Customer Support */}
				<section className="w-[350px]">
					<h3 className="text-xl font-semibold mb-4 text-white">Stay Updated</h3>
					<p>Subscribe to our newsletter for the latest products and offers.</p>
					<form className="flex flex-col space-y-3" onSubmit={handleSubscribe}>
						<input onChange={(e) => setSubscribe({ email: e.target.value })} value={subscribe.email} name="email" type="email" placeholder="Enter your email address" className="text-gray-800 p-2 bg-white border-2 focus:*:border-gray-200 border-gray-200 rounded-lg" />
						<SubscribeButton label="Subscribe Now" />
						<p className="py-1 text-[#F59D55] font-semibold">{subscribeMessage}</p>
					</form>
				</section>
			</div>
			{/* Mobile Bottom Bar */}
			<section className="border-t-1 border-gray-300 block space-y-4 lg:space-y-0  lg:flex justify-center text-center lg:justify-around p-6 mt-6 lg:items-center">
				<p className="text-gray-500 text-sm">
					© {new Date().getFullYear()} Shoppers. All rights reserved.
				</p>
				<div className="flex space-x-4 items-center justify-center">
					<p className="text-gray-500 text-sm">Privacy Policy</p>
					<p className="text-gray-500 text-sm">Terms of Service</p>
				</div>
			</section>
		</footer>
	);
};
export default Footer;