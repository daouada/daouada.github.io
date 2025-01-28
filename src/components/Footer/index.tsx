import Link from 'next/link'
import contactData from '@/../data/contact.json'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto pt-12 px-4">
        <div className="flex flex-col lg:flex-row space-y-12 lg:space-y-0 lg:justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-6 md:text-xl md:mb-8">RESOURCES</h3>
            <ul className="space-y-3">
              <li>
                <Link href="publications" className="hover:text-blue-300">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="research" className="hover:text-blue-300">
                  Research
                </Link>
              </li>
              <li>
                <Link href="teaching" className="hover:text-blue-300">
                  Teaching
                </Link>
              </li>
              <li>
                <Link href="news" className="hover:text-blue-300">
                  News
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-lg mb-6 md:text-xl md:mb-8">FOLLOW</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://scholar.google.com/citations?user=WBmJVSkAAAAJ&hl=en"
                  target="_blank"
                  className="hover:text-blue-300"
                >
                  Google Scholar
                </a>
              </li>
              <li>
                <a href="https://x.com/AouadaDjamila" target="_blank" className="hover:text-blue-300">
                  X (Twitter)
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/djamilaaouada" target="_blank" className="hover:text-blue-300">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://orcid.org/0000-0002-7576-2064" target="_blank" className=" hover:text-blue-300">
                  ORCID
                </a>
              </li>
            </ul>
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-lg md:text-xl mb-6 md:mb-8">CONTACT</h3>
            <div>
              <p>{contactData.phone}</p>
              <a href={`mailto:${contactData.email}`} className="mt-1 hover:text-blue-300">
                {contactData.email}
              </a>
              <address className="not-italic mt-7">
                <p>University of Luxembourg</p>
                <p className="mt-1">Interdisciplinary Centre for Security, Reliability and Trust (SnT)</p>
              </address>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-14 py-3">
        <p className="text-center text-xs md:text-sm">© {currentYear} Prof. Djamila Aouada. All rights reserved.</p>
      </div>
    </footer>
  )
}
