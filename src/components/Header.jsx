import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaPlaneDeparture } from 'react-icons/fa'; // Flight icon from react-icons

const Header = () => {
  return (
    <Navbar expand="lg" bg="light" className="shadow-sm sticky-top">
      <Container fluid>
        {/* Brand Logo with Flight Icon */}
        <Navbar.Brand href="/" className="d-flex align-items-center gap-2 text-primary fw-bold fs-4">
          <FaPlaneDeparture size={28} />
          BookSultan
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="gap-3">
            <Nav.Link href="#mybooking" className="text-dark fw-semibold nav-hover">
              My Booking
            </Nav.Link>
            <Nav.Link href="#tours" className="text-dark fw-semibold nav-hover">
              Tours & Attractions
            </Nav.Link>
            <Nav.Link href="#register" className="text-dark fw-semibold nav-hover">
              Register / Login
            </Nav.Link>
            <Nav.Link href="#language" className="text-dark fw-semibold nav-hover">
              🌐 العربية
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
