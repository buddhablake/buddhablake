$(() => {
  //start after
  //lets call the pexels api

  const getImages = (e) => {
    const key = "563492ad6f9170000100000127c6c722c0654acb97540fefc7b78d86";

    $.ajax({
      method: "GET",
      beforeSend: function (auth) {
        auth.setRequestHeader("Authorization", key);
      },
      url: `https://api.pexels.com/v1/search?query=people smiling&per_page=8&page=1`,
    }).then(
      (images) => {
        for (let i = 0; i < 5; i++) {
          const $image = $("<img>")
            .attr("src", images.photos[i].src.original)
            .appendTo($("body"));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // getImages();

  //end before
});
// Object.entries(images)[3][1][3].src.original
