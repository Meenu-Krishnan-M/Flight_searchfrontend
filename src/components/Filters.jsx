import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export default function Filters({ filters, setFilters, airlines }) {
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === 'checkbox') {
      setFilters((prev) => {
        const prevAirlines = prev.airlines || [];
        return {
          ...prev,
          airlines: checked
            ? [...prevAirlines, value]
            : prevAirlines.filter((a) => a !== value),
        };
      });
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <Form className="mb-3 p-3 bg-light border rounded shadow-sm">
      <Row className="g-2 align-items-end">
        <Col md={2}>
          <Form.Label>Min Price</Form.Label>
          <Form.Control
            type="number"
            name="minPrice"
            size="sm"
            value={filters.minPrice || ''}
            onChange={handleChange}
          />
        </Col>
        <Col md={2}>
          <Form.Label>Max Price</Form.Label>
          <Form.Control
            type="number"
            name="maxPrice"
            size="sm"
            value={filters.maxPrice || ''}
            onChange={handleChange}
          />
        </Col>
        <Col md={2}>
          <Form.Label>Min Dur (h)</Form.Label>
          <Form.Control
            type="number"
            name="minDuration"
            size="sm"
            value={filters.minDuration || ''}
            onChange={handleChange}
          />
        </Col>
        <Col md={2}>
          <Form.Label>Max Dur (h)</Form.Label>
          <Form.Control
            type="number"
            name="maxDuration"
            size="sm"
            value={filters.maxDuration || ''}
            onChange={handleChange}
          />
        </Col>
        <Col md={4}>
          <Form.Label>Airlines</Form.Label>
          <div className="d-flex flex-wrap gap-2">
            {airlines.map((a) => (
              <Form.Check
                key={a}
                type="checkbox"
                label={a}
                name="airlines"
                value={a}
                checked={filters.airlines?.includes(a) || false}
                onChange={handleChange}
                inline
              />
            ))}
          </div>
        </Col>
      </Row>
    </Form>
  );
}
