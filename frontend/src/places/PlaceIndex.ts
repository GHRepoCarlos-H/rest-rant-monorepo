import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

interface Place {
    placeId: string;
    name: string;
    pic: string;
    city: string;
    state: string;
    cuisines: string;
}

interface PlaceIndexProps {
    data: Place[];
}

function PlaceIndex({ data }: PlaceIndexProps) {
    const history = useHistory();
    const [places, setPlaces] = useState<Place[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/places`);
            const resData: Place[] = await response.json();
            setPlaces(resData);
        };
        fetchData();
    }, []);

    const placesFormatted = places.map((place) => (
        <div className="col-sm-6 text-center pt-3" key={place.placeId}>
            <h2>
                <button onClick={() => history.push(`/places/${place.placeId}`)}>
                    {place.name}
                </button>
            </h2>
            <p className="text-center pt-3 text-primary">
                {place.cuisines}
            </p>
            <img style={{ maxWidth: 200 }} src={place.pic} alt={place.name} />
            <p className="text-center pt-3">
                Located in {place.city}, {place.state}
            </p>
        </div>
    ));

    return (
        <main>
            <h1>Places to Rant or Rave About</h1>
            <div className="row">
                {placesFormatted}
            </div>
        </main>
    );
}

export default PlaceIndex;
