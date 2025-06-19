import React from 'react';
import { Row, Col, Card, Container, Button } from 'react-bootstrap';

export default function FlightList({ flights }) {
  const handleBook = (flight) => {
    alert(`Booking flight: ${flight.airline} (${flight.number}) from ${flight.depCity} to ${flight.arrCity}`);
    // You can implement booking logic here (modal, redirect, API call, etc.)
  };

  return (
    <Container fluid className="my-4">
      <Row xs={1} md={2} lg={3} className="g-4">
        {flights.map(f => (
          <Col key={f.id}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title className="mb-3 text-primary">
                  {f.airline} <small className="text-muted">({f.number})</small>
                </Card.Title>

                <Row>
                  <Col xs={6}>
                    <strong>From:</strong> {f.depCity} <br />
                    <strong>Date:</strong> {f.depDate} <br />
                    <strong>Time:</strong> {f.depTime}
                  </Col>
                  <Col xs={6}>
                    <strong>To:</strong> {f.arrCity} <br />
                    <strong>Date:</strong> {f.arrDate} <br />
                    <strong>Time:</strong> {f.arrTime}
                  </Col>
                </Row>

                <hr />

                <Row className="mb-3">
                  <Col>
                    <strong>Duration:</strong> {f.duration?.toFixed(2)} h
                  </Col>
                  <Col className="text-end">
                    <strong>Price:</strong> KWD {f.price?.toFixed(2)}
                  </Col>
                </Row>

                {/* Book Button */}
                <div className="d-grid">
                  <Button variant="success" onClick={() => handleBook(f)}>
                    Book Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
