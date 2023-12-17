import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
          <IconButton color="success" aria-label="edit">
            <EditIcon />
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
    </div>
  );
};

export default Orders;
