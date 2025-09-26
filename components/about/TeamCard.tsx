import React, { ComponentType } from "react";
import ButtonWithIconOnly from "@/components/common/button/ButtonWithIconOnly";

interface ValueProps {
  name: string;
  role: string;
  content: string;
  Icon?: ComponentType<any>;
  className?: string;
}

function TeamCard({ name, content, Icon,role }: ValueProps) {
  return (
    <section className="flex flex-col items-center lg:w-[280px] w-full hover:scale-105 hover:rotate-8 px-4 py-10 rounded-md hover:shadow-md bg-gray-200 transition duration-500 ease-in-out">
      <ButtonWithIconOnly Icon={Icon} />
      <h1 className="font-semibold  text-[20px] my-2">{name}</h1>
      <h1 className="font-semibold text-[#F59D55] text-[18px] mb-4">{role}</h1>
      <p className="font-medium  text-[14px] text-center">{content}</p>
    </section>
  );
}


export default TeamCard;