"use client";

import { Hour, ResponseData } from "@/types";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import React, { useRef, useState } from "react";
import HourCard from "./HourCard";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function Hours({ hours }: { hours: Hour[] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  function handleClick(direction: "left" | "right") {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth + 60
          : scrollLeft + clientWidth - 60;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  }

  return (
    // TODO Change to scrollbar instead of arrows and paint it in primary color?
    <Card className="w-[90%] lg:w-2/3">
      <CardHeader>
        <CardTitle className="text-2xl">Hourly forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="group relative">
          <ArrowLeftCircle
            onClick={() => handleClick("left")}
            className={`absolute bottom-0 left-0 top-0 z-40 
            m-auto h-8 w-8 cursor-pointer rounded-full bg-muted 
            text-primary opacity-0 transition 
            hover:scale-110 group-hover:opacity-100 ${!isMoved && "hidden"}`}
          />
          <div
            ref={rowRef}
            className="flex space-x-2 overflow-x-scroll rounded-lg border border-primary
            p-2 scrollbar-hide md:p-4"
          >
            {hours.map((hour, index) => {
              // TODO add UUID for keys
              return <HourCard key={hour.chance_of_rain} hour={hour} />;
            })}
          </div>
          <ArrowRightCircle
            onClick={() => handleClick("right")}
            className={`absolute bottom-0 right-0 top-0 z-40 
            m-auto h-8 w-8 cursor-pointer rounded-full bg-muted 
            text-primary opacity-0 transition 
            hover:scale-110 group-hover:opacity-100`}
          />
        </div>
      </CardContent>
    </Card>
  );
}
