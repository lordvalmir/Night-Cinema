import React from 'react';
import { Link } from "react-router-dom";
import Logo from '../Assets/missing.jpg';

const createfilm = (props, images) => {
  return (
    <ul>
      {
        props.images.map((value, index) => {
          console.log(props.informations.results[index].id);
          if(value !== "missing.jpg") {
            return <Link to={`/Film/${props.informations.results[index].id}` }>
                     <img className="img-contend" 
                         src={value} 
                         key={props.informations.results[index].id} 
                         alt={props.informations.results[index].title} 
                         title={props.informations.results[index].title} 
                         height="120" 
                         width="100px"
                     />
                   </Link>
          } else {
            return <Link to={`/Film/${props.informations.results[index].id}`}>
                     <img className="img-contend" 
                        src={Logo} 
                        key={props.informations.results[index].id} 
                        alt={props.informations.results[index].title} 
                        title={props.informations.results[index].title} 
                        height="120" 
                        width="100px"
                     />
                    </Link>
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
      <div>
        {createfilm(this.state.movies)}
      </div>
    )
  }
}

export default FilmArray;