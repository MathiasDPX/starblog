// Fork of https://raw.githubusercontent.com/jhvanderschee/jekyllcodex/gh-pages/js/lightbox.js
// 
// - Remove Vimeo / YouTube support
// - Remove gallery
// - Change logic (all images to images with lightbox-image class)

function is_imagelink(url) {
    var p = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
    return (url.match(p)) ? true : false;
}

function setGallery(el) {
    var elements = document.body.querySelectorAll(".gallery");
    elements.forEach(element => {
        element.classList.remove('gallery');
	});
    el.classList.add('current');
}

document.addEventListener("DOMContentLoaded", function() {
    //create lightbox div in the footer
    var newdiv = document.createElement("div");
    newdiv.setAttribute('id',"lightbox");
    document.body.appendChild(newdiv);

    //remove the clicked lightbox
    document.getElementById('lightbox').addEventListener("click", function(event) {
        this.innerHTML = '';
        document.getElementById('lightbox').style.display = 'none';
    });

    //add the image lightbox on click
    var elements = document.querySelectorAll('img.lightbox-image');
    elements.forEach(element => {
        element.addEventListener("click", function(event) {
            event.preventDefault();
            document.getElementById('lightbox').innerHTML = '<a id="next">&rsaquo;</a><a id="prev">&lsaquo;</a><div class="img" style="background: url(\''+this.getAttribute('src')+'\') center center / contain no-repeat;" title="'+this.getAttribute('alt')+'" ><img src="'+this.getAttribute('src')+'" alt="'+this.getAttribute('alt')+'" /></div><span>'+this.getAttribute('alt')+'</span>';
            document.getElementById('lightbox').style.display = 'block';

            setGallery(this);
        });
    });

});