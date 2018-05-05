import { Subject } from 'rxjs/Subject'

export function Tmi(opts) {

	const message$ = new Subject()


	function Client(options, steram$) {
		this.username = options.username
		this.password = 'oauth:' + options.password
		this.channel = '#' + options.channel

		this.server = 'irc-ws.chat.twitch.tv'
		this.port = 443

		this.message$ = steram$
	}

	Client.prototype.open = function open(){
		this.webSocket = new WebSocket('wss://' + this.server + ':' + this.port + '/', 'irc')

		this.webSocket.onmessage = this.onMessage.bind(this)
		this.webSocket.onerror = this.onError.bind(this)
		this.webSocket.onclose = this.onClose.bind(this)
		this.webSocket.onopen = this.onOpen.bind(this)
	}

	Client.prototype.onError = function onError(message){
		this.message$.complete()
		console.log('Error: ' + message)
	}

	Client.prototype.onMessage = function onMessage(message){
		if(message === null) {
			return
		}

		const parsed = this.parseMessage(message.data)

		if(parsed.command === 'PING') {
			this.webSocket.send('PONG :' + parsed.message)
		} else if (parsed.command === 'PRIVMSG') {
			this.message$.next(parsed)
		}

	}

	Client.prototype.onOpen = function onOpen(){
		var socket = this.webSocket

		if (socket !== null && socket.readyState === 1) {
			console.log('Connecting and authenticating...')

			socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership')
			socket.send('PASS ' + this.password)
			socket.send('NICK ' + this.username)
			socket.send('JOIN ' + this.channel)
		}
	}

	Client.prototype.onClose = function onClose(){
		console.log('Disconnected from the chat server.')
		this.message$.complete()
	}

	Client.prototype.close = function close(){
		if(this.webSocket){
			this.webSocket.close()
		}
	}

	/**
	 * @badges=;color=#FF0000;display-name=Shad_HC;emotes=;id=4a1921ee-2409-403c-9ec5-11170a2f9cd4;mod=0;room-id=36483360;subscriber=0;tmi-sent-ts=1525533286053;turbo=0;user-id=43015283;user-type= :shad_hc!shad_hc@shad_hc.tmi.twitch.tv PRIVMSG #zizaran :POGGERS
	 */
	Client.prototype.parseMessage = function parseMessage(rawMessage) {
		var parsedMessage = new TmiMessage(rawMessage)

		if(rawMessage[0] === '@'){
			const tagIndex = rawMessage.indexOf(' ')
			const userIndex = rawMessage.indexOf(' ', tagIndex + 1)
			const commandIndex = rawMessage.indexOf(' ', userIndex + 1)
			const channelIndex = rawMessage.indexOf(' ', commandIndex + 1)
			const messageIndex = rawMessage.indexOf(':', channelIndex + 1)

			parsedMessage.tags = rawMessage.slice(1, tagIndex)
			parsedMessage.username = rawMessage.slice(tagIndex + 2, rawMessage.indexOf('!'))
			parsedMessage.command = rawMessage.slice(userIndex + 1, commandIndex)
			parsedMessage.channel = rawMessage.slice(commandIndex + 1, channelIndex)
			parsedMessage.message = rawMessage.slice(messageIndex + 1).trim()
		} else if(rawMessage.startsWith('PING')) {
			parsedMessage.command = 'PING'
			parsedMessage.message = rawMessage.split(':')[1]
		}

		return parsedMessage
	}

	const client = new Client(opts, message$)
	client.open()

	return {
		close() {
			client.close()
		},
		message$
	}
}


export class TmiMessage {
	constructor(rawMessage) {
		this.message = null
		this.tags = null
		this.command = null
		this.original = rawMessage
		this.channel = null
		this.username = null
		this._tagMap = null
	}

	getTag(name) {
		if (this._tagMap && this._tagMap[name] !== undefined) {
			return this._tagMap[name]
		}

		this._tagMap = {}

		const regex = /(([a-z-]+)=([^;]*))+/g
		let m
		while ((m = regex.exec(this.tags)) !== null) {
			// This is necessary to avoid infinite loops with zero-width matches
			if (m.index === regex.lastIndex) {
				regex.lastIndex++
			}
			this._tagMap[m[2]] = m[3]
		}

		return this._tagMap[name]
	}
}