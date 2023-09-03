"use client";

import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxProps {
  data: User;
}

const UserBox = (props: UserBoxProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { data } = props;

  const handleClick = useCallback(() => {
    setLoading(true);
    axios
      .post("/api/conversation", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversation/${data.data.id}`);
      })
      .finally(() => setLoading(false));
  }, [data.id, router]);

  return (
    <div
      onClick={handleClick}
      className="w-full relative flex items-center space-x-3 p-3  hover:bg-neutral-100 rounded-lg transition cursor-pointer"
    >
      <Avatar user={data} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">{data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
