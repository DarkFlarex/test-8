import React, { useCallback, useEffect, useState } from 'react';
import { ApiQuote, QuoteMutation } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import axiosApi from "../../axiosApi";

const initialState: QuoteMutation = {
    author: "",
    category: "star-wars",
    text: "",
};

const QuoteCategories = [
    {title: 'Star Wars', id: 'star-wars'},
    {title: 'Motivational', id: 'motivational'},
];

const MutateQuotes = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [quoteMutation, setQuoteMutation] = useState<QuoteMutation>(initialState);
    const [isLoading, setIsLoading] = useState(false);

    const fetchOneQuote = useCallback(async (id: string) => {
        try {
            const response = await axiosApi.get<ApiQuote>(`/quotes/${id}.json`);
            if (response.data) {
                setQuoteMutation({
                    author: response.data.author,
                    category: response.data.category,
                    text: response.data.text,
                });
            }
        } catch (error) {
            console.error('Error fetching quotes', error);
        }
    }, []);

    useEffect(() => {
        if (id) {
            void fetchOneQuote(id);
        } else {
            setQuoteMutation(initialState);
        }
    }, [id, fetchOneQuote]);

    const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        setQuoteMutation(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const postData = {
                ...quoteMutation,
            };

            if (id) {
                await axiosApi.put(`/quotes/${id}.json`, postData);
            } else {
                await axiosApi.post('/quotes.json', postData);
            }

            navigate('/');
        } catch (e) {
            console.error('Error happened!', e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h1>{id ? 'Edit Quote' : 'Add New Quote'}</h1>
            <form className="AddQuotesForm d-flex flex-column align-items-center justify-content-center"
                  onSubmit={onFormSubmit}>
                <label>Category</label>
                <select
                    name="category"
                    required
                    className="form-control col-10 mb-3"
                    onChange={onFieldChange}
                    value={quoteMutation.category}
                >
                    {QuoteCategories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>
                <label>Author</label>
                <input
                    className="AddAuthorForm-input col-10 mb-3"
                    required
                    type="text"
                    name="author"
                    value={quoteMutation.author}
                    onChange={onFieldChange}
                    placeholder="Author"
                />
                <label>Quote text</label>
                <textarea
                    className="AddTextForm-input col-10 mb-3"
                    required
                    name="text"
                    value={quoteMutation.text}
                    onChange={onFieldChange}
                    placeholder="Text"
                />
                <button
                    className="btn btn-primary d-flex col-2 justify-content-center mt-3 text-start"
                    type="submit"
                    disabled={isLoading}
                >
                    Save
                </button>
            </form>
        </>
    );
};

export default MutateQuotes;