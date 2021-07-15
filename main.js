let immagine
let pg
let spessore
let img

function setup(){

	const canvas = createCanvas(100, 100)
	//const canvas = 
/* 	createCanvas(100,100).parent("canvas") */
	const input = createFileInput(handleFile)
	input.parent("file_upload_container") 
	canvas.parent('canvas');
	pixelDensity(1);
	pg = createGraphics(100, 100)
}

function draw(){
	image(pg, 0, 0)	
}

document.getElementById("codifica").addEventListener("click", function(){
	const chiave = getKey()
	console.log(chiave)
	encode(pg, chiave)	
});

document.getElementById("decodifica").addEventListener("click", function(){
	const chiave = getKey()
	decode(pg, chiave)	
});

document.getElementById("randomKey").addEventListener("click", function(){
	const chiave = generaChiaveRandom(pg)
	document.getElementById("testo").value = chiave.join(' ')	
});

function decode(pg, chiave) {
	for(let i=chiave.length-3; i>=0; i-=3){
		swap(pg, chiave[i], chiave[i+1],  chiave[i+2])
	}
}

function encode(pg, chiave) {
	for(let i = 0; i < chiave.length; i+=3){
		swap(pg, chiave[i], chiave[i+1],  chiave[i+2])
	}
}

function inizializzaImmagine(immagine) {

	console.log(immagine)
	console.log(immagine.width, immagine.height)

	// resize canvas
	resizeCanvas(immagine.width, immagine.height)
	// resize graphics, copia immagine
	pg.resizeCanvas(immagine.width, immagine.height);
	pg.background(255)
	pg.image(immagine, 0, 0)
}

function swapX(pg, larghezza, x1, x2) {
	let regione1 = pg.get(x1, 0, larghezza, pg.height)
	let regione2 = pg.get(x2, 0, larghezza, pg.height)
	pg.image(regione1, x2, 0)
	pg.image(regione2, x1, 0)
}

function swapY(pg, altezza, y1, y2) {
	let regione1 = pg.get(0, y1, pg.width, altezza)
	let regione2 = pg.get(0, y2, pg.width, altezza)
	pg.image(regione1, 0, y2)
	pg.image(regione2, 0, y1)
}

function swap(pg, spessore, a, b) {
	if(spessore < 0){
		swapY(pg, Math.abs(spessore), a, b)
	} else {
		swapX(pg, spessore, a, b)
	}
}

function handleFile(file) {
	if (file.type === 'image') {
		img = createImg(file.data, '')
		img.hide()
		setTimeout( () => {
			inizializzaImmagine(img)
			img = null
		}, 200)
	}
}

function salvaImm(){
	salvaFile();
}

function salvaFile(){
	let fileName = "out_" + new Date().getTime()
	saveCanvas(pg, fileName, 'png')
}

function copiaChiave() {
	var copyText = document.getElementById("testo");
	copyText.select();
	copyText.setSelectionRange(0, 99999)
	document.execCommand("copy");
	alert("Your key is copied: " + copyText.value);
  }

function getKey() {
	return document.getElementById("testo").value.trim().split(' ') 
}

function generaChiaveRandom(pg){

	let lunghezza = Math.floor(random(20, 50))
	let chiave = []

	for(let i=0; i<lunghezza; i++){
		let segno = random(1) < 0.5 ? -1 : 1;
		let dim = segno == -1 ? pg.height : pg.width
		let s = Math.floor(random(10, dim/4))
		let a =  Math.floor(random(0, dim/2-s))
		let b = Math.floor(random(dim/2, dim-s))
		chiave.push(s*segno, a, b)
	}
	return chiave
  }