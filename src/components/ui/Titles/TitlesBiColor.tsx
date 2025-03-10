import React from 'react';

interface TitlesBiColorProps {
    title: string;
    subtitle: string;
    text: string;
}

const TitlesBiColor: React.FC<TitlesBiColorProps> = ({ title, subtitle, text }) => {
    return (
        <h1 className={`text-[#002C6A] mt-[2rem] mb-[1rem] text-${text} font-bold uppercase text-2xl`}>
        {title}  <span className="text-red-500">{subtitle}</span>
    </h1>
    );
};

export default TitlesBiColor;