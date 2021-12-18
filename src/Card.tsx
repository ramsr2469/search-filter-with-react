import React, {useEffect, useState} from 'react'
import './Card.css';

import axios from 'axios';

function Card({starWar}:any) {
//console.log(starWar.url);
    const [properties, setProperties] = useState<any>({});
    useEffect(() => {
       const fetchStarInfo = async () => {
          const response: any = await axios.get(starWar?.url);
          const {properties} = await response?.data?.result;
           setProperties(properties);
       }
       fetchStarInfo();

    }, [])

    return (
        <>
        { Object.keys(properties).length !== 0 ?
            <div className="my-2" style={{"width": "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">{properties?.name}</h5>
                <p className="card-text">height: {properties?.height}</p>
                <p className="card-text">mass: {properties?.mass}</p>
                <p className="card-text">hair color: {properties?.hair_color}</p>
                <p className="card-text">skin color: {properties?.skin_color}</p>
                <p className="card-text">eye color: {properties?.eye_color}</p>
            </div>
        </div> : <div>Loading....</div>
        }
        </>
        
    )
}

export default Card
