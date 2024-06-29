import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { ApiQuotes, Quote } from '../../types';

const GetQuotes = () => {
    const { category }: { category?: string } = useParams();
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [isLoading, setLoading] = useState(true);

    const fetchQuotes = useCallback(async () => {
        try {
            const response = await axiosApi.get<ApiQuotes | null>('/quotes.json');
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
            // Handle error state here
        } finally {
            setLoading(false);
        }
    }, [category]);

    useEffect(() => {
        void fetchQuotes();
    }, [category, fetchQuotes]);

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="d-flex">
            <nav className="col-3">
                <ul>
                    <li>
                        <NavLink to="/" className="nav-link">
                            All
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/quotes/star-wars" className="nav-link">
                            StarWars
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/quotes/motivational" className="nav-link">
                            Motivational
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="cards col-9">
                {quotes.map((quote) => (
                    <div className="card mb-2 Post" key={quote.id}>
                        <h1>{quote.category}</h1>
                        <div className="row g-0 text-start p-3">
                            <p className="Post-title">"{quote.text}"</p>
                            <span>----{quote.author}</span>
                            <Link to={`/quotes/${quote.id}/edit`} className="btn btn-sm btn-primary w-25">
                                Edit
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GetQuotes;
