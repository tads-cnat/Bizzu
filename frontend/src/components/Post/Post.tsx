import React from "react";
import BeeTags from "../BeeTags/BeeTags";
import UserProfile from "../UserProfile/UserProfile"

interface Tag {
	label: string;
	color: string;
}

interface PostProps {
	username: string;
	profilePicUrl: string;
	timeAgo: string;
	content: string;
	imageUrl?: string;
	tags: Tag[];
	likesCount: number;
	commentsCount: number;
}

const Post: React.FC<PostProps> = ({
	username,
	profilePicUrl,
	timeAgo,
	content,
	imageUrl,
	tags,
	likesCount,
	commentsCount,
}) => {
	return (
		<div className="bg-white shadow rounded-lg p-4 mb-4">
			<div className="flex items-center mb-2">
				<UserProfile
					profilePicUrl={profilePicUrl}
					username={username}
				/>
				<span className="text-sm text-yellow-500 ml-2">{timeAgo}</span>
			</div>

			<p className="mb-3">{content}</p>

			{imageUrl && (
				<img
					src={imageUrl}
					alt="Imagem do post"
					className="rounded-lg mb-3 w-full object-cover"
				/>
			)}

			<div className="flex items-center justify-between text-sm">
				<div>
					{likesCount} Curtidas • {commentsCount} Comentários
				</div>

				<div className="flex gap-1 flex-wrap">
					{tags.map((tag, index) => (
						<BeeTags
							key={index}
							label={tag.label}
							color={tag.color}
						/>
					))}
				</div>
			</div>

			<div className="mt-2">
				<input
					type="text"
					placeholder="Faça um comentário"
					className="w-full p-2 bg-gray-100 rounded-lg outline-none"
				/>
			</div>
		</div>
	);
};

export default Post;
