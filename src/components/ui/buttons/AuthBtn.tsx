import React from 'react';
import { handleSubmit } from "@/types/calculator";

// Define TypeScript interface for the properties
interface Props {
  title: string;
}

const MyButton: React.FC<Props> = ({ title }) => {
  // Define CSS classes for styling the button
  const baseClasses =
    "inline-flex w-full items-center justify-center gap-x-2 rounded-lg px-4 py-3 text-sm font-bold dark:text-white text-neutral-700 focus-visible:ring outline-none transition duration-300";
  const borderClasses = "border border-transparent";
  const bgColorClasses = "bg-yellow-400";
  const hoverClasses = "hover:bg-yellow-500";
  const fontSizeClasses = "2xl:text-base";
  const disabledClasses = "disabled:pointer-events-none disabled:opacity-50";
  const ringClasses = "ring-zinc-500 dark:ring-zinc-200";

  return (
    <button
      type="submit"
      onClick={(e) => handleSubmit(e)}
      className={`${baseClasses} ${borderClasses} ${bgColorClasses} ${hoverClasses} ${fontSizeClasses} ${disabledClasses} ${ringClasses}`}
    >
      {title}
    </button>
  );
};

export default MyButton;
