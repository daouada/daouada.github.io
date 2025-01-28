import researchData from '@/../data/research.json'
import LinkWithArrow from '@/components/Link'

export default function Page() {
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Research</h1>
      <p className="text-gray-700 mb-10">{researchData.description}</p>

      <div className="mb-8">
        <ul className="space-y-4">
          {researchData.research_areas.map((area, index) => (
            <li key={index} className={`py-4 ${index === researchData.research_areas.length - 1 ? '' : 'border-b'}`}>
              <div className="flex flex-col lg:flex-row">
                <img
                  src={area.image}
                  alt="Space Situational Awareness"
                  className="object-center rounded w-full mb-4 lg:w-[400px] lg:h-[250px]"
                />
                <div className="mt-4 md:mt-0 md:ml-8">
                  <p className="font-semibold text-xl text-gray-700">{area.title}</p>
                  <p className="text-gray-600 mt-3">{area.description}</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {area.focus_areas.map((focus, i) => (
                      <li key={i}>{focus}</li>
                    ))}
                  </ul>
                  <LinkWithArrow href="/publications" className="mt-8 lg:mt-16">
                    related publications
                  </LinkWithArrow>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Projects</h2>
        <ul className="space-y-4">
          {researchData.projects.map((project, index) => (
            <li key={index} className={`py-4 ${index === researchData.projects.length - 1 ? '' : 'border-b'}`}>
              <p className="font-semibold text-gray-800">{project.title}</p>
              <p className="text-gray-600 mt-3">{project.description}</p>
              <div className="flex space-x-4 text-sm mt-1">
                <p className="text-gray-600">
                  Funding: <span className="text-gray-800">{project.funding}</span>
                </p>
                <p className="text-gray-600">
                  Duration: <span className="text-gray-800">{project.duration}</span>
                </p>
                <p className="text-gray-600">
                  Budget: <span className="text-gray-800">{project.budget}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Research Facilities</h2>
        <ul className="flex flex-col space-y-4 lg:flex-row lg:space-y-0">
          {researchData.research_facilities.map((facility, index) => (
            <li key={index} className="py-4">
              <p className="font-semibold text-gray-800">{facility.title}</p>
              <p className="text-gray-600 mt-3">{facility.description}</p>
              <img src={facility.image} alt={facility.title} className="rounded mt-4 w-full md:max-w-md" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
