import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface TableProps {
    data: any[]; // Replace 'any' with the type of data you expect to receive
}

const Table: React.FC<TableProps> = ({ data }) => {
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'age', headerName: 'Age', width: 100 },
        { field: 'location', headerName: 'Location', width: 200 },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={data} columns={columns} />
        </div>
    );
};

export default Table;
