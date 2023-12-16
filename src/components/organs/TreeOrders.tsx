// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Table, Button, Card } from "react-bootstrap";

// A simple example data for the table
const tableData = [
  {
    id: 1,
    name: "Tree 1",
    species: "Oak",
    height: 10,
  },
  {
    id: 2,
    name: "Tree 2",
    species: "Pine",
    height: 8,
  },
  // Add more data as needed
];

const TreeOrders = () => {
  return (
    <div className="pt-8 container">
      {""}
      {/* Add top padding instead of margin */}
      <Card>
        <Card.Header>
          <h5>Tree Orders</h5>
        </Card.Header>
        <Card.Body>
          {/* Render the data table using React Bootstrap */}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Species</th>
                <th>Height</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.species}</td>
                  <td>{row.height}</td>
                  <td>
                    <Button variant="success" size="sm" className="mr-2">
                      Plant
                    </Button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TreeOrders;
