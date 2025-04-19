import achievements from '@/public/data/achievements.json';
import contests from '@/public/data/contests.json';

export default function Achievements() {
  return (
    <section className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Achievements</h1>

      <div className="relative border-l-2 border-[var(--text-color)]">
        {achievements.map((year, i) => (
          <div key={i} className="relative pl-4 pb-8 last:pb-0">
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[var(--accent-color)]"></div>
            <h2 className="text-lg font-semibold mb-3">
              {year.year} <span className="text-gray-500 ml-2">// {year.grade}</span>
            </h2>

            <div className="space-y-3">
              {year.items.map((item, j) => (
                <div key={j} className="flex items-baseline">
                  <span className="text-blue-500 mr-2">→</span>
                  <div className="flex flex-wrap items-baseline">
                    <span className="font-medium mr-1">
                      {item.title}
                    </span>
                    {contests[item.title as keyof typeof contests] && (
                      <span className="text-sm text-gray-500 mr-1">
                        ({contests[item.title as keyof typeof contests]})
                      </span>
                    )}
                    <span className={`text-sm font-medium ${getAwardColor(item.award)}`}>
                      {item.award}
                    </span>

                    {item.filename && (
                      <a
                        className="ml-2 text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                        href={`/certs/${item.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="underline">view cert.</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
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
