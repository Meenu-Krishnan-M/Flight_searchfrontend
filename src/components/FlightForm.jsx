import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import api from '../utils/api';

export default function FlightForm({ onAdd }) {
  const init = {
    airline: '',
    number: '',
    depCity: '',
    arrCity: '',
    depDate: '',
    arrDate: '',
    depTime: '',
    arrTime: '',
    price: ''
  };

  const [form, setForm] = useState(init);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.airline) e.airline = 'Required';
    if (!form.number) e.number = 'Required';
    if (!form.depCity || /\d/.test(form.depCity)) e.depCity = 'Invalid city';
    if (!form.arrCity || /\d/.test(form.arrCity)) e.arrCity = 'Invalid city';
    if (!form.depDate) e.depDate = 'Required';
    if (!form.arrDate) e.arrDate = 'Required';
    if (!form.depTime) e.depTime = 'Required';
    if (!form.arrTime) e.arrTime = 'Required';
    if (!form.price || isNaN(form.price)) e.price = 'Invalid price';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eobj = validate();
    if (Object.keys(eobj).length) return setErrors(eobj);

    // Combine date and time correctly using ISO format
    const dep = new Date(`${form.depDate}T${form.depTime}`);
    const arr = new Date(`${form.arrDate}T${form.arrTime}`);
    const duration = (arr - dep) / 3600000; // Convert milliseconds to hours

    const payload = {
      ...form,
      price: parseFloat(form.price),
      duration
    };

    try {
      await api.post('/flights', payload);
      setForm(init);
      setErrors({});
      onAdd(); // Notify parent to reload list
    } catch (err) {
      console.error("Failed to add flight:", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-2 border rounded bg-light">
      <h4 className="mb-3 text-info">Add New Flight</h4>
      {[
        'airline',
        'number',
        'depCity',
        'arrCity',
        'depDate',
        'arrDate',
        'depTime',
        'arrTime',
        'price'
      ].map((field) => (
        <Form.Group key={field} className="mb-3">
          <Form.Label>{field.replace(/([A-Z])/g, ' $1')}</Form.Label>
          <Form.Control
            type={
              ['depDate', 'arrDate'].includes(field)
                ? 'date'
                : ['depTime', 'arrTime'].includes(field)
                ? 'time'
                : 'text'
            }
            name={field}
            value={form[field]}
            onChange={(e) =>
              setForm({ ...form, [field]: e.target.value })
            }
            isInvalid={!!errors[field]}
          />
          <Form.Control.Feedback type="invalid">
            {errors[field]}
          </Form.Control.Feedback>
        </Form.Group>
      ))}
      <Button type="submit" variant="primary">
        Add Flight
      </Button>
    </Form>
  );
}
