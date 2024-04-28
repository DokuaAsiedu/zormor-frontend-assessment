import { MdRemoveCircleOutline } from "react-icons/md";

export function DetailsPerPeriod({days, handleDelete, canDelete, handleStart, handleEnd, start, end}: DetailsPerPeriod) {
  return (
    <div className="grid grid-cols-3 group">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 content-center">
          <label htmlFor="start">Start: </label>
          <input type="time" name="start" id="start" onChange={handleStart} value={start}/>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 content-center">
          <label htmlFor="end">End: </label>
          <input type="time" name="end" id="end" onChange={handleEnd} value={end}/>
        </div>
      </div>

      <div className="capitalize">{days.join(", ")}</div>

      {canDelete && <MdRemoveCircleOutline className="text-red-500 hidden group-hover:block" onClick={handleDelete}/>}
    </div>
  )
}