import React, { useState } from "react";
import { Text } from "../atoms/Text";
import { TreesTexts } from "../particles/DataLists";
import { Card } from "../molecules/Card";
import Tree1 from "../../assets/moringa.jpeg";
import Tree2 from "../../assets/meruoak.jpeg";
import Tree3 from "../../assets/leadtree.jpeg";
import Tree4 from "../../assets/kassodtree.jpeg";
import Tree5 from "../../assets/africanolive.jpeg";
import Tree6 from "../../assets/Croton-megalocarpus.jpeg";
import Tree7 from "../../assets/Erthyrina-burtii.jpg";
import Tree8 from "../../assets/Syzygium-guineense.jpeg";
import Tree9 from "../../assets/fevertree.jpeg";
import Tree10 from "../../assets/floweringtree.jpeg";
import Tree11 from "../../assets/Red-Stinkwood.jpeg";
import Tree12 from "../../assets/Yellowwood.jpeg";
import { Button } from "../atoms/Button";
// import PaymentModal from "../organs/Payment";
import { Link, useNavigate } from "react-router-dom";

const Trees = () => {
    // const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    // const [selectedTree, setSelectedTree] = useState(null);

    // const [clickedCoordinates, setClickedCoordinates] = useState(null);

    // get coordinates from the url
    // check if the url has coordinates
  // only split the url if it has coordinates
  
const url = window.location.href;
const urlSplit = url.split("?");
const urlParams = urlSplit.length > 1 ? urlSplit[1].split("&") : [];
const urlLat = urlParams.length > 0 ? urlParams[0].split("=") : [];
const urlLon = urlParams.length > 1 ? urlParams[1].split("=") : [];
    

    // const navigate = useNavigate();

  // const openPaymentModal = (tree: React.SetStateAction<null>) => {
  //   selectedTree &&
  //   setSelectedTree(tree);
  //   setPaymentModalOpen(true);
  // };

  // const closePaymentModal = () => {
  //   setPaymentModalOpen(false);
  // };

// const handleBuyTree = (price: any) => {
//   if (clickedCoordinates) {
//     // Access the coordinates from the state
//     const latitude = clickedCoordinates[1];
//     const longitude = clickedCoordinates[0];

//     // Use Link to navigate
//     return (
//       <Link
//         to={`/plant-a-tree?xlat=${latitude}&ylon=${longitude}&price=${price}`}
//       >
//         <Button className="text-color3 bg-green-500 px-6 py-1 rounded-full">
//           Buy Tree
//         </Button>
//       </Link>
//     );
//   }

//   // Handle the case where coordinates are not available
//   return null;
// };

  const firstLineDestinations = [
    { tree: "Moringa Tree", price: "Ksh500", image: Tree1 },
    { tree: "Meru Oak Tree", price: "Ksh200", image: Tree2 },
    { tree: "Lead Tree", price: "Ksh200", image: Tree3 },
  ];
  const secondLineDestinations = [
    { tree: "Kassod Tree", price: "Ksh500", image: Tree4 },
    { tree: "African Olive Tree", price: "Ksh200", image: Tree5 },
    { tree: "Croton Megalocarpus Tree", price: "Ksh200", image: Tree6 },
  ];
  const thirdLineDestinations = [
    { tree: "Erthyrina Burtii Tree", price: "$Ksh200", image: Tree7 },
    { tree: "Syzygium Guineense Tree", price: "Ksh800", image: Tree8 },
    { tree: "Fever Tree", price: "Ksh800", image: Tree9 },
  ];
  const fourthLineDestinations = [
    { tree: "Flowering Tree", price: "Ksh600", image: Tree10 },
    { tree: "Red Stinkwood Tree", price: "Ksh600", image: Tree11 },
    { tree: "Yellow Wood Tree", price: "Ksh200", image: Tree12 },
  ];

  const renderDestinationLine = (destinations: any[]) => (
    <div className="w-full h-auto mt-4 flex gap-4">
      {destinations.map((card, index) => (
        <div key={index} className="md:px-6 px-3">
          <Card
            cardClass="overflow-hidden shadow-md rounded-lg cursor-pointer group"
            imageAlt={card.tree}
            imageSrc={card.image}
            imageWrapperClass="w-full h-[250px] overflow-hidden"
            cover="group-hover:scale-125 transition duration-500 ease"
            textWrapperClass="flex flex-col gap-4 w-full px-5 py-5"
          >
            <div className="flex justify-between items-center">
              <Text as="h4" className="text-base font-medium text-color3">
                {card.tree}
              </Text>
              <Text as="small" className=" text-color3 font-light text-sm">
                {card.price}
              </Text>
            </div>
            <div className="w-full flex items-center text-color3">
              <div className="w-full flex items-center text-color3">
                <Link
          to={`/plant-a-tree?xlat=${urlLat}&ylon=${urlLon}&price=${card.price}`}
        >
                <Button
                  className="text-color3 bg-green-500 px-6 py-1 rounded-full"
                  // onClick={() => {
                  //   // setClickedCoordinates(clickedCoordinates); // Replace with actual coordinates
                  //   handleBuyTree(card.price);
                  // }}
                >
                  Buy Tree
                </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
    
  );

  return (
    <section className="w-full h-auto flex flex-col items-center justify-center relative lg:px-24 md:px-20 px-6 my-20">
      <Text
        as="p"
        className="font-light text-base text-color3/80 tracking-widest"
      >
        {TreesTexts.firstText}
      </Text>
      <Text
        as="h2"
        className="md:text-4xl text-2xl font-medium capitalize text-color3"
      >
        {TreesTexts.secondText}
      </Text>

      {renderDestinationLine(firstLineDestinations)}
      {renderDestinationLine(secondLineDestinations)}
      {renderDestinationLine(thirdLineDestinations)}
      {renderDestinationLine(fourthLineDestinations)}

      {/* Render the PaymentModal */}
      {/* <PaymentModal isOpen={isPaymentModalOpen} onClose={closePaymentModal} /> */}
    </section>
  );
};

export default Trees;