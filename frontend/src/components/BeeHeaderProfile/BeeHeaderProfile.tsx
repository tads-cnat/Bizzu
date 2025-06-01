const BeeHeaderProfile: React.FC = () => {
	return (
		<>
			<div className="flex min-w-0 gap-x-4">
				<img
					alt=""
					className="size-12 flex-none rounded-full bg-gray-50"
				/>
				<div className="min-w-0 flex-auto">
					<p className="text-sm/6 font-semibold text-gray-900">{}</p>
					<p className="mt-1 truncate text-xs/5 text-gray-500">{}</p>
				</div>
			</div>
		</>
	);
};

export default BeeHeaderProfile;
