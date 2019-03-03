var counter = 0;
function changeBG(){
    var imgs = [
          "url(https://images.unsplash.com/photo-1539527589123-2f5545cf7fe4?ixlib=rb-0.3.5&s=ce82f434627b034fe98b6ddcb8406154&auto=format&fit=crop&w=1000&q=80)",
          "url(https://images.unsplash.com/photo-1493497029755-f49c8e9a8bbe?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3156d332329aee5cd32a302f13134a3c&auto=format&fit=crop&w=889&q=80)",
          "url(https://images.unsplash.com/photo-1539528116789-ef2a737884eb?ixlib=rb-0.3.5&s=33726da4037899cc5eee2a746b0d9b0d&auto=format&fit=crop&w=1000&q=80)",
          "url(https://images.unsplash.com/photo-1444012104069-996724bf4a0a?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450)",
          "url(https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=47b4b88e2825332da6fb93898562051c&auto=format&fit=crop&w=750&q=80)",
      "url(./material/3d_tours/gaharu/gr1.jpg)",
        "url(./material/3d_tours/gaharu/gr2.jpg)",
        "url(./material/3d_tours/gaharu/gr3.jpg)",
        "url(./material/3d_tours/gaharu/gr4.jpg)",
        "url(./material/3d_tours/gaharu/gr5.jpg)",
        "url(./material/3d_tours/gaharu/gr6.jpg)",
        "url(./material/3d_tours/gaharu/gr7.jpg)",
        "url(./material/3d_tours/gaharu/gr8.jpg)",
      ]
    
    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}
  
  setInterval(changeBG, 2000);


