import Link from "next/link";
import contestsData from "../../public/data/contests.json";
import achievementsData from "../../public/data/achievements.json";

interface Contest {
    [key: string]: string;
}

interface AchievementItem {
    title: string;
    award: string;
    ranking: string;
    filename: string;
}

interface Achievements {
    year: string;
    grade: string;
    items: AchievementItem[];
}

const contests: Contest = contestsData;
const achievements: Achievements[] = achievementsData;

export default function Achievements() {
    return (
        <section className="mb-24">
            <h3 className="py-4 mb-6 bg-cetascean-blue text-slate-50 uppercase font-bold tracking-wider sticky top-0">Achievements</h3>
            <ul>
            {achievements.map((grp, index) => (
                <li className="text-slate-400" key={index}>
                    In <strong className="text-slate-50">{grp.year}</strong>, I was in <strong className="text-slate-50">{grp.grade}</strong>.
                    I participated in the following contests: <br />
                    <ul>
                    {grp.items.map((item, index) =>
                        <li key={index}>
                            <br />
                            <strong className="text-slate-50">{item.title}</strong>{" "}
                            <i>({contests[item.title]})</i>{" - "}
                            <strong className={item.award}>{item.award}</strong>{" "}
                            <i>{item.ranking}</i>{" "}
                            {item.filename == "" ? (<></>) : (
                                <Link
                                    className="decoration-accent underline decoration-2 underline-offset-4 duration-150 hover:underline-offset-8 active:underline-offset-8"
                                    href={"certs/" + item.filename} target="_blank">
                                    view cert.
                                </Link>
                            )}
                            <br />
                        </li>
                    )}
                    </ul>
                    <br /><br /><br /><br />
                </li>
            ))}
            </ul>
        </section>
    )
}