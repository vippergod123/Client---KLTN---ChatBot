import React, { Component } from 'react';
import { Button, Row, Card, Pagination, Input, Divider, message, Spin, Select } from 'antd';
import PostCard from "./PostCard"
import axios from '../../Config/axiosConfig';
import moment from "moment"
const { TextArea } = Input;
const {Option} = Select


class QnA extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            post:[],
            page: 0,
            total: 0,
            limit: 5,
            isLoading: true,
            isPosting: false,
            isCommenting: false,
            student: null,
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.fetchPostFromServer = this.fetchPostFromServer.bind(this)
    }


    //#region component method
    componentWillMount()  {
        this.fetchPostFromServer(this.state.page)
        window.scrollTo(0,0)

        const student = sessionStorage.getItem("student")
        this.setState({student: student?student:null})

    }
    //#endregion

    //#region method
    fetchPostFromServer(page) { 
        const {limit} = this.state
        console.log(page);
        
        this.setState({isLoading:true})
        axios.post ("/client/post/get/paging", { 
            page: page,
            limit: limit,
        })
        .then (res => {
            const data =res.data.data
            const {total, post} = data
            this.setState({
                post: post,
                total: total
            })
            
        })
        .catch (err => { 
            if ( err.response) { 
                err = err.response.data
                message(err.message,2)
            }
            else { 
                message.error(err.toString(),2)
            }
            // err = err.response? err.response.data: err.toString()
            // message(err.message,2)

        })
        .finally( () => {
            this.setState({isLoading:false})
        })
    }
    //#endregion
    
    //#region method handle
    handlePageChange(page, pageSize ) {
        
        this.setState({page: page -1})
        this.fetchPostFromServer(page-1)
        const QA = document.getElementById("QA_DIV")
        
        window.scrollTo({
            top: QA.offsetHeight+300,
            behavior: 'smooth',
            
        })
        
    }

    handlePostQuestion() { 
        var question = document.getElementById("question").value ? document.getElementById("question").value : ""

        this.setState({isPosting:true})
        message.loading("loading...",1).then (() => {
            axios.post("/client/post/create", { 
                create_time: moment(new Date()).valueOf(),
                question: question,
                student:"Duy",
            })
            .then( res => {
                message.success("Thành công!",2)
                this.fetchPostFromServer(this.state.page)
            })
            .catch(err => {
                if ( err.response) { 
                    err = err.response.data
                    console.log(err.message);
                    
                    message.error(err.message.toString(), 2)
                }
                else { 
                    message.error(err.toString(),2)
                }
            })
            .finally(() => { 
                this.setState({isPosting:false})
                document.getElementById("question").value = ""
            })
        })
    }

    handleCommentPost(post, student) { 
        var temp = document.getElementById("comment_post" + post.id).value
        const comment =  temp ? temp: ""

        if (comment === "") {
            message.error("Bình luận không hợp lệ!",2)
            return 
        }

        this.setState({isCommenting:true})
        axios.post("/client/comment_post/comment", { 
            post: post,
            comment: comment,
            user: student
        })
        .then( () => { 
            this.fetchPostFromServer(this.state.page)
            document.getElementById("comment_post" + post.id).value = ""
        })
        .catch ( err => { 
            if ( err.response) { 
                err = err.response.data
                console.log(err.message);
                message.error(err.message.toString(), 2)
            }
            else { 
                message.error(err.toString(),2)
            }
        })
        .finally( () => {
            this.setState({isCommenting:false})
        })
        
    }
    //#endregion

    
    render() {
        const {total,page, post, isLoading, limit, isPosting, student, isCommenting} = this.state
        
        return (
            <div>
                <section id="mu-page-breadcrumb">
                    <div class="container">
                        <div class="row">
                        <div class="col-md-12">
                            <div class="mu-page-breadcrumb-area">
                            <h2>Hỏi đáp</h2>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>

                <section id="mu-course-content">
            
                    <div className ="container">
                        <center>
                            <h4>Là nơi cho các bạn đặt câu hỏi để admin hoặc những ai biết câu trả lời sẽ giải đáp thắc mắc! 
                            </h4>
                            <h4>Nên bạn cứ thoải mái nhé ! 
                            </h4>
                            
                        </center>

                        <br/>
                        <Row>
                        <TextArea placeholder="Hãy đặt câu hỏi của bạn ở đây? " autosize={{ minRows: 2, maxRows: 6 }} id = "question"/>
                        {/* <textarea required="required" aria-required="true" rows="8" cols="45" id = "question" placeholder = "Hãy đặt câu hỏi của bạn ở đây? "></textarea> */}
                        </Row>
                        <Row>
                        <Button style = {{float:"right", marginTop:"20px"}} loading = {isPosting} onClick = {this.handlePostQuestion.bind(this)}>Đăng câu hỏi</Button>
                        </Row>
                        <br/>
                        <Divider><h3 id = "QA_DIV">Q&A</h3></Divider>
                         <Spin spinning = {isLoading} >{post.map(each=> { 
                            return (<PostCard post = {each} student = {student} handleCommentPost= {this.handleCommentPost.bind(this)} isCommenting = { isCommenting } />)
                        })}</Spin>

                        <Pagination defaultCurrent={page + 1} pageSize = {limit} total = {total}  style = {{float:"right"}} 
                                    onChange = { this.handlePageChange}/>
                      
                    </div>
                </section>
                    
            </div>
        );
    }
}

export default QnA;