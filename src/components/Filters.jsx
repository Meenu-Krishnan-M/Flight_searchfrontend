import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function Filters({ filters, setFilters, airlines }) {
  const handleChange = e => {
    const { name,value,checked,type } = e.target;
    setFilters(f => ({
      ...f,
      [name]: type==='checkbox' ? (
        checked ? [...(f.airlines||[]), value] : f.airlines.filter(a=>a!==value)
      ) : value
    }));
  };

  return (
    <Form className="mb-3">
      <Row>
        <Col md><Form.Label>Price range</Form.Label>
          <Form.Control name="minPrice" placeholder="Min" onChange={handleChange} />
        </Col>
        <Col md><Form.Label>Max Price</Form.Label>
          <Form.Control name="maxPrice" onChange={handleChange} />
        </Col>
        <Col md><Form.Label>Min Duration (hrs)</Form.Label>
          <Form.Control name="minDuration" onChange={handleChange} />
        </Col>
        <Col md><Form.Label>Max Duration</Form.Label>
          <Form.Control name="maxDuration" onChange={handleChange} />
        </Col>
      </Row>
      <Form.Label>Airlines</Form.Label>
      <div>{airlines.map(a => (
        <Form.Check key={a} label={a}
          name="airlines" value={a}
          type="checkbox" onChange={handleChange}
        />
      ))}</div>
    </Form>
  );
}