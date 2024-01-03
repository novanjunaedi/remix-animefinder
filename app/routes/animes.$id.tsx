import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";

export const meta: MetaFunction = () => {
    return [
        { title: "Anime Detail" },
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

// Loader function to fetch data from the API for a specific anime by ID.
// This function only runs on the server-side.
export const loader = async (args: LoaderFunctionArgs) => {
    try {
        // Extract the anime ID from the route parameters
        const { params } = args;
        const animeId = params.id;

        // Fetch details for the specific anime by ID
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}`);
        const animeDetails: Anime = response.data.data; // Adjust this based on the actual structure of the response

        // Return the data as JSON
        return animeDetails;
    } catch (error) {
        // Handle errors here
        console.error("Error fetching anime details:", error);
        throw error;
    }
};

export default function AnimeDetail() {
    const animeDetails = useLoaderData<typeof loader>();

    return (
        <section>
            <div className="bg-light py-3 mb-5">
                <div className="container my-3">
                    <div className="row">
                        <div className="col-lg-auto p-3">
                            <img className="img-fluid rounded-4 d-block mx-auto" src={animeDetails?.images?.webp?.image_url} alt={animeDetails.title} />
                        </div>
                        <div className="col-lg-9 p-3">
                            <h2>{animeDetails.title}</h2>
                            <h5>{animeDetails?.title_japanese}</h5>
                            <p className="my-3">{animeDetails.synopsis}</p>

                            <div className="d-flex gap-2">
                                <span className="badge bg-secondary">{animeDetails?.score}</span>
                                <span className="badge bg-secondary">{animeDetails?.year}</span>
                                <span className="badge bg-secondary">{animeDetails?.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-5">
                {animeDetails?.trailer?.embed_url && (
                    <>
                        <h3 className="mb-3">Watch Trailer</h3>
                        <div className="ratio ratio-16x9">
                            <iframe className="rounded-4" src={animeDetails?.trailer?.embed_url} title="YouTube video" allowFullScreen />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
