import React, { ComponentType } from 'react';
import ButtonWithIconOnly from './button/ButtonWithIconOnly';

interface StatsProps {
    stats: string;
    content: string;
   Icon?: ComponentType<any>;    
     onClick?: () => void;          
     className?: string; 
}

function Stats({stats,content,Icon}: StatsProps) {
    return (
        <section className="flex items-center space-x-3 w-[200px] hover:scale-105 p-2 rounded-md hover:shadow-md">
            <ButtonWithIconOnly Icon={Icon}/>
            <div className='flex flex-col'>
                <h1 className='font-semibold  text-[16px]'>{stats}</h1>
                <p className='font-medium  text-[14px]'>{content}</p>
            </div>
        </section>
    );
}

export default Stats;