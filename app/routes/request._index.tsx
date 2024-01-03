import { LoaderFunctionArgs, json, type MetaFunction, ActionFunction } from "@remix-run/node";
import { Form, Link, useLoaderData, useSubmit } from "@remix-run/react";
import { db } from '../utils/db.server';
import { formatDate } from '../utils/helper';

export const meta: MetaFunction = () => {
    return [
        { title: "Request Anime" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

interface Request {
    id: number;
    title: string;
    name: string;
    reason: string;
    createdAt: Date;
}

export const loader = async (args: LoaderFunctionArgs) => {
    const requests: Request[] = await db.request.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return json(requests);
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const requestId = formData.get('id');

    await db.request.delete({
        where: {
            id: requestId
        }
    });

    return null;
};

export default function RequestedAnimes() {
    const requests = useLoaderData<Request[]>();
    const submit = useSubmit();

    const onSubmit = (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const isConfirmed = confirm('Are you sure wants to delete this request?');

        if (!isConfirmed) return;
        submit(formData, { method: 'post' });
    };

    return (
        <section className="py-5">
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="d-flex justify-content-between">
                            <h2 className="mb-4">Requested Anime{requests?.length > 1 ? 's' : ''}:</h2>
                            <div className="div">
                                <Link className="btn btn-primary" to="/request/add">Add Request</Link>
                            </div>
                        </div>

                        {requests?.length < 1 && (
                            <p className="text-center my-5">No request yet</p>
                        )}

                        {requests?.map((request) => {
                            return (
                                <div className="card my-3" key={request.id}>
                                    <div className="card-body">
                                        <h5>{request.title}</h5>
                                        <p>Requested by {request.name} {formatDate(request.createdAt)}</p>
                                        <p>{request.reason}</p>
                                    </div>
                                    <div className="card-footer bg-white d-flex gap-2 justify-content-end">
                                        <Link className="btn btn-outline-success btn-sm" to={`/request/edit/${request.id}`}>Edit</Link>
                                        <Form method="post" onSubmit={onSubmit}>
                                            <input type="hidden" name="id" value={request.id} />
                                            <button type="submit" className="btn btn-outline-danger btn-sm">Delete</button>
                                        </Form>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
