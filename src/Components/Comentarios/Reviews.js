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
   /*const review = this.props.comentarios.map((eachChildren)=>{
     return{
       author_name: eachChildren.author_name,
       text: eachChildren.text
     }
   })*/
    var cometarios = "";
    if (this.props.comentarios) {
      const nombre = this.props.comentarios.map((comentario,index) => {
          return <div key={index} className='row'>
                   {comentario}
                 </div>;
      })
    cometarios = 
               <div className='row'>
                <div className='col-3'><strong><a id='reviews' href='#' onClick={this.manejoOnClick} >comentarios</a></strong></div>
                <div className={'col-6 '+(this.state.mostrarReviews ? 'd-block' : 'd-none')}>{nombre}</div>
               </div>
    }else
      cometarios =
                <div className="container">
                  <div className='row'>
                    <strong>No hay comentarios</strong>
                  </div>
                </div>
    return (
      <div id="reviews" className="container">
        <a href='#' onClick={this.manejoOnClick}>Comentarios</a>

     </div>
    )
  }
}
