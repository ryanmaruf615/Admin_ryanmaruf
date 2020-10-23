import React, {Component, Fragment} from 'react';
import Menu from "../components/Menu";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Axios from "axios";
import {Col, Button, Container, Modal, Row, Spinner, Form, Card} from "react-bootstrap";
import LoadingDiv from "../components/loadingDiv";
import WentWrong from "../components/wentWrong";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


class ClientReviewPage extends Component {

    constructor() {
        super();
        this.state={
            dataList:[],
            isLoading:true,
            isError:false,
            rowDataId:"",
            deleteBtnText:"Delete",
            addNewModal:false,
            addTitle:'',
            addDes:'',
            addFile:'',
        }
        this.dataDelete = this.dataDelete.bind(this);
        this.addNewModalOpen = this.addNewModalOpen.bind(this);
        this.addNewModalClose = this.addNewModalClose.bind(this);

        this.titleOnChange = this.titleOnChange.bind(this);
        this.desOnChange = this.desOnChange.bind(this);
        this.fileOnChange = this.fileOnChange.bind(this);
        this.addFormSubmit = this.addFormSubmit.bind(this);
    }

    componentDidMount() {
        Axios.get('/ReviewList').then((response)=>{
            if(response.status==200){
                this.setState({dataList:response.data,isLoading:false,isError:false})
            }else{
                this.setState({isLoading:false,isError:true})
            }

        }).catch((error)=>{
            this.setState({isLoading:false,isError:true})
        })
    }

    addNewModalOpen(){
        this.setState({addNewModal:true})
    }
    addNewModalClose(){
        this.setState({addNewModal:false})
    }

    //From Data full
    titleOnChange(event){
       let title = event.target.value;
       this.setState({addTitle:title})
    }
    desOnChange(event){
        let des = event.target.value;
        this.setState({addDes:des})
    }
    fileOnChange(event){
        let photo = event.target.files[0];
        this.setState({addFile:photo})
    }

    addFormSubmit(event){
        let title=this.state.addTitle
        let des=this.state.addDes;
        let photo=this.state.addFile;
        let url="/AddReview";
        let myFormData=new FormData();
        myFormData.append('title',title);
        myFormData.append('des',des);
        myFormData.append('photo',photo);
        let config={
            headers:{ 'content-type':'multipart/form-data'}
        }
        Axios.post(url,myFormData,config).then((response)=> {
           if(response.data == 1){
               toast.success('ADD Success', {
                   position: "top-center",
                   autoClose: 2000,
                   hideProgressBar: true,
                   closeOnClick: true,
                   pauseOnHover: false,
                   draggable: true,
                   progress: undefined,
               });
              this.addNewModalClose();
              this.componentDidMount();

           }
        }).catch((error)=> {
            toast.error('ADD Failed', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        })
        event.preventDefault();
    }



    dataDelete(){

        let confirmResult=confirm("do you want to delete ?")
        if(confirmResult == true){

            this.setState({deleteBtnText:"Deleting..."})
            Axios.post('/ReviewDelete', {id:this.state.rowDataId}).then((response)=>{

                if(response.data == 1 && response.status == 200){
                    toast.success('Delete Success', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                    this.setState({deleteBtnText:"Delete "})
                    this.componentDidMount()

                }else{
                    toast.error('Delete Failed', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                    this.setState({deleteBtnText:"Delete"})

                }

            }).catch((error)=>{
                toast.error('Delete Failed', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                this.setState({deleteBtnText:"Delete"})

            })
        }
    }



    render() {

        if(this.state.isLoading==true){
            return(
                <Menu title="Review">
                    <Container>
                        <LoadingDiv/>
                    </Container>
                </Menu>
            )
        }else if(this.state.isError==true){
            return(
                <Menu title="Review">
                    <Container>
                        <WentWrong/>
                    </Container>
                </Menu>
            )
        } else{
            const data=this.state.dataList;

            const columns=[
                {dataField: 'id', text: 'ID'},
                {dataField: 'client_title', text: 'Client Title'},
                {dataField: 'client_img', text: 'Client Img'},
                {dataField: 'client_description', text: 'Client Description'},
            ]

            const selectRow={
                mode:'radio',
                onSelect:(row,isSelect,rowIndex)=>{
                    this.setState({rowDataId:row['id']})
                }
            }
            return (
                <Fragment>
                    <Menu title="Review">
                        <Container>
                            <Row>
                                <Col lg={12} md={12} sm={12}>
                                    <button onClick={this.dataDelete} className="normal-btn my-2 btn">{this.state.deleteBtnText}</button>
                                    <button onClick={this.addNewModalOpen} className="normal-btn my-2 ml-2 btn">ADD NEW</button>
                                    <BootstrapTable
                                        keyField='id'
                                        data={ data }
                                        columns={ columns }
                                        selectRow={selectRow}
                                        pagination={ paginationFactory() } >
                                    </BootstrapTable>
                                </Col>
                            </Row>
                            <ToastContainer
                                position="top-center"
                                autoClose={2000}
                                hideProgressBar
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss={false}
                                draggable
                                pauseOnHover={false}
                            />
                        </Container>
                    </Menu>

                    <Modal show={this.state.addNewModal} onHide={this.addNewModalClose}>
                        <Modal.Header closeButton>
                            <h6 className="text-center font-weight-bold ">ADD NEW REVIEW</h6>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.addFormSubmit}>
                                <Form.Group >
                                    <Form.Label>Review Title</Form.Label>
                                    <Form.Control onChange={this.titleOnChange} type="text" placeholder="Review" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Review Description</Form.Label>
                                    <Form.Control onChange={this.desOnChange} type="text" placeholder="Review Description" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Client Photo</Form.Label>
                                    <Form.Control onChange={this.fileOnChange} type="file" placeholder="Client Image" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                            <Button onClick={this.addNewModalClose} variant="primary" type="submit">
                                Close
                            </Button>
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>


                </Fragment>
            );
        }
    }
}

export default ClientReviewPage;
