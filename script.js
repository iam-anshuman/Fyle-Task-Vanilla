let showSlide = 1;
let imageElement = document.createElement('img');
imageElement.src = 'Public/image.png';
imageElement.alt = 'Image';
imageElement.classList.add('w-100');
document.querySelector('.side-image').appendChild(imageElement);

function currentSlide(n) {
    showSlide = n;
    const imageWidth = $('.img-container').width();
    const slideWidth = imageWidth * (showSlide - 1);
    $('.carousel').css('transform', 'translateX(' + (-slideWidth) + 'px)');
    updateDots();
}

function updateDots() {
    $('.dot').removeClass('dot-active');
    $('.dot').eq(showSlide - 1).addClass('dot-active');
}

// Ensure images are loaded before setting initial width
$(document).ready(function() {
    const imageWidth = $('.img-container').width();
    $('.carousel').css('width', imageWidth * $('.img-container').length + 'px');

    // Initialize carousel position and dots
    currentSlide(showSlide);

    // Set Timeout for automatic slide change
    setInterval(function() {
        showSlide = showSlide % ($('.img-container').length - 2) + 1;
        currentSlide(showSlide);
    }, 3000); 

});

function currentImage(element,n){
    showImage = n;
    const imageList = {
        1: 'Public/image.png',
        2: 'Public/image1.jpeg',
        3: 'Public/image2.jpeg',
    };
    imageElement.src = imageList[showImage];
    $('.active-sidebar').removeClass('active-sidebar');
    $(element).addClass('active-sidebar');
}

function handleModal(){
    $('.contact-us-form').css('display','block');
}

function handleClose(){
    $('.contact-us-form').css('display','none');
}

function handleFormSubmit(){
    const email = $('#email').val();
    const first_name = $('#first_name').val();
    const last_name = $('#last_name').val();
    const checkbox = $('#TnC').is(':checked');
    const form = $('#contact-us-form')

    if(email && first_name && last_name && checkbox){
        
    fetch('https://getform.io/f/paqglpea',{
      method:"POST",
      body:JSON.stringify({
        email,
        first_name,
        last_name,
        checkbox
      }),
      headers:{
        "Content-type": "application/json; charset=UTF-8",
        "Accept": "application/json"
      }
    }).then((response)=>{
      if(response.status === 200){
        alert("Form submitted successfully");
        form.trigger('reset');
      }
      else{
        alert("Form submission failed");
        form.trigger('reset');
      }
    }).catch((error)=>{
      alert(error);
      form.trigger('reset');
    })

    handleClose();
    }else{
        alert('Please fill all the fields');
    }
}