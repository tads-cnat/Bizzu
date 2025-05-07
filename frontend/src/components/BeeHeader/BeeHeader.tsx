import React from "react";

const BeeHeader: React.FC = () => {
	return (
		<header className="flex items-center justify-between bg-white py-4 px-8 shadow-sm">
			<div className="flex items-center">
				<img
					src="/logo.png"
					alt="BIZZU Logo"
					className="w-32"
				/>
			</div>
		</header>
	);
};

export default BeeHeader;
