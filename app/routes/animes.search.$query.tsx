import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import axios from "axios";
import CardAnime from "~/components/home/CardAnime/CardAnime";

export const meta: MetaFunction = () => {
    return [
        { title: "Movie App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

type Anime = {
    id: number;
    title: string;
    rating: number;
    score: number;
    images: object;
    mal_id: number;
    webp: object;
};

// Loader function to fetch data from the API.
// This function only run on the server-side.
export const loader = async (args: LoaderFunctionArgs) => {
    try {
        // Extract the anime ID from the route parameters
        const { params } = args;
        const query = params.query;

        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}&limit=24`);
        const pagination = response.data.pagination;
        const animes: Anime[] = response.data.data;

        // Return the data as JSON
        return { pagination, animes };
    } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
        throw error;
    }
};

export default function Index() {
    // Get the data from the Loader function
    const { pagination, animes } = useLoaderData<typeof loader>();

    return (
        <section className="py-5">
            <div className="container">

                <h1>Results</h1>

                <div className="row my-5">
                    {animes.map((anime, index) => {
                        return (
                            <div className="col-6 col-md-4 col-lg-3 col-xl-2 p-2" key={index}>
                                <Link className="link" to={`/animes/${anime.mal_id}`}>
                                    <CardAnime
                                        thumbnail={anime?.images?.webp?.image_url}
                                        title={anime.title}
                                        score={anime.score}
                                    />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
