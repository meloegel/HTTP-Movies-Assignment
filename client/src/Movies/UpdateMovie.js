import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialDetails = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
}


const UpdateMovie = props => {
    const { push } = useHistory();
    const { id } = useParams();
    const [details, setDetails] = useState(initialDetails);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log(res.data)
                setDetails(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);


    const handleChange = e => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, details)
        .then(res => {
            props.setMovieList(res.data);
            props.getMovieList();
            push(`/movies/${id}`)
        })
        .catch(err => console.log(err))
    }


    return (
        <div id='updateMovie'>
            <h2 id='updateMovieTitle'>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="Title"
                    value={details.title}
                />
                <div />

                <input
                    type="text"
                    name="director"
                    onChange={handleChange}
                    placeholder="Director"
                    value={details.director}
                />
                <div />

                <input
                    type="text"
                    name="metascore"
                    onChange={handleChange}
                    placeholder="Metascore"
                    value={details.metascore}
                />
                <div />

                <input
                    type="text"
                    name="stars"
                    onChange={handleChange}
                    placeholder="Stars"
                    value={details.stars}
                />
                <div />

                <button className="form-button">Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie;