import React from "react";

interface UserProfileProps {
	profilePicUrl: string;
	username: string;
}

const UserProfile: React.FC<UserProfileProps> = ({profilePicUrl, username}) => {
	return (
		<div className="flex items-center">
			<img
				src={profilePicUrl}
				alt={`Foto de ${username}`}
				className="w-8 h-8 rounded-full object-cover"
			/>
			<span className="ml-2 font-medium text-gray-800">{username}</span>
		</div>
	);
};

export default UserProfile;
