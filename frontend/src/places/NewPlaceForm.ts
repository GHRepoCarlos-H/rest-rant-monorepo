import React, { useState } from "react";
import { useHistory } from "react-router";

interface Place {
    name: string;
    pic: string;
    city: string;
    state: string;
    cuisines: string;
    founded?: number; // assuming founded is a number
}

function NewPlaceForm() {
    const history = useHistory();

    const [place, setPlace] = useState<Place>({
        name: '',
        pic: '',
        city: '',
        state: '',
        cuisines: ''
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            await fetch(`http://localhost:5000/places`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(place)
            });

            history.push('/places');
        } catch (error) {
            console.error('Error adding place:', error);
        }
    }

    return (
        <main>
            <h1>Add a New Place</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Place Name</label>
                    <input
                        required
                        value={place.name}
                        onChange={e => setPlace({ ...place, name: e.target.value })}
                        className="form-control"
                        id="name"
                        name="name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="founded">Year Founded</label>
                    <input
                        required
                        value={place.founded}
                        onChange={e => setPlace({ ...place, founded: Number(e.target.value) })}
                        className="form-control"
                        id="founded"
                        name="founded"
                        type="number"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pic">Place Picture</label>
                    <input
                        value={place.pic}
                        onChange={e => setPlace({ ...place, pic: e.target.value })}
                        className="form-control"
                        id="pic"
                        name="pic"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        value={place.city}
                        onChange={e => setPlace({ ...place, city: e.target.value })}
                        className="form-control"
                        id="city"
                        name="city"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                        value={place.state}
                        onChange={e => setPlace({ ...place, state: e.target.value })}
                        className="form-control"
                        id="state"
                        name="state"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cuisines">Cuisines</label>
                    <input
                        value={place.cuisines}
                        onChange={e => setPlace({ ...place, cuisines: e.target.value })}
                        className="form-control"
                        id="cuisines"
                        name="cuisines"
                        required
                    />
                </div>
                <input className="btn btn-primary" type="submit" value="Add Place" />
            </form>
        </main>
    );
}

export default NewPlaceForm;
