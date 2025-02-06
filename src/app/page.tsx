import newsData from '@/../data/news.json'
import homeData from '@/../data/home.json'
import mediaData from '@/../data/media.json'

import LinkWithArrow from '@/components/Link'
import ResearchHighlight from '@/components/ResearchHighlight'
import Button from '@/components/Button/Button'

export default function Page() {
  const getLatestNews = (n: number = 3) => {
    const items = []
    for (const yearData of newsData.news) {
      for (const item of yearData.items) {
        items.push(item)
        if (items.length === n) {
          return items
        }
      }
    }
    return items
  }

  const latestNews = getLatestNews(4)

  return (
    <div>
      <div className="flex flex-col xl:flex-row">
        {/* Profile */}
        <div>
          <div className="flex flex-col items-center lg:flex-row lg:items-stretch">
            <img
              src="/profile.jpeg"
              alt="profile"
              className="object-cover rounded-xl h-[300px] xl:h-[250px] 2xl:h-[300px]"
            />
            <div className="mt-12 lg:mt-0 lg:ml-10">
              <p>{homeData.description_1}</p>
              <p className="mt-8">{homeData.description_2}</p>
              <div className="space-x-3 mt-8">
                <Button href="/research" variant="solid">
                  Research
                </Button>
                <Button href="/contact" variant="outline">
                  Contact
                </Button>
                <Button href="/resume.pdf" target="_blank" variant="outline">
                  Resume
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* News */}
        <div className="mt-16 xl:mt-0 xl:ml-20">
          <h2 className="border-b font-semibold text-2xl text-gray-700 mb-4 pb-2 w-full xl:border-none xl:text-xl xl:pb-0 xl:w-[400px]">
            Latest News
          </h2>
          {latestNews.map((item, index) => (
            <div key={item.title} className={`py-4 ${index !== latestNews.length - 1 ? 'border-b' : ''}`}>
              <p className="text-sm xl:text-xs text-gray-600">{item.date}</p>
              <p className="xl:text-sm mt-3">{item.content}</p>
            </div>
          ))}
          <LinkWithArrow href="/news" className="mt-4">
            view all news
          </LinkWithArrow>
        </div>
      </div>

              {/* News */}
              <div className="mt-16 xl:mt-0 xl:ml-20">
          <h2 className="border-b font-semibold text-2xl text-gray-700 mb-4 pb-2 w-full xl:border-none xl:text-xl xl:pb-0 xl:w-[400px]">
            Latest News
          </h2>
          {latestNews.map((item, index) => (
            <div key={item.title} className={`py-4 ${index !== latestNews.length - 1 ? 'border-b' : ''}`}>
              <p className="text-sm xl:text-xs text-gray-600">{item.date}</p>
              <p className="xl:text-sm mt-3">{item.content}</p>
            </div>
          ))}
          <LinkWithArrow href="/media" className="mt-4">
            view all news
          </LinkWithArrow>
        </div>
      </div>


      {/* Research Highlights */}
      <div className="mt-16">
        <h2 className="border-b font-bold text-2xl text-gray-700 pb-2">Research Highlights</h2>
        <div className="flex justify-between flex-wrap">
          {homeData.research_highlights.map((researchHighlight, index) => (
            <div key={index} className="mt-10">
              <ResearchHighlight
                title={researchHighlight.title}
                img={researchHighlight.img}
                description={researchHighlight.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
