$(() => {
  //start after
  //lets call the pexels api

  const key = "563492ad6f9170000100000127c6c722c0654acb97540fefc7b78d86";

  $.ajax({
    method: "GET",
    beforeSend: function (auth) {
      auth.setRequestHeader("Authorization", key);
    },
    url: `https://api.pexels.com/v1/search?query=people smiling&per_page=1&page=1`,
  }).then(
    (images) => {
      console.log(images);

      const $image = $("<img>")
        .attr("src", images.photos[0].src.original)
        .appendTo($("body"));
    },
    (error) => {
      console.log(error);
    }
  );

  //end before
});
