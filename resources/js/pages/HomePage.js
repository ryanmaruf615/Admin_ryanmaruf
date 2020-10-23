import React, {Component, Fragment} from 'react';
import  {Col, Container, Row,Card} from "react-bootstrap";
import Menu from "../components/Menu";
import Axios from "axios";
import LoadingDiv from "../components/loadingDiv";
import WentWrong from "../components/wentWrong";


class HomePage extends Component {
    constructor() {
        super();
        this.state={
            dataList:[],
            isLoading:true,
            isError:false,
        }

    }
    componentDidMount() {


        Axios.get('/CountSummary').then((response)=>{
            if(response.status==200){
                this.setState({dataList:response.data,isLoading:false,isError:false})
            }else{
                this.setState({isLoading:false,isError:true})
            }

        }).catch((error)=>{
            this.setState({isLoading:false,isError:true})
        })
    }




    render() {

        if(this.state.isLoading==true){
            return(
                <Menu title="Home">
                    <Container>
                        <LoadingDiv/>
                    </Container>
                </Menu>
            )
        }else if(this.state.isError==true){
            return(
                <Menu title="Home">
                    <Container>
                        <WentWrong/>
                    </Container>
                </Menu>
            )
        } else {
            const data=this.state.dataList;
            return (
                <Fragment>
                    <Menu title="Home">
                        <Container >
                            <Row>
                                <Col className="p-2 mt-5" md={6} log={6} sm={6}>
                                    <Card className="card">
                                        <Card.Body>
                                            <h5 className="title-text">{data['contact']}</h5>
                                            <h5 className="des-text">Contact Request</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="p-2 mt-5" md={6} log={6} sm={6}>
                                    <Card className="card">
                                        <Card.Body>
                                            <h5 className="title-text">{data['project']}</h5>
                                            <h5 className="des-text">Total Projects</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="p-2" md={6} log={6} sm={6}>
                                    <Card className="card">
                                        <Card.Body>
                                            <h5 className="title-text">{data['service']}</h5>
                                            <h5 className="des-text">Services </h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="p-2" md={6} log={6} sm={6}>
                                    <Card className="card">
                                        <Card.Body>
                                            <h5 className="title-text">{data['review']}</h5>
                                            <h5 className="des-text">Total Review</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>

                    </Menu>
                </Fragment>
            );
        }

    }
}

export default HomePage;
