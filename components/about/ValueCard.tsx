import React, { ComponentType } from "react";
import ButtonWithIconOnly from "@/components/common/button/ButtonWithIconOnly";

interface ValueProps {
  value: string;
  content: string;
  Icon?: ComponentType<any>;
  className?: string;
}

function ValueCard({ value, content, Icon }: ValueProps) {
  return (
    <section className="flex flex-col items-center hover:rotate-8 space-y-3 lg:w-[250px] w-[200px] hover:scale-105 px-4 py-10 rounded-md hover:shadow-md bg-gray-200 transition duration-300 ease-in-out">
      <ButtonWithIconOnly Icon={Icon} />
      <h1 className="font-semibold  text-[16px]">{value}</h1>
      <p className="font-medium  text-[14px] text-center">{content}</p>
    </section>
  );
}


export default ValueCard;