import data from '@/../data/team.json'
import LinkWithArrow from '@/components/Link'
import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-12">{data.name}</h1>
      <p className="text-gray-700 mb-6">{data.description}</p>
      <LinkWithArrow href="/https://www.uni.lu/snt-en/research-groups/cvi2/" target="_blank" className="mb-12">
        Visit CVI2 Group Website
      </LinkWithArrow>

      <section className="mb-10">
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">PhD Candidates</h3>
          <ul className="space-y-4">
            {data.team.phd.map((member, index) => (
              <li key={index} className={`py-4 ${index === data.team.phd.length - 1 ? '' : 'border-b'}`}>
                <p className="font-semibold text-gray-800">
                  {member.name}{' '}
                  <span className="font-normal text-sm text-gray-600 ml-1">{member.start_year} - present</span>
                </p>
                <p className="text-gray-600">{member.project}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">Postdoctoral Researchers</h3>
          <ul className="space-y-4">
            {data.team.postdoc.map((member, index) => (
              <li key={index} className={`py-4 ${index === data.team.postdoc.length - 1 ? '' : 'border-b'}`}>
                <p className="font-semibold text-gray-800">
                  {member.name}{' '}
                  <span className="font-normal text-sm text-gray-600 ml-1">{member.start_year} - present</span>
                </p>
                <p className="text-gray-600">{member.affiliations?.join(', ')}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">PhD Alumni</h3>
          <ul className="space-y-4">
            {data.alumni.phd.map((alum, index) => (
              <li key={index} className={`py-4 ${index === data.alumni.phd.length - 1 ? '' : 'border-b'}`}>
                <p className="font-semibold text-gray-800">
                  {alum.name} <span className="font-normal text-sm text-gray-600 ml-1">{alum.years}</span>
                </p>
                <p className="text-gray-600">{alum.project}</p>
                <p className="text-gray-600">Current Affiliation: {alum.current_affiliation}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">Postdoctoral Alumni</h3>
          <ul className="space-y-4">
            {data.alumni.postdoc.map((alum, index) => (
              <li key={index} className={`py-4 ${index === data.alumni.postdoc.length - 1 ? '' : 'border-b'}`}>
                <p className="font-semibold text-gray-800">
                  {alum.name} <span className="font-normal text-sm text-gray-600 ml-1">{alum.years}</span>
                </p>
                <p className="text-gray-600">{alum.affiliation}</p>
                <p className="text-gray-600">Current Affiliation: {alum.current_affiliation}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div>
        <h2 className="text-2xl font-bold text-gray-700 mt-8 mb-3">Join Our Team</h2>
        <p className="mt-6">
          We are always looking for talented researchers to join our team. If you are interested in working with us,
          please check our current openings or contact us directly.
        </p>
        <div className="flex space-x-10 mt-4">
          <LinkWithArrow
            target="_blank"
            href="https://recruitment.uni.lu/en/index.html?LOV52=All&SUBDEPT2=All&LOV53=All&keywords=cvi2&Resultsperpage=50&srcsubmit=Search&statlog=1&ID=QMUFK026203F3VBQB7V7VV4S8&mask=karriereseiten&LG=UK"
          >
            view openings
          </LinkWithArrow>
          <LinkWithArrow href="/contact">contact us</LinkWithArrow>
        </div>
      </div>
    </div>
  )
}
