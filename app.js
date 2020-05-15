$(() => {
  //start after
  //lets call the pexels api

  const getImages = (e) => {
    e.preventDefault();
    const key = "563492ad6f9170000100000127c6c722c0654acb97540fefc7b78d86";
    const userQuery = $("input").val();

    $.ajax({
      method: "GET",
      beforeSend: function (auth) {
        auth.setRequestHeader("Authorization", key);
      },
      url: `https://api.pexels.com/v1/search?query=${userQuery}&per_page=1&page=1`,
    }).then(
      (images) => {
        for (let i = 0; i < 5; i++) {
          //creates and appends image(s)
          const $image = $("<img>")
            .attr("src", images.photos[i].src.original)
            .appendTo($("body"));

          //Creates imgLink/imgTag buttons on hover
          //imgLink
          const $imgLink = $("<a>")
            .attr("href", images.photos[i].src.original)
            .appendTo($("body"));

          const $imgLinkIcon = $("<ion-icon>")
            .attr("name", "link-outline")
            .appendTo($imgLink);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  //Handles the copying of either the img tag or the link to the user clipboard. Heavily inspired by this blog post: https://www.isquaretechnologies.com/jquery-click-copy-clipboard/. The name of my function is the ssame as articles as it is the most semanctic name for the function.

  const copyToClipboard = (e, element) => {};

  $("form").on("submit", getImages);

  // getImages();

  //end before
});
// Object.entries(images)[3][1][3].src.original
