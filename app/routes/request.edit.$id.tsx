import { ActionFunction, redirect, type MetaFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { db } from '../utils/db.server';
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
    return [
        { title: "Edit Request" },
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
    const requestId = args.params.id;

    const request: Request | null = await db.request.findUnique({
        where: {
            id: requestId
        }
    });

    // Check if the request is found
    if (request) {
        return json({ request });
    } else {
        // Handle the case where the request with the specified ID is not found
        return redirect('/request');
    }
};

export const action: ActionFunction = async ({ request, params }) => {
    const requestId = params.id;
    const formData = await request.formData();

    // Update the request by ID
    await db.request.update({
        where: {
            id: requestId,
        },
        data: {
            name: formData.get('name'),
            title: formData.get('title'),
            reason: formData.get('reason'),
        },
    });

    return redirect('/request');
};

export default function EditRequest() {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [reason, setReason] = useState('');

    const { request } = useLoaderData<typeof loader>();
    const { state } = useNavigation();

    const isLoading = state === "submitting";

    useEffect(() => {
        if (request) {
            setName(request?.name);
            setTitle(request.title);
            setReason(request.reason);
        };
    }, [request]);

    return (
        <section className="py-5">
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <h2 className="mb-5">Edit Request</h2>

                        <Form method="post">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Your Name</label>
                                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} name="name" id="name" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Anime Title</label>
                                <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} value={title} name="title" id="title" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="reason" className="form-label">Reason</label>
                                <textarea className="form-control" placeholder="Leave a reason here" onChange={(e) => setReason(e.target.value)} value={reason} name="reason" id="reason" rows={5} required />
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? 'Submitting...' : 'Update Request'}
                            </button>
                        </Form>
                    </div>
                </div>

            </div>
        </section>
    );
}
