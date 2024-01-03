import { ActionFunction, redirect, type MetaFunction } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { db } from '../utils/db.server';

export const meta: MetaFunction = () => {
    return [
        { title: "Add Request" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();

    await db.request.create({
        data: {
            name: formData.get('name'),
            title: formData.get('title'),
            reason: formData.get('reason')
        },
    });

    return redirect('/request');
};

export default function AddRequest() {
    const { state } = useNavigation();
    const isLoading = state === "submitting";

    return (
        <section className="py-5">
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <h2 className="mb-5">Add Request</h2>

                        <Form method="post">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Your Name</label>
                                <input type="text" className="form-control" name="name" id="name" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Anime Title</label>
                                <input type="text" className="form-control" name="title" id="title" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="reason" className="form-label">Reason</label>
                                <textarea className="form-control" placeholder="Leave a reason here" name="reason" id="reason" rows={5} required />
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading ? 'Submitting...' : 'Post Request'}
                            </button>
                        </Form>
                    </div>
                </div>

            </div>
        </section>
    );
}
