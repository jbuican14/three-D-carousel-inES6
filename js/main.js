let carousel, currentIndex=0, countNum=8, position, myAutoAnimation;


init = () => {
    console.log('loading after global carousel library is ready...');
    let rotateY =  globalCarouselLib(8); 
    carousel = document.querySelector('.threeD_carousel');
    var next = globalLib( '#next')[0];
    var prev = globalLib( '#prev')[0];
    next.addEventListener('click', displayContentHandler);
    prev.addEventListener('click', displayContentHandler);
}

displayContentHandler = (event) => {
    if(event.toElement.innerText == 'NEXT') {
        currentIndex++; 
    }else{
        currentIndex--; 
    }
    display3D();
}


display3D = () => {
    if(currentIndex > 7 ) {
        currentIndex = 0;
        position = 0;
        carousel.style.transform = 'translateZ(-362px) rotateY(' + position + 'deg)';
        return;
    }
    position = currentIndex / countNum * -360; 
    carousel.style.transform = 'translateZ(-362px) rotateY(' + position + 'deg) scale(1.2)'; 
}


globalCarouselLib.ready(init);