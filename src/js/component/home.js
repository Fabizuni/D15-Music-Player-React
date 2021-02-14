import React from "react";

//include images into your bundle
import { MediaPlayer } from "./MediaPlayer.js";

//create your first component
export function Home() {
	return (
		<div className="text-center container">
			<MediaPlayer />
		</div>
	);
}
