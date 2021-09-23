import "./App.css";
import {Col, Container, Row} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
        <Container>
            <Row>
                <Col className={"main_header_col"}>
                    <h3>Assignment Submission File Generator Tool</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    Section 1
                </Col>
                <Col>
                    Section 2
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default App;
