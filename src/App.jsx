// App.jsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import FlightForm from './components/FlightForm';
import Filters from './components/Filters';
import FlightList from './components/FlightList';
import api from './utils/api';
import Header from './components/Header';

function App() {
  const [flights, setFlights] = useState([]);
  const [allFlights, setAllFlights] = useState([]);
  const [filters, setFilters] = useState({ airlines: [] });
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetch = async () => {
    try {
      const res = await api.get('/flights');
      setAllFlights(res.data);
    } catch (err) {
      console.error('Error fetching flights:', err);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    let filtered = [...allFlights];

    if (filters.minPrice) {
      filtered = filtered.filter(f => parseFloat(f.price) >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(f => parseFloat(f.price) <= parseFloat(filters.maxPrice));
    }

    if (filters.minDuration) {
      filtered = filtered.filter(f => parseFloat(f.duration) >= parseFloat(filters.minDuration));
    }

    if (filters.maxDuration) {
      filtered = filtered.filter(f => parseFloat(f.duration) <= parseFloat(filters.maxDuration));
    }

    if (filters.airlines && filters.airlines.length > 0) {
      filtered = filtered.filter(f => filters.airlines.includes(f.airline));
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === 'price' || sortBy === 'duration') {
          return sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
        } else {
          return sortOrder === 'asc'
            ? a[sortBy].localeCompare(b[sortBy])
            : b[sortBy].localeCompare(a[sortBy]);
        }
      });
    }

    setFlights(filtered);
  }, [filters, sortBy, sortOrder, allFlights]);

  const airlines = Array.from(new Set(allFlights.map(f => f.airline)));

  return (
    <>
      <Header />
      <Container fluid className="mt-4">
        <Row>
          {/* Left Sidebar: Form only */}
          <Col lg={4} className="mb-4">
            <div className="sticky-top" style={{ top: '80px' }}>
              <FlightForm onAdd={fetch} />
            </div>
          </Col>

          {/* Right Main Content */}
          <Col lg={8}>
            <Filters filters={filters} setFilters={setFilters} airlines={airlines} />

            <Form className="mb-3 p-3 bg-light rounded border shadow-sm">
              <Form.Label className="fw-bold">Sort By</Form.Label>
              <Form.Select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="mb-2"
              >
                <option value="">None</option>
                <option value="price">Price</option>
                <option value="duration">Duration</option>
                <option value="airline">Airline</option>
              </Form.Select>
              <Button
                size="sm"
                onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
                variant="outline-primary"
              >
                {sortOrder.toUpperCase()}
              </Button>
            </Form>

            <FlightList flights={flights} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
