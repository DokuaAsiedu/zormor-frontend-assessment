import React, { useMemo, useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { DetailsPerPeriod } from "./details-per-period";

const DAYS_OF_WEEK = ["mon", "tue", "wed", "thur", "fri", "sat", "sun"];

export function OpenPeriod({
  periods,
  handlePeriods,
}: {
  periods: Period[];
  handlePeriods: (prev: Period[]) => void;
}) {
  const [pointer, setPointer] = useState<number>(0);

  const usedDays = useMemo(() => {
    const arr: string[] = [];

    periods.forEach((item) => arr.push(...item.days));
    return arr;
  }, [periods]);

  const addDay = (day: string) => {
    // get pointer position
    // check if day is included in periods at that position
    const periodsCopy: Period[] = [...periods];
    const periodAtPointer: Period = { ...periodsCopy[pointer] };
    const daysCopy: string[] = periodAtPointer.days;

    if (daysCopy.includes(day)) {
      const index = daysCopy.indexOf(day);
      daysCopy.splice(index, 1);
    } else {
      if (!usedDays.includes(day)) {
        daysCopy.push(day);
      }
    }

    periodAtPointer.days = daysCopy;
    periodsCopy[pointer] = periodAtPointer;

    handlePeriods(periodsCopy);
  };

  const addPeriod = () => {
    const obj: Period = { days: [], start: "", end: "" };
    // console.log(periods)
    const periodsCopy = [...periods];

    periodsCopy.push(obj);

    setPointer(pointer + 1);
    handlePeriods(periodsCopy);
  };

  const handleDelete = (id: number) => {
    const periodsCopy = [...periods];

    periodsCopy.splice(id, 1);
    handlePeriods(periodsCopy);
    setPointer(pointer - 1);
  };

  const handleStart = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const periodsCopy: Period[] = [...periods];
    periodsCopy[id].start = e.target.value;

    handlePeriods(periodsCopy);
  };

  const handleEnd = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const periodsCopy: Period[] = [...periods];
    periodsCopy[id].end = e.target.value;

    handlePeriods(periodsCopy);
  };

  return (
    <div>
      <div className="flex flex-row items-stretch flex-wrap gap-2 text-sm">
        {DAYS_OF_WEEK.map((item, index) => {
          return (
            <button
              type="button"
              key={`item-${index}`}
              className={`h-12 aspect-square grid place-items-center capitalize  border-[1px] border-yellow-500 rounded-full ${usedDays.includes(item) ? "bg-yellow-500" : "bg-white"}`}
              onClick={() => addDay(item)}
            >
              {item}
            </button>
          );
        })}
      </div>

      <>
        {periods.map((item, index) => {
          return (
            <DetailsPerPeriod
              key={`item-${index}`}
              days={item.days}
              handleDelete={() => handleDelete(index)}
              canDelete={periods.length > 1}
              handleStart={(e) => {
                handleStart(e, index);
              }}
              handleEnd={(e) => {
                handleEnd(e, index);
              }}
              start={periods[index].start}
              end={periods[index].end}
            />
          );
        })}

        {usedDays.length < 7 && (
          <GrAddCircle
            className="text-green-500"
            onClick={addPeriod}
          />
        )}
      </>
    </div>
  );
}
