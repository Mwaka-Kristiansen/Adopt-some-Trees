import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams
} from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import swal from 'sweetalert2';
import {Tree, TreePalm} from '@phosphor-icons/react';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";


const Orders: React.FC = () => {

  // function to display map on a modal



  // put map on modal


  const [rows, setRows] = useState<{ buyerId: string; price: number; x_lat: number; y_lat: number; x_lon: number; y_lon: number; buyerName: string; sellerId: string; }[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMapModalOpen, setMapModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>();


  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "treeName", headerName: "Tree Name", width: 200 },
    { field: "price", headerName: "Price", width: 140 },
    // { field: "xlat", headerName: "X Latitude", width: 100 },
    // { field: "ylat", headerName: "Y Latitude", width: 100 },
    // { field: "xlon", headerName: "X Longitude", width: 100 },
    // { field: "ylon", headerName: "Y Longitude", width: 100 },
    // hide buyer id and don't display on table
    // { field: "buyerId", headerName: "Buyer ID", width: 50 },

    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params: GridRenderCellParams) => params.value,
    },
    {
      field: "image",
      headerName: "Tree Image",
      width: 150,
      renderCell: (params: GridRenderCellParams) => params.value,
    },
    {
      field: "plant",
      headerName: "Plant Tree",
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded ml-2"
          onClick={() => {
            setModalOpen(true), setSelectedRow(params.row);
          }}
        >
          <Tree size={15} color="currentColor" weight="fill">
            Plant Tree
          </Tree>
        </button>
      ),
    },
    {
      field: "show",
      headerName: "Show on Map",
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded ml-2"
          onClick={() => {
            // open map modal
            setMapModalOpen(true), setSelectedRow(params.row);
          }}
        >
          <TreePalm size={15} color="currentColor" weight="fill">
            Plant Tree
          </TreePalm>
        </button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          color="secondary"
          aria-label="delete"
          onClick={() => handleDelete(params.row.buyerId)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://i5cvhkou9b.execute-api.af-south-1.amazonaws.com/transactions",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Allow-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.json();

      const rowsWithIds = data.map((row: any, index: number) => ({
        id: index + 1,
        buyersName: row.buyerName,
        price: row.price,
        xlat: row.x_lat,
        ylat: row.y_lat,
        xlon: row.x_lon,
        ylon: row.y_lon,
        treeName: row.treeName,
        // hide buyer id and don't display on table
        buyerId: row.buyerId,
        status: (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              row.status === "planted"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {row.status === "planted" ? "Planted" : "Pending"}
          </span>
        ),
        image: (
          <img
            src={row.imageLocation}
            alt="Tree"
            className="h-10 w-10 rounded-full"
          />
        ),
      }));

      setRows(rowsWithIds);
      
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const url = window.location.href;
      const urlSplit = url.split("?");
      const urlParams = urlSplit[1].split("&");
      const urlLat = urlParams[0].split("=");
      const xlat = urlLat[1].split(",");
      const urlLon = urlParams[1].split("=");
      const ylon = urlLon[1].split(",");
      const urlTree = urlParams[2].split("=");
     const treeName = urlTree[1].replace(/%20/g, " ");
      const urlPrice = urlParams[3].split("=");
      const price = urlPrice[1].split("Ksh");

      const newCoordinates = { x_lat: Number(xlat[1]), y_lon: Number(ylon[1]) };

      const response = await fetch(
        "https://i5cvhkou9b.execute-api.af-south-1.amazonaws.com/transactions",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Allow-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.json();
      const coordinates = data.map((row: any) => ({
        x_lat: row.x_lat,
        y_lon: row.y_lon,
      }));
      const isCoordinatesUnique = coordinates.some(
        (coordinate: { x_lat: number; y_lon: number }) =>
          coordinate.x_lat === newCoordinates.x_lat &&
          coordinate.y_lon === newCoordinates.y_lon
      );

      if (!isCoordinatesUnique) {
        const newRow = {
          buyerId: uuidv4(),
          price: Number(price[1]),
          x_lat: Number(xlat[1]),
          y_lat: Number(ylon[1]),
          x_lon: Number(xlat[1]),
          y_lon: Number(ylon[1]),
          treeName: treeName,
          buyerName: "B Sechaba",
          sellerId: uuidv4(),
        };
        await fetch(
          "https://i5cvhkou9b.execute-api.af-south-1.amazonaws.com/transactions",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Allow-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(newRow),
          }
        );

        // modify state using unshift
        const addedRow = [newRow, ...rows];
        addedRow.unshift(newRow);

        // update numbering
        let i = 1;
        addedRow.map((row) => {
          return { ...row, id: i++ };
        });

        setRows(addedRow);
        

      } else {
        console.log("Coordinates already added!");
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  if (
    window.location.href.includes("?xlat") &&
    window.location.href.includes("&ylon") &&
    window.location.href.includes("&tree") &&
    window.location.href.includes("&price")
  ) {
    handleAdd();
    fetchData();
    window.history.replaceState({}, "", "/plant-a-tree");
  }

  const handleDelete = async (id: number) => {
    try {
      await fetch(
        `https://i5cvhkou9b.execute-api.af-south-1.amazonaws.com/transactions/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Allow-Control-Allow-Origin": "*",
          },
        }
      );

      // Update the rows state after deleting
      setRows(rows.filter((row) => row.buyerId !== selectedRow.buyerId));
      swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Tree Deleted successfully!',
        confirmButtonText: 'Ok'
      });

      // update numbering
      // let i = 1;
      // rows.map((row) => {
      //   return { ...row, id: i-- };
      // });


    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = async (values: any) => {
    console.log('Values:', values);
    // setSelectedRow(rows)
    // const selectedId = rows.find((row: any) => row.buyerId === values.buyerId);
    try {
    
      const toBase64 = (file: File | null) => {
        if (!file) {
          return Promise.reject(new Error('File is null or undefined'));
        }
  
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          // reader.onload = () => resolve(reader.result?.toString().split(',')[1] as string);
          reader.onerror = (error) => reject(error);
        });
      };

      const base64string = await toBase64(values.image[0]);
      const imageBase64 = base64string.split(',')[1];
      const imageType = base64string.split(';')[0].split('/')[1];

  
     
      if (!values.image || !Array.isArray(values.image) || values.image.length === 0) {
        throw new Error('Invalid image array');
      }
  
     
      console.log('Image base64:', imageBase64);
      

      const dataToUpdate = {
        buyerId: selectedRow.buyerId,
        imageBase64: imageBase64,
        imageType: imageType,
        status: 'planted'
      };
  
      console.log('Selected row:', selectedRow);
      console.log('Data to update:', dataToUpdate);
  
  
      const response = await fetch(
        `https://i5cvhkou9b.execute-api.af-south-1.amazonaws.com/transactions`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Allow-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(dataToUpdate),
        }
      );
  
      const data = await response.json();
      console.log('Success:', data);

      handleCloseModal();
      fetchData();
      swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Tree Planted successfully!',
        confirmButtonText: 'Ok'
      });

    } catch (error) {
      console.error('Error:', error);
      handleCloseModal();
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        confirmButtonText: 'Ok'
      });

    }
  };
  
    const MapContainer = () => {
      useEffect(() => {
        mapboxgl.accessToken =
          "pk.eyJ1IjoidGVreXJleSIsImEiOiJja3NieGJqMHYwYmFoMndwZmN1b3l1N3g2In0.n0e_g3FQlcLUiuiwnDL9fw";

        const map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/tekyrey/clpsk2qjk018g01pa0g0nhbfu",
          center: [selectedRow.ylon, selectedRow.xlat], // Nairobi, Kenya
          zoom: 7,
        });

        // Add zoom controls
        map.addControl(new mapboxgl.NavigationControl(), "top-left");

        // Add geocoder control for search
        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
          placeholder: "Search for a location",
          marker: false,
          countries: "KE",
          bbox: [33.501, -4.04, 41.899, 5.62], // Boundary for Kenya
        });

        // Ensure the geocoder control is added to the map
        map.addControl(geocoder, "top-right");

        // Add a simple marker for demonstration
        new mapboxgl.Marker()
          // .setLngLat([37.28805638699967, 2.261883815402115])
          .setLngLat([selectedRow.ylat, selectedRow.xlat])
          .addTo(map);

        // add marker for selected tree coordinates
        // new mapboxgl.Marker().setLngLat([selectedRow.x_lat, selectedRow.y_lon]).addTo(map);

        

        // Cleanup on unmount
        return () => map.remove();
      });

      return <div id="map" style={{ height: "600px" }}></div>;
    };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseModalMap = () => {
    setMapModalOpen(false);
  }



  return (
    <div style={{ marginTop: 100, marginLeft: 50, marginRight: 50 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div">
            Orders
          </Typography>
          <div>
            <DataGrid
              rows={rows}
              columns={columns}
              pagination
              autoHeight
              checkboxSelection
              disableRowSelectionOnClick
            />
          </div>
        </CardContent>
      </Card>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white w-96 rounded shadow-lg p-6">
            <h1 className="text-2xl font-semibold mb-4">Plant Tree</h1>
            <form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="image"
                >
                  Upload Planted Tree Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="w-full border border-gray-300 px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-600"
                  required
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      setSelectedRow({
                        ...selectedRow,
                        image: [files[0]],
                      });
                    }
                  }}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-red-600 text-white px-4 py-2 rounded"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded ml-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(selectedRow);
                  }}
                >
                  Plant Tree
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      {/* Map modal */}
      <Modal
        open={isMapModalOpen}
        onClose={handleCloseModalMap}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // add close icon on top right
        closeAfterTransition
      >
        <div className="flex justify-center items-center ">
          <div className="bg-white w-1/2 h-40 rounded shadow-lg m-8">
            {/* <div className="bg-white w-96 h-80 rounded shadow-lg p-6"> */}
            {/* <h1 className="text-2xl font-semibold mb-4">Map</h1> */}
            <MapContainer />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Orders;
