import React from "react";
import { Card, Col, Badge } from "react-bootstrap";
import { BsFileText } from "react-icons/bs";

function InvoiceCard({ invoicesCount, invoices }) {
  return (
    <Col md={3}>
      <Card>
        <Card.Body>
          <h6>Invoices</h6>
          <h3>{invoicesCount}</h3>
          {invoices &&
            invoices.map((invoice) => (
              <div key={invoice.id} className="mb-2">
                <BsFileText className="mr-2" />
                <Badge
                  variant={invoice.status === "Paid" ? "success" : "danger"}
                >
                  {invoice.status}
                </Badge>
              </div>
            ))}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default InvoiceCard;
