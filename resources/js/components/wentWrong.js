import React, {Component, Fragment} from 'react';
import wentWrong from '../../images/wentWrong.png';
import {Row,Col,Container} from "react-bootstrap";


class WentWrong extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <Row className="d-flex mt-5 mb-5 justify-content-center">
                        <Col className="text-center" lg={6} md={6} sm={12}>

                            <img className="w-50" src={wentWrong}/>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default WentWrong;
