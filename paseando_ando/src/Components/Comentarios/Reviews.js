import React, { Component } from 'react'

export default class Reviews extends Component {
  constructor(props){
    super(props);
    this.state={mostrar:props.mostrarReviews}
  }

  manejoOnClick = (e) => {
    console.log(this.props.comentarios)
    if (e.target.id='reviews'){
      this.setState((prevState) => {
        return {mostrarReviws:!prevState.mostrarReviews}
      })
    }
  }

  render() { 

   var arr = this.props.comentarios
   const nombres = arr.map((props, index )=>{
     return <div key={index}>
              {props}
            </div>

   })
 
  //  if (arr.length >= 5){
  //    for (var i = 0; i < arr.length; i++){
  //      var obj = arr[i]

  //    }
  //  }
   console.log(nombres)
    return (
      <div id="reviews" className="container">
        <a href='#' onClick={this.manejoOnClick}>Comentarios</a>

     </div>
    )
  }
}
