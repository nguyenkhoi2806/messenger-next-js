"use client";

import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
  label?: string;
  icon: any;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem = (props: MobileItemProps) => {
  const { label, icon: Icon, href, onClick, active } = props;

  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      className={clsx(
        "group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100",
        { "bg-gray-100 text-black": active }
      )}
      onClick={handleClick}
      href={href || ""}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
