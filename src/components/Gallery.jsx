import React from "react";
import { Row, Container, Col, Accordion, Form } from "react-bootstrap";
import Cards from "./Cards";
import { Layout } from './layouts'


function Gallery() {

  return (
    <>
      <Layout>
        <div className="main">
          <Container fluid>

            <Row>
              <Col lg={3} className="py-5 fixed-sidebar">
                <h2 className="text-left hdngColor">Filter</h2>
                <Accordion defaultActiveKey="0" className="filterBox ">
                  <Accordion.Item>
                    <Accordion.Header>Special<i className="fa fa-chevron-down" aria-hidden="true"></i></Accordion.Header>
                    <Accordion.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                      </Form>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Clothing<i className="fa fa-chevron-down rightIcon" aria-hidden="true"></i></Accordion.Header>
                    <Accordion.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                      </Form>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Offhand<i className="fa fa-chevron-down" aria-hidden="true"></i></Accordion.Header>
                    <Accordion.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                      </Form>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Hair<i className="fa fa-chevron-down" aria-hidden="true"></i></Accordion.Header>
                    <Accordion.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                      </Form>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Clothing<i className="fa fa-chevron-down rightIcon" aria-hidden="true"></i></Accordion.Header>
                    <Accordion.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                      </Form>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Offhand<i className="fa fa-chevron-down" aria-hidden="true"></i></Accordion.Header>
                    <Accordion.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                      </Form>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Hair<i className="fa fa-chevron-down" aria-hidden="true"></i></Accordion.Header>
                    <Accordion.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                          <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                      </Form>
                    </Accordion.Body>
                  </Accordion.Item>

                </Accordion>
              </Col>
              <Col lg={9} className="fixed-rightsec">
                <Cards />
              </Col>
            </Row>
          </Container>
        </div>
      </Layout>
    </>
  );
}

export default Gallery;