export default function( containerId ) {
	let messages = document.getElementById( containerId );
	console.log("set-scroll",messages);
	if (messages != null) {
		setTimeout( () => { messages.scrollTop = messages.scrollHeight; }, 300 );
	}

}