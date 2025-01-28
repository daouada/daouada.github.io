export default function Page() {
  return (
    <div>
      <h1 className="font-bold text-4xl text-gray-800">Contact</h1>
      <div className="flex flex-col justify-between mt-12 lg:flex-row">
        <div>
          <div className="space-y-8 text-gray-800">
            <div>
              <h3 className="text-md">Phone number:</h3>
              <p className="font-bold text-lg">(+352) 466 644 5744</p>
            </div>
            <div>
              <h3 className="text-md">Email address:</h3>
              <p className="font-bold text-lg">djamila.aouada@uni.lu</p>
            </div>
            <div>
              <h3 className="text-md">Office address:</h3>
              <p className="font-bold text-lg">Interdisciplinary Centre for Security, Reliability and Trust (SnT)</p>
              <p className="font-bold text-lg">University of Luxembourg</p>
              <p className="font-bold text-lg">Luxembourg</p>
            </div>
            <div>
              <h3 className="text-md">Professional profiles:</h3>
              <div className="flex flex-col space-y-1">
                <a
                  href="https://scholar.google.com/citations?user=WBmJVSkAAAAJ&hl=en"
                  className="inline-block text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  Google Scholar
                </a>
                <a
                  href="https://www.linkedin.com/in/djamilaaouada/?originalSubdomain=lu"
                  className="inline-block text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  LinkedIn
                </a>
                <a
                  href="https://orcid.org/0000-0002-7576-2064"
                  className="inline-block text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  ORCID
                </a>
                <a
                  href="https://x.com/AouadaDjamila"
                  className="inline-block text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  X (Twitter)
                </a>
                <a
                  href="https://www.researchgate.net/profile/Djamila-Aouada"
                  className="inline-block text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  ResearchGate
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-md overflow-hidden mt-12 w-full h-[400px] lg:h-[500px] lg:w-[500px] lg:mt-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7590.6576788206385!2d6.15727387865382!3d49.62582176217694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47954f43994007d1%3A0xe37ee7b8b9febfaf!2sInterdisciplinary%20Centre%20for%20Security%2C%20Reliability%20and%20Trust%20(SnT)!5e1!3m2!1sen!2slu!4v1737157739238!5m2!1sen!2slu"
            width="500"
            height="500"
            className="absolute h-full w-full top-0 left-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
