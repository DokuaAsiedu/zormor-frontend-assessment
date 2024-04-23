export function LocationCard({data}) {
  return (
    <div className="bg-gray-50 rounded-lg p-2">
      <p><span className="capitalize">{data.name}</span>, <span>{data.location}</span></p>
      <p>{data.description}</p>
    </div>
  )
}