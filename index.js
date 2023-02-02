const companiesLogo = ["/assets/img/companies/logo-kodi.png","/assets/img/companies/logo-plex.png", "/assets/img/companies/logo-netflix.png", "/assets/img/companies", "/assets/img/companies/logo-infuse.png", "/assets/img/companies/logo-jellyfin.png", "/assets/img/companies/logo-emby.png", "/assets/img/companies/logo-mediaportal.png", "/assets/img/companies", "/assets/img/companies/logo-mrmac.png", "/assets/img/companies/logo-stremio.png", "/assets/img/companies/logo-vlc.png"]

function displayImages(image) {
    let html = "";
    image.forEach(logo => {
      html += `<img src="${logo}" />`;
    });
    document.querySelector(".media-center").innerHTML = html;
}

displayImages(companiesLogo)



const text = document.querySelector(".episode-container p");
// console.log(text)
// text.style.opacity = 0.2;
// document.querySelector(".ep-art").style.opacity = 0.2



function handleHover() {
  // Get the text element and image
  
const image = document.getElementById("ep-art");
// console.log(image)
// image.style.opacity = 0.1

  // // Change the opacity of the text when the mouse hovers over it
  // text.addEventListener("mouseenter", () => {
  //   text.style.color = "red";
  //   image.style.filter = "brightness(0.8)";
  // });

  // // Change the opacity of the text back when the mouse leaves
  // text.addEventListener("mouseleave", () => {
  //   text.style.opacity = 1;
  //   text.style.color = "black";
  //   image.style.filter = "brightness(1)";
  // });
}

handleHover();

