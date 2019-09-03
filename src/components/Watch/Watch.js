import React from 'react';
import { Link } from "react-router-dom";
import shaka from 'shaka-player';
import End from '../Assets/end.png';

class Watch extends React.Component {
  constructor(props) {
	  super(props);
	  console.log(this.props.location.type)
    this.state = {
      id: `/${this.props.location.type}/${this.props.match.params.id}`,
      backgraund: this.props.location.backgraund,
    }
	}

  componentDidMount() { 
    shaka.polyfill.installAll();
    this.initPlayer()
  }

	initPlayer(){
		var manifestUri = '//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
		const video = document.getElementById('film_video');
		var player = new shaka.Player(video);
		window.player = player;
		player.addEventListener('error', this.onErrorEvent);
		player.load(manifestUri).then(function() {
			console.log('The video has now been loaded!');
		}).catch(this.onError); 
	}

	render() {
		return (
			<div className="watch_film">
				<div>
		    	<Link to={this.state.id}>
		    		<img className="end" alt='' src={End}/>
	      	</Link>
				</div>
				<div id="film_video_div">
					<video id="film_video"
								 poster={this.state.backgraund} 
					       controls autoPlay>
		   		</video>
	   		</div>
			</div>
		)
	}
}

export default Watch;