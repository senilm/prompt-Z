"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({
  prompt,
  creator,
  tag,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const { data: session } = useSession();
  const [copied, setCopied] = useState("");
  const pathname = usePathname()

  const handleCopy = () => {
    setCopied(prompt)
    navigator.clipboard.writeText(prompt)
    setTimeout(()=>setCopied(""),1000)
  }
  
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
          <Image
            src={creator?.image}
            alt="Image of user"
            width={40}
            height={40}
            className="object-contain rounded-full"
          />
          <div className="flex flex-col">
            <h3 className=" font-satoshi font-bold font-gray-900">
              {creator.username}
            </h3>
            <p className=" font-inter text-sm text-gray-500">{creator.email}</p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === prompt
                ? "/assets/icons/tick.svg"
                : "assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="copy"
          />
        </div>
      </div>
      <p className=" text-sm text-gray-700 my-4 font-satoshi text-wrap break-words">{prompt}</p>
      <p
        className=" font-inter text-sm blue_gradient"
        onClick={() => handleTagClick && handleTagClick(tag)}
      >
        {tag}
      </p>
      {session?.user.id === creator._id && pathname === '/profile' && (
        <div className=" mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className=" font-inter text-sm green_gradient  cursor-pointer" onClick={handleEdit}>Edit</p>
          <p className=" font-inter text-sm orange_gradient  cursor-pointer" onClick={handleDelete}>Delete</p>
        </div>
      )}     

    </div>
  );
};

export default PromptCard;
