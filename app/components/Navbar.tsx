import Link from "next/link";

export default function Navbar() {
    const links = [
        {
            title: 'Projects',
            href: '#projects',
        },
        {
            title: 'Achievements',
            href: '#achievements',
        },
    ];

    return (
        <nav className="flex flex-row justify-between fixed top-0 w-full h-16 p-4 bg-inherit">
            <div className="mx-4 place-content-center">
                <Link className="text-xl font-extrabold" href="/">DZUIZZ.COM</Link>
            </div>

            <ul className="flex flex-row gap-4 mr-4">
                {links.map((link, index) => (
                    <li key={index} className="place-content-center">
                        <Link href={link.href}>
                            {link.title}
                        </Link>
                    </li>
                ), [])}
            </ul>
        </nav>
    )
}