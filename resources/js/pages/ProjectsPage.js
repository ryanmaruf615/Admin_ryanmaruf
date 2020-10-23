import React, {Component, Fragment} from 'react';
import Menu from "../components/Menu";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Axios from "axios";
import {Col, Button, Container, Modal, Row, Spinner, Form, Card} from "react-bootstrap";
import LoadingDiv from "../components/loadingDiv";
import WentWrong from "../components/wentWrong";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


class ProjectsPage extends Component {

    constructor() {
        super();
        this.state={
            dataList:[],
            isLoading:true,
            isError:false,
            rowDataId:"",
            deleteBtnText:"Delete",
            addNewModal:false,
            projectName:'',
            projectDes:'',
            projectFeatures:'',
            projectLink:'',
            photoOne:'',
            photoTwo:'',
        }
        this.dataDelete = this.dataDelete.bind(this);
        this.ImageCellFormat = this.ImageCellFormat.bind(this);
        this.addNewModalOpen = this.addNewModalOpen.bind(this);
        this.addNewModalClose = this.addNewModalClose.bind(this);

        this.onNameChange = this.onNameChange.bind(this);
        this.onDesChange = this.onDesChange.bind(this);
        this.onFeaturesChange = this.onFeaturesChange.bind(this);
        this.onLinkChange = this.onLinkChange.bind(this);
        this.onPhotoOneChange = this.onPhotoOneChange.bind(this);
        this.onPhotoTwoChange = this.onPhotoTwoChange.bind(this);
        this.addFormSubmit = this.addFormSubmit.bind(this);
    }

    componentDidMount() {
        Axios.get('/ProjectList').then((response)=>{
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


    dataDelete(){

        let confirmResult=confirm("do you want to delete ?")
        if(confirmResult == true){

            this.setState({deleteBtnText:"Deleting..."})
            Axios.post('/ProjectDelete', {id:this.state.rowDataId}).then((response)=>{

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

    ImageCellFormat(cell,row){
        return(
            <img className="w-100" src={cell}/>
        )
    }

    onNameChange(event){
        this.setState({projectName:event.target.value})
    }
    onDesChange(event){
        this.setState({projectDes:event.target.value})
    }

    onFeaturesChange(content, delta, source, editor){
        let htmlContent= editor.getHTML();
        this.setState({projectFeatures:htmlContent})
    }

    onLinkChange(event){
        this.setState({projectLink:event.target.value})
    }
    onPhotoOneChange(event){
        this.setState({photoOne:event.target.files[0]})
    }
    onPhotoTwoChange(event){
        this.setState({photoTwo:event.target.files[0]})
    }
    addFormSubmit(event){


        let projectName=this.state.projectName;
        let projectDes=this.state.projectDes;
        let projectFeatures=this.state.projectFeatures;
        let projectLink=this.state.projectLink;
        let photoOne=this.state.photoOne;
        let photoTwo=this.state.photoTwo;
        let myFormData=new FormData();
        myFormData.append('projectName',projectName);
        myFormData.append('projectDes',projectDes);
        myFormData.append('projectFeatures',projectFeatures);
        myFormData.append('projectLink',projectLink);
        myFormData.append('photoOne',photoOne);
        myFormData.append('photoTwo',photoTwo);

        let url="/AddProject";
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





    render() {

        if(this.state.isLoading==true){
            return(
                <Menu title="Projects">
                    <Container>
                        <LoadingDiv/>
                    </Container>
                </Menu>
            )
        }else if(this.state.isError==true){
            return(
                <Menu title="Projects">
                    <Container>
                        <WentWrong/>
                    </Container>
                </Menu>
            )
        } else{
            const data=this.state.dataList;

            const columns=[
                {dataField: 'id', text: 'ID'},
                {dataField: 'project_name', text: 'Project Name'},
                {dataField: 'img_one', text: 'Image',formatter:this.ImageCellFormat},
                {dataField: 'short_description', text: 'Short Description'},
                {dataField: 'project_features', text: 'Project Features'},

            ]

            const selectRow={
                mode:'radio',
                onSelect:(row,isSelect,rowIndex)=>{
                    this.setState({rowDataId:row['id']})
                }
            }
            return (
                <Fragment>
                    <Menu title="Projects">
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
                            <h6 className="text-center font-weight-bold ">ADD NEW PROJECT DATA</h6>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.addFormSubmit}>
                                <Form.Group >
                                    <Form.Control onChange={this.onNameChange} type="text" placeholder="Project Name" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Control onChange={this.onDesChange} type="text" placeholder="Short Description" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Project Features :</Form.Label>
                                    <ReactQuill onChange={this.onFeaturesChange} theme="snow" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Control onChange={this.onLinkChange} type="text" placeholder="Live Preview Link" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Image One :</Form.Label>
                                    <Form.Control onChange={this.onPhotoOneChange} type="file" placeholder="Image One" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Image Two :</Form.Label>
                                    <Form.Control onChange={this.onPhotoTwoChange} type="file" placeholder="Image Two" />
                                </Form.Group>
                                <Button className="btn btn-block" variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                            <Button className="btn btn-block" onClick={this.addNewModalClose} variant="primary" type="submit">
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

export default ProjectsPage;
