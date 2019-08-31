import React from 'react';
import { Link } from "react-router-dom";
import Logo from '../Assets/missing.jpg';

const createfilm = (props, images, film) => {
  return (
    <ul>  
    {
      props.images.map((value, index) => {
        if(value){
          if(index <= 8) {
            if(value !== "missing.jpg") {
              return <Link key={props.informations.results[index].id} to={`/${props.film}/${props.informations.results[index].id}` }>
                     <img  className="img-contend" 
                           src={props.images[index]} 
                           key={props.informations.results[index].id} 
                           alt={props.informations.results[index].title} 
                           title={props.informations.results[index].title} 
                           height="120px" 
                           width="100px"
                      />
                      </Link>
            } else {
              return <Link key={props.informations.results[index].id} to={`/${props.film}/${props.informations.results[index].id}`}>
                     <img  className="img-contend" 
                           src={Logo} 
                           key={props.informations.results[index].id} 
                           alt={props.informations.results[index].title} 
                           title={props.informations.results[index].title} 
                           height="120px" 
                           width="100px"
                     />
                     </Link>
            }
          } else {
            return null
          }
        } else {
          return null
        }
      })
    }
    </ul>
  )
}

class FilmArray extends React.PureComponent {
  constructor(props){
    super();
    this.state = {
      movies: props
    }
  }


  render(){
    return ( 
      <div className="film-border">
        {createfilm(this.state.movies)}
      </div>
    )
  }
}

export default FilmArray;