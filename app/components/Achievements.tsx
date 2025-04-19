import achievements from '@/public/data/achievements.json';
import contests from '@/public/data/contests.json';

export default function Achievements() {
  return <section className="">
    <article>
      <div className="space-y-4">
        {achievements.map((year, i: number) => (
          <div key={i}>
            <h2 className="">{year.year} // {year.grade}</h2>
            <div className="mt-2 space-y-1">
              {year.items.map((item, j: number) => (
                <div key={j}>
                  <span className="">→ </span>
                  <span className="">
                    {item.title + ' '}
                    {contests[item.title as keyof typeof contests]
                      ? '(' + contests[item.title as keyof typeof contests] + ') '
                      : ''
                    }
                  </span>
                  <span className={`${getAwardColor(item.award)}`}>
                    {item.award}
                  </span>
                  {item.filename !== "" && (
                    <><span className="mr-1">{' '}</span><a className="underline" href={`/certs/${item.filename}`} target="_blank" rel="noopener noreferrer">{'view cert.'}</a></>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  </section>
}

function getAwardColor(award: string) {
  const lowerAward = award.toLowerCase();
  if (lowerAward.includes('gold') || lowerAward.includes('first') || lowerAward.includes('champion')) {
    return 'text-yellow-500';
  }
  if (lowerAward.includes('silver') || lowerAward.includes('second')) {
    return 'text-gray-400';
  }
  if (lowerAward.includes('bronze') || lowerAward.includes('third')) {
    return 'text-orange-600';
  }
  if (lowerAward.includes('distinction') || lowerAward.includes('platinum')) {
    return 'text-purple-400';
  }
  return 'text-green-400';
}

