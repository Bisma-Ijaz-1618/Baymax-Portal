import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form } from "react-bootstrap";

// Function to generate random invoice data
const generateRandomInvoices = () => {
  const statuses = ["Paid", "Unpaid"];
  const doctors = ["Dr. Smith", "Dr. Johnson", "Dr. Brown"];
  const patients = ["John Doe", "Jane Smith", "Michael Johnson"];

  const getRandomItem = (array) =>
    array[Math.floor(Math.random() * array.length)];

  const getRandomDate = () => {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  };

  const invoices = [];
  for (let i = 1; i <= 15; i++) {
    const randomDate = getRandomDate();
    const invoice = {
      id: i,
      appointmentId: Math.floor(Math.random() * 1000),
      doctorName: getRandomItem(doctors),
      patientName: getRandomItem(patients),
      amount: (Math.random() * 100).toFixed(2),
      status: getRandomItem(statuses),
      date: randomDate,
    };
    invoices.push(invoice);
  }
  return invoices;
};

const InvoicePage = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [patientFilter, setPatientFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

  useEffect(() => {
    const randomInvoices = generateRandomInvoices();
    setInvoices(randomInvoices);
    setFilteredInvoices(randomInvoices);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = invoices;
    if (statusFilter) {
      filtered = filtered.filter(
        (invoice) => invoice.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    if (patientFilter) {
      filtered = filtered.filter((invoice) =>
        invoice.patientName.toLowerCase().includes(patientFilter.toLowerCase())
      );
    }
    if (monthFilter) {
      const selectedMonth = parseInt(monthFilter.split("-")[1]);
      filtered = filtered.filter(
        (invoice) => invoice.date.getMonth() === selectedMonth - 1
      );
    }
    setFilteredInvoices(filtered);
  }, [invoices, statusFilter, patientFilter, monthFilter]);

  return (
    <Container>
      <Row className="mt-4">
        <h1>Your Invoices</h1>
      </Row>
      <Row className="mt-4">
        <Form>
          <Row>
            <Col>
              <Form.Control
                as="select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Filter by Status</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </Form.Control>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Filter by Patient"
                value={patientFilter}
                onChange={(e) => setPatientFilter(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="month"
                placeholder="Filter by Month"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
              />
            </Col>
          </Row>
        </Form>
      </Row>
      <Row className="mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Appointment ID</th>
              <th>Doctor</th>
              <th>Patient</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.appointmentId}</td>
                <td>{invoice.doctorName}</td>
                <td>{invoice.patientName}</td>
                <td>${invoice.amount}</td>
                <td>{invoice.status}</td>
                <td>{invoice.date.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default InvoicePage;
