import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "react-bootstrap";

const Orders: React.FC = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "buyersName", headerName: "Buyers Name", width: 200 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "xlat", headerName: "X Latitude", width: 100 },
    { field: "ylat", headerName: "Y Latitude", width: 100 },
    { field: "xlon", headerName: "X Longitude", width: 100 },
    { field: "ylon", headerName: "Y Longitude", width: 100 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params: GridRenderCellParams) => params.value,
    },
    {
      field: "image",
      headerName: "Image",
      width: 120,
      renderCell: (params: GridRenderCellParams) => params.value,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton color="success" aria-label="edit" >
            <EditIcon
            // onclick open modal with form to update image
            onClick={() => {
                console.log("Modal opened");
                // Open the modal
                const [modalOpen, setModalOpen] = useState(false);
                setModalOpen(true);
              }
            }
            />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="delete"
            // You can call handleDelete with the row id
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const [rows, setRows] = useState([]);

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
        status: (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              row.status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {row.status}
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
     // get data from url
     const url = window.location.href;
     const urlSplit = url.split("?");
     const urlParams = urlSplit[1].split("&");
     const urlLat = urlParams[0].split("=");
     const xlat = urlLat[1].split(",");
     const urlLon = urlParams[1].split("=");
     const ylon = urlLon[1].split(",");
     const urlPrice = urlParams[2].split("=");
     const price = urlPrice[1].split("Ksh");

     const newCoordinates = { x_lat: Number(xlat[1]), y_lon: Number(ylon[1]) };

        // fetch data from the api and check if the coordinates already exist
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
                (coordinate: { x_lat: number; y_lon: number; }) =>
                coordinate.x_lat === newCoordinates.x_lat &&
                coordinate.y_lon === newCoordinates.y_lon
            );
        // Add the data if the coordinates are unique
        

     if (!isCoordinatesUnique) {
       const newRow = {
         buyerId: uuidv4(),
         price: Number(price[1]),
         x_lat: Number(xlat[1]),
         y_lat: Number(ylon[1]),
         x_lon: Number(xlat[1]),
         y_lon: Number(ylon[1]),
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

       fetchData();

    //    // Update the rows state after adding a new row
    //    const updatedRows = [...rows, newRow];
    //     setRows(updatedRows as never[]);
    
    
     } else {
       console.log("Coordinates already added!");
     }
   } catch (error) {
     console.error("Error adding data:", error);
   }
 };

//  check that url has all query parameters
if(window.location.href.includes("?xlat") && window.location.href.includes("&ylon") && window.location.href.includes("&price")) {
    // only call handleAdd if the url has all query parameters
    handleAdd();
    // Remove the query parameters from the url
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
          },
        }
      );

      // Update the rows state after deletion
      const [rows, setRows] = useState<any[]>([]); // Add type annotation for rows

      // Rest of the code...
      //   setRows(updatedRows);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

//   handle add image and image type


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
      {/* create a modal with a form to update an image */}
      <Modal
        show={false}
        onHide={() => {
          console.log("Modal closed");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Image to Plant Tree</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="imageType" className="form-label">
                Image Type
              </label>
              <input
                type="text"
                className="form-control"
                id="imageType"
                name="imageType"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Upload Image
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Orders;

