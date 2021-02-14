import React from "react";
import ReactDOM from "react-dom";

//create your first component
export class MediaPlayer extends React.Component {
	constructor() {
		super();
		this.state = {
			fetchData: [],
			currentSong: "",
			currentIndex: 0
		};
		this.myAudioRef = React.createRef();
		this.playNext = this.playNext.bind(this);
		this.playBefore = this.playBefore.bind(this);
		this.domain = "https://assets.breatheco.de/apis/sound/";
	}
	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(response => response.json())
			.then(data => {
				this.setState({ fetchData: data });
				this.loadSong(this.domain + data[0].url, 0);
			});
	}

	loadSong(url, index) {
		this.setState({
			currentSong: url,
			currentIndex: index
		});
		this.myAudioRef.current.load();
	}

	playSong(url, index) {
		this.loadSong(url, index);
		this.myAudioRef.current.play();
	}

	playNext() {
		const nextIndex = this.state.currentIndex + 1;
		const nextSong =
			this.state.fetchData[nextIndex] || this.state.fetchData[0];
		this.playSong(this.domain + nextSong.url, nextIndex);
	}

	playBefore() {
		const beforeIndex = this.state.currentIndex - 1;
		const beforeSong =
			this.state.fetchData[beforeIndex] ||
			this.state.fetchData[this.state.fetchData.length - 1];
		this.playSong(this.domain + beforeSong.url, beforeIndex);
	}

	render() {
		return (
			<div className="container bg-light">
				<i className="fas fa-3x fa-headphones-alt"></i>
				<h1>MUSIC PLAYER</h1>
				{this.state.fetchData.map((song, i) => {
					const songURL = this.domain + song.url;
					return (
						<>
							<div className="bg-dark text-light rounded-pill m-2 shadow-lg">
								<div key={i}>
									<ul>
										<li
											onClick={() =>
												this.playSong(songURL, i)
											}>
											<h3>{song.name}</h3>
										</li>
									</ul>
								</div>
							</div>
						</>
					);
				})}
				<div>
					<i
						onClick={this.playBefore}
						className="fas fa-2x mr-4 fa-step-backward"></i>
					<audio controls ref={this.myAudioRef}>
						<source
							src={this.state.currentSong}
							type="audio/mpeg"
						/>
					</audio>
					<i
						onClick={this.playNext}
						className="fas fa-2x ml-4 fa-step-forward"></i>
				</div>
				<div>
					<i className="fas fa-2x m-5 fa-home"></i>
					<i className="fas fa-2x m-5 fa-search"></i>
					<i className="fas fa-2x m-5 fa-download"></i>
					<i className="fas fa-2x m-5 fa-bars"></i>
				</div>
			</div>
		);
	}
}
