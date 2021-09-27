//getElementsByTagName etc returns a nodelist, and i found this code on stack overflow
//https://stackoverflow.com/questions/2430121/javascript-concatenate-multiple-nodelists-together
function mergeNodeLists(a, b) {
  var slice = Array.prototype.slice;
  return slice.call(a).concat(slice.call(b));
}

const lightbox = document.createElement('div')
lightbox.id = 'lightbox';

document.body.appendChild(lightbox);

const previous = document.createElement('a');
previous.setAttribute("onclick",  "load_previous()");
previous.style.color = "white";
previous.style['font-size'] = '32px';
previous.style['font-weight'] = '900';
previous.style['cursor'] = 'pointer';
previous.text = '❮';

const next = document.createElement('a');
next.setAttribute("onclick", "load_next()");
next.style.color = "white";
next.style['font-size'] = '32px';
next.style['font-weight'] = '900';
next.style['cursor'] = 'pointer';
next.text = '❯';

lightbox.appendChild(previous);
lightbox.appendChild(document.createElement('img'));
lightbox.appendChild(next);

const galleries = document.getElementsByClassName('content');
images = [];
for(i=0; i<galleries.length; i++){
	images1 = galleries[i].querySelectorAll('img');
	images1.forEach(image =>{
		image.addEventListener('click', e=>{
			document.getElementsByTagName('body')[0].style.margin = 0;
			placeholder = lightbox.getElementsByTagName('img')[0];
			placeholder.src = image.src;
			placeholder.alt = image.alt;
			lightbox.classList.add('active');
		})
	})
	images = mergeNodeLists(images, images1);
}

lightbox.addEventListener('click', e=>{
	if(e.target != e.currentTarget) return;
	// document.getElementsByTagName('body')[0].style.margin = "8px 8px 8px ";
	lightbox.classList.remove('active');
})

document.addEventListener('keydown',e=>{
	if(lightbox.classList.contains('active')){
		if(event.code == "ArrowLeft") load_previous();
		if(event.code == "ArrowRight") load_next();
	}
})

function load_next(){
	current = lightbox.getElementsByTagName('img')[0]
	for(i=0; i<images.length; i++){
		if (images[i].alt==current.alt){
			if (i<(images.length-1)) {
				images[i+1].click();//thanks to something called bubbling, this triggers a click event on the parent
			}
			else { images[0].click();};//modular arithmetic is broken? -1 gives -1
			break;
		}
	}
}

function load_previous(){
	current = lightbox.getElementsByTagName('img')[0]
	for(i=0; i<images.length; i++){
		if (images[i].alt==current.alt){
			if (i>=1) images[i-1].click();
			else images[images.length-1].click();//modular arithmetic is broken? -1 gives -1
			break;
		}
	}
}

function image_handler(gallery_id){
	var list_of_galleries = document.getElementsByClassName("gallery");
	for(i=0; i< list_of_galleries.length; i++){
		if (list_of_galleries[i].id == gallery_id){
			if (!lightbox.classList.contains('active') && list_of_galleries[i].style.display == "grid"){
				list_of_galleries[i].style.display = "none";
			}
			else{
				list_of_galleries[i].style.display = "grid";
			}
		}
		else{
			list_of_galleries[i].style.display = "none";
		}
	}
}
