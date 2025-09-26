import React, { useState } from "react";
import CountUp from "react-countup";

interface StatsProps {
  stats: string;   // e.g. "50k+", "99.9%", "24/7"
  content: string;
  className?: string;
}

function Stat({ stats, content, className }: StatsProps) {
  const [start, setStart] = useState(false);

  // Extract number part (if any)
  const numericValue = parseFloat(stats.replace(/[^\d.]/g, ""));
  const isNumber = !isNaN(numericValue) && !stats.includes("/");

  return (
    <div
      className={`flex flex-col items-center justify-center text-center space-y-1 ${className}`}
      onMouseEnter={() => setStart(true)}
    >
      <h1 className="font-bold text-[35px] text-[#F59D55]">
        {isNumber ? (
          start ? (
            <CountUp
              end={numericValue}
              duration={2}
              decimals={stats.includes("%") ? 1 : 0}
              suffix={
                stats.includes("%")
                  ? "%"
                  : stats.includes("+")
                  ? "+"
                  : stats.includes("k")
                  ? "k"
                  : ""
              }
            />
          ) : (
            stats
          )
        ) : (
          stats // fallback for non-numeric like 24/7
        )}
      </h1>
      <p className="font-medium text-[20px] text-[#000000]">{content}</p>
    </div>
  );
}

export default Stat;