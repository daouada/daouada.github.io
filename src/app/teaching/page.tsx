import teachingData from '@/../data/teaching.json'

export default function Page() {
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Teaching Philosophy</h1>
      <div className="mb-10">
        {teachingData.description.map((description, i) => (
          <p className="text-gray-700 mb-6" key={i}>
            {description}
          </p>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Current Courses</h2>
        <ul className="space-y-4">
          {teachingData.current_courses.map((course, index) => (
            <li key={index} className={`py-4 ${index === teachingData.current_courses.length - 1 ? '' : 'border-b'}`}>
              <p className="font-semibold text-gray-800">{course.title}</p>
              <div className="flex flex-col justify-start items-start space-y-3 mt-3 lg:flex-row lg:space-y-0 lg:space-x-16 lg:mt-0">
                <div>
                  <p className="text-gray-600 mb-1">Programs:</p>
                  <ul className="list-disc pl-5 text-gray-600">
                    {course.programs.map((program, i) => (
                      <li className="text-gray-800" key={i}>
                        {program}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-gray-600">Schedule:</p>
                  <p className="text-gray-800">{course.schedule.join(', ')}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Past Courses</h2>
        <ul className="space-y-4">
          {teachingData.past_courses.map((course, index) => (
            <li key={index} className={`py-4 ${index === teachingData.past_courses.length - 1 ? '' : 'border-b'}`}>
              <p className="font-semibold text-gray-800 mb-1">{course.title}</p>
              {course.topics && (
                <>
                  <p className="text-gray-600">Topics:</p>
                  <ul className="list-disc pl-5 text-gray-600">
                    {course.topics.map((topic, i) => (
                      <li className="text-gray-600" key={i}>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <p className="text-gray-600 mt-1">Institution: {course.institution}</p>
              <p className="text-gray-600 mt-1">Schedule: {course.period.join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
