import React from 'react';

import shaka from 'shaka-player';


class Watch extends React.Component {
  constructor(props) {
	  super(props);
    this.state = {
      id: `/Film/${this.props.match.params.id}`
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
				<video id="film_video"
				       controls autoPlay>
	   		</video>
			</div>
		)
	}
}

export default Watch;