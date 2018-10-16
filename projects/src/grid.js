import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom'
import './grid.css';
import {add, color, divStyle, divStyletext, button, gridstyle, gridstyles, grstyle } from './style';

export default class Grids extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      message:'not at bottom',
      response:[],
      limit:10,
      loading: false,
      imgstate:false
    };
    this.doAThing = this.doAThing.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  setimg(){
    if(this.state.response.length%20 == 0){
      let url = 'https://picsum.photos/320/200?image='+Math.floor(Math.random() * 100) + 1;
      return(
        <header style={add}>
          <p>Here you're sure to find a bargain on some of the finest ascii available to purchase'</p>
          <p>But first, a word from our sponsors:</p>
          <img size="60" src={url} / >
        </header>

      )
    }
    else{
      // this.setState({imgstate:false})
    }
  }
  doAThing() {
    this.setState({ loading: true });
  }
  getstyle(){
    let _status;
    this.doAThing()
    var basepath = 'http://192.168.43.31:3000/api/products?_page=1&&_limit='+this.state.limit
      fetch(basepath, {
      timeout:60000,
      method: "GET",
      headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(response => {
        _status = response.status
        return response.json()
       })
       .then(response =>{
         this.setState({response:response})
       })
    .catch((error) => {
        alert(error)
    })
  }
    componentWillMount (){
      this.getstyle()
    }
    handleScroll() {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
      // alert("btoom")
      let status = this.state.limit + 10
      this.setState({limit:status})
      this.getstyle()
      } else {
        // alert("not")
      }
    }

    componentDidMount() {
      window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }
    returntime = (data) =>{
      let date = new Date(data)
      let now = new Date()
      var timeDiff = Math.abs(now.getTime() - date.getTime());
      let days = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if(days <= 7){
        return (days + ' days before')
      }
      if(days > 7 && days <= 14){
        return '1 week before'
      }
      else {
        return (date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear())
      }

    }
    returngrid =()=>{
      let response = this.state.response
      let gridcollection = response
      let grids = []
      gridcollection.map(item=>{
        grids.push(
          <Grid.Row>
            <Grid.Column style={gridstyles}>
              <p style={divStyle}>{item.face}</p>
              <p style={divStyletext}>Size: {item.size}</p>
              <p style={divStyletext}>{'\u0024'} {item.price}</p>
              <p style={divStyletext}>{this.returntime(item.date)}</p>
            </Grid.Column>
            <Grid.Column style={grstyle}>
              <p style={divStyle}>{item.face}</p>
              <p style={divStyletext}>Size: {item.size}</p>
              <p style={divStyletext}>{'\u0024'} {item.price}</p>
              <p style={divStyletext}>{this.returntime(item.date)}</p>
            </Grid.Column>
          </Grid.Row>
        )
      })
      return(
        <Grid columns={2} divided style={gridstyle}>
          {grids}
          {this.setimg()}
        </Grid>
      )
    }
    routesize = ()=>{
      let _status;
      this.doAThing()
      var basepath = 'http://192.168.43.31:3000/api/products?_page=1&&_limit='+ this.state.limit +'&&_sort=size'
        fetch(basepath, {
        timeout:60000,
        method: "GET",
        headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => {
          _status = response.status
          return response.json()
         })
         .then(response =>{
           this.setState({response:response})
         })
      .catch((error) => {
          alert(error)
      })
    }
    routeprice = ()=>{
      let _status;
      this.doAThing()
      var basepath = 'http://192.168.43.31:3000/api/products?_page=1&&_limit='+this.state.limit+'&&_sort=prize'
        fetch(basepath, {
        timeout:60000,
        method: "GET",
        headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => {
          _status = response.status
          return response.json()
         })
         .then(response =>{
           this.setState({response:response})
         })
      .catch((error) => {
          alert(error)
      })
    }
    routeid = ()=>{
      let _status;
      this.doAThing()
      var basepath = 'http://192.168.43.31:3000/api/products?_page=1&&_limit='+ this.state.limit+'&&_sort=id'
        fetch(basepath, {
        timeout:60000,
        method: "GET",
        headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => {
          _status = response.status
          return response.json()
         })
         .then(response =>{
           this.setState({response:response})
         })
      .catch((error) => {
          alert(error)
      })
    }
  returnmenu =()=>{
    return(
      <div>
        <button color="#841584" style={button} onClick = {this.routesize}>Sort by size </button>
        <button color="#841584" style={button} onClick = {this.routeprice}>Sort by price </button>
        <button color="#841584" style={button} onClick = {this.routeid}>Sort by id </button>
        </div>
    )
  }
  render() {
    return (
    <div>
      {this.returnmenu()}
      {this.returngrid()}
      {this.state.loading && <img size={10} src={require('./loading.gif')} /> }

    </div>
    );
  }
}
