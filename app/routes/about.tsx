import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "About" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export default function About() {
    return (
        <section className="py-5">
            <div className="container text-center">

                <h2>About</h2>
                <p className="mb-5">Anime Finder is an app for searching Anime information or reference.</p>

                <img className="w-50 img-fluid rounded-4 d-block mx-auto" src="https://studio.mrngroup.co/storage/app/media/Prambors/Editorial%203/Anime-20230828121723.webp" alt="" />
            </div>
        </section>
    );
}
