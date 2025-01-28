export default function ResearchHighlight({
  title,
  img,
  description,
}: {
  title: string
  img: string
  description: string
}) {
  return (
    <div className="lg:max-w-[360px]">
      <h3 className="flex items-center text-xl text-gray-800 mb-4">
        <div/>
        {title}
      </h3>
      <img
        src={img}
        alt="Space Situational Awareness"
        className="mb-4 object-center rounded-md lg:h-[240px] lg:w-[400px]"
      />
      <p>{description}</p>
    </div>
  )
}
