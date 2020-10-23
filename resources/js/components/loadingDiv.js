import React, {Component, Fragment} from 'react';
import loadingImg from '../../images/loading.svg';
import {Row,Col,Container} from "react-bootstrap";


class LoadingDiv extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <Row className="d-flex mt-5 mb-5 justify-content-center">
                        <Col className="text-center" lg={3} md={3} sm={12}>

                            <img className="loading-logo" src={loadingImg}/>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default LoadingDiv;
