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
        for (let i = 0; i < 1; i++) {
          //creates and appends image(s)
          const $imageContainer = $("<div>")
            .addClass("image-container")
            .appendTo($(".images-container"));

          //creates the image
          const $image = $("<img>")
            .attr("src", images.photos[i].src.original)
            .appendTo($imageContainer);

          //creates imgOptions div to store user options
          const $imgOptions = $("<div>")
            .addClass("img-options")
            .appendTo($imageContainer);

          //Creates imgLink/imgTag buttons on hover
          //imgLink
          const $imgLink = $("<a>")
            .attr("href", images.photos[i].src.original)
            .appendTo($imgOptions);

          //creates the imgLink icon
          const $imgLinkIcon = $("<ion-icon>")
            .attr("name", "link-outline")
            .appendTo($imgLink);

          //imgTag
          const $imgTag = $("<div>")
            .html(`<img src="${images.photos[i].src.original}">`)
            .attr("id", `photo${i}`)
            .hide()
            .appendTo($imgOptions);

          //creates the imgTag Icon
          const $imgTagIcon = $("<ion-icon>")
            .attr("name", "code-slash-outline")
            .appendTo($imgOptions)
            .on("click", () => {
              let $tempForCopy = $("<input>").appendTo($("body"));
              $tempForCopy.val($imgTag.html()).select();
              document.execCommand("copy");
              $tempForCopy.remove();
            });

          console.log($imgTag.html());
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  //Handles the copying of either the img tag or the link to the user clipboard. Heavily inspired by this blog post: https://www.isquaretechnologies.com/jquery-click-copy-clipboard/. The name of my function is the ssame as articles as it is the most semanctic name for the function.

  $("form").on("submit", getImages);

  // getImages();

  //end before
});
// Object.entries(images)[3][1][3].src.original
