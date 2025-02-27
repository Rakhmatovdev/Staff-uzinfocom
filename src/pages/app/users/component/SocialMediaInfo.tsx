import React from "react";
import { GithubOutlined, LinkedinOutlined, FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import { User } from "../types/user";

interface SocialMediaInfoProps {
  user: User | undefined;
}

const SocialMediaInfo: React.FC<SocialMediaInfoProps> = ({ user }) => {
  return (
    <div className="my-4 sm:my-7 ml-8">
      {user?.social_media_accounts.map((item, index) => (
        <a
          key={index}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 mb-3"
        >
          {item.social_media === "github" && (
            <GithubOutlined className="text-2xl text-gray-500 hover:text-gray-700" />
          )}
          {item.social_media === "linkedin" && (
            <LinkedinOutlined className="text-2xl text-blue-500 hover:text-blue-700" />
          )}
          {item.social_media === "facebook" && (
            <FacebookOutlined className="text-2xl text-blue-500 hover:text-blue-700" />
          )}
          {item.social_media === "instagram" && (
            <InstagramOutlined className="text-2xl text-rose-500 hover:text-rose-700" />
          )}
          <span>{item.url}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialMediaInfo;