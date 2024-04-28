import { MdRemoveCircleOutline } from "react-icons/md";

export function DetailsPerPeriod({
  days,
  handleDelete,
  canDelete,
  handleStart,
  handleEnd,
  start,
  end,
}: DetailsPerPeriod) {
  return (
    <div className="grid grid-cols-5 group">
      <div className="col-span-2 grid grid-cols-1 md:grid-cols-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 content-center justify-items-start">
          <label htmlFor="start">Start: </label>
          <input
            type="time"
            name="start"
            id="start"
            onChange={handleStart}
            value={start}
            className="sm:justify-self-start"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 content-center justify-items-start">
          <label htmlFor="end">End: </label>
          <input
            type="time"
            name="end"
            id="end"
            onChange={handleEnd}
            value={end}
            className="sm:justify-self-start"
          />
        </div>
      </div>

      <div className="col-span-2 capitalize">{days.join(", ")}</div>

      {canDelete && (
        <MdRemoveCircleOutline
          className="col-span-1 text-red-500 hidden group-hover:block"
          onClick={handleDelete}
        />
      )}
    </div>
  );
}
