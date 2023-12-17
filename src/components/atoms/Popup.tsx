// TreePopupContent.jsx
import { Link } from "react-router-dom";
import mapboxgl from "mapbox-gl";

const TreePopupContent = () => (
//   create a popup component
    <div>
        <p>Plant a tree here!</p>
        <Link to="/buy-a-tree">
        <button id="buyTreeBtn">Buy Tree</button>
        </Link>
    </div>
//   add popup component to map

);

export default TreePopupContent;
