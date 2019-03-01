/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {withRouter} from "react-router-dom"

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      page: null,
    }
  }
  
  componentDidMount(){ 
      this.setState({ 
        page: this.props.location.pathname.split("/")[1],
      })
  }

    render() {
        return (
          <div>
            <section id="mu-menu">
            <nav className="navbar navbar-default" role="navigation">  
              <div className="container">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a class="navbar-brand" href="/"><img src="/assets/img/logo.png" alt="logo"/></a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                  <ul id="top-menu" className="nav navbar-nav navbar-right main-nav">

                    <li className = {this.state.page === "" ? "active" : null}><a href="/">Trang chủ</a></li>    

                    <li className = {this.state.page === "department" ? "active dropdown" : null}>
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown">Giới thiệu <span className="fa fa-angle-down"></span></a>
                      <ul className="dropdown-menu" role="menu">
                        <li><a href="/department">Các Khoa</a></li>                
                        <li><a href="course-detail.html">Đoàn thanh niên</a></li>                
                        <li><a href="course-detail.html">Hội sinh viên</a></li>                
                      </ul>
                    </li>

                    <li><a href="gallery.html">Gallery</a></li>

                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown">Blog <span className="fa fa-angle-down"></span></a>
                      <ul className="dropdown-menu" role="menu">
                        <li><a href="blog-archive.html">Blog Archive</a></li>                
                        <li><a href="blog-single.html">Blog Single</a></li>                
                      </ul>
                    </li>  

                    <li className = {this.state.page === "contact" ? "active" : null}><a href="contact">Liên hệ</a></li>

                    <li><a href="#" id="mu-search-icon"><i className="fa fa-search"></i></a></li>
                    
                  </ul>                     
                </div>
              </div>     
            </nav>
          </section>

          <div id="mu-search">
          <div class="mu-search-area">      
            <button class="mu-search-close"><span class="fa fa-close"></span></button>
            <div class="container">
              <div class="row">
                <div class="col-md-12">            
                  <form class="mu-search-form">
                    <input type="search" placeholder="Type Your Keyword(s) & Hit Enter"/>              
                  </form>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        );
    }
}

export default withRouter(Header)