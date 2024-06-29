import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { ApiQuotes, Quote } from '../../types';

const GetQuotes = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [isLoading, setLoading] = useState(true);
    const { category } = useParams();

    const fetchQuotes = useCallback(async () => {
        try {
            const categoryUrl = `/quotes.json${category ? `?orderBy="category"&equalTo="${category}"` : ''}`;
            const response = await axiosApi.get<ApiQuotes | null>(categoryUrl);
            const quotesResponse = response.data;

            if (quotesResponse !== null) {
                const posts: Quote[] = Object.keys(quotesResponse).map((id: string) => ({
                    ...quotesResponse[id],
                    id,
                }));
                setQuotes(posts);
            } else {
                setQuotes([]);
            }
        } catch (error) {
            console.error('Error fetching quotes', error);
        } finally {
            setLoading(false);
        }
    }, [category]);

    useEffect(() => {
        void fetchQuotes();
    }, [fetchQuotes]);

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }
    const removePost = async (id: string) => {
        await axiosApi.delete(`/quotes/${id}.json`);
        setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== id));
    };

    return (
        <div className="d-flex">
            <nav className="col-3 mt-5">
                <ul>
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link link-primary">
                            All
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/quotes/star-wars" className="nav-link link-primary">
                            Star Wars
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/quotes/motivational" className="nav-link link-primary">
                            Motivational
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/quotes/famous_people" className="nav-link link-primary">
                            Famous people
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/quotes/saying" className="nav-link link-primary">
                            Saying
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/quotes/humour" className="nav-link link-primary">
                            Humour
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="cards col-9">
                {category ? (
                    <h1>{category}</h1>
                ) : (
                    <h1>All</h1>
                )}
                {quotes.length > 0 ? (
                    quotes.map((quote) => (
                        <div className="card mb-2 Post" key={quote.id}>
                            <div className="row g-0 text-start p-3">
                                <p className="mb-2">Quote: "{quote.text}"</p>
                                <span className="mb-2">Author: <strong>{quote.author}</strong></span>
                                <button onClick={() => removePost(quote.id)} className="btn btn-danger me-5 w-25">Delete</button>
                                <Link to={`/quotes/${quote.id}/edit`} className="btn btn-sm btn-primary w-25">Edit</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>Нет цитат в категории "{category}"</h1>
                )}
            </div>
        </div>
    );
};

export default GetQuotes;
