import {useContext, useState} from 'react';
import { places } from './data.js';
import {getImageUrl} from "./utils/utils";
import {sizeContext} from "./context/Context";

export default function App() {
  const [isLarge, setIsLarge] = useState(false);
  const imageSize = isLarge ? 150 : 100;
  return (
      <>
        <label>
          <input
              type="checkbox"
              checked={isLarge}
              onChange={e => {
                setIsLarge(e.target.checked);
              }}
          />
          Use large images
        </label>
        <hr />
          <sizeContext.Provider value={imageSize}>
              <List />
          </sizeContext.Provider>

      </>
  )
}

function List() {
  const listItems = places.map(place =>
      <li key={place.id}>
        <Place
            place={place}
        />
      </li>
  );
  return <ul>{listItems}</ul>;
}

function Place({ place }) {
  return (
      <>
        <PlaceImage
            place={place}
        />
        <p>
          <b>{place.name}</b>
          {': ' + place.description}
        </p>
      </>
  );
}

function PlaceImage({ place }) {
    const size = useContext(sizeContext);
    return (
      <img
          src={getImageUrl(place)}
          alt={place.name}
          width={size}
          height={size}
      />
  );
}
