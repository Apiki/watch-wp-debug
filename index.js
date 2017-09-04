const chokidar = require( 'chokidar' );
const notifier = require( 'node-notifier' );
const fs       = require( 'fs' );
const read     = require( 'read-last-lines' );
const colors   = require( 'colors' );
const open     = require( 'opn' );
const apps     = ['google chrome', 'google-chrome', 'chrome'];

if ( !process.argv[2] ) {
	console.log( 'file is not defined'.red );
	process.exit( 1 );
}

function onReadNotify(path, lines) {
	notifier.notify({
		title: path,
		message: lines,
		wait: true
	});
}

const watcher = chokidar.watch( process.argv[2], {
	persistent: true
});

watcher
	.on( 'change', (path, stats) => {
		read.read( path, 1 ).then( onReadNotify.bind( null, path ) );
	})
;

notifier.on( 'click', () => {
	open( process.argv[2], { app: apps } );
});

console.log( `watching ${process.argv[2]}`.green );
