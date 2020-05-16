$(() => {
  //start after
  //lets call the pexels api

  const getImages = (e) => {
    $(".images-container").empty();

    const key = "563492ad6f9170000100000127c6c722c0654acb97540fefc7b78d86";
    const userQuery = $("input").val() || "mountains";

    $.ajax({
      method: "GET",
      beforeSend: function (auth) {
        auth.setRequestHeader("Authorization", key);
      },
      url: `https://api.pexels.com/v1/search?query=${userQuery}&per_page=30&page=1`,
    }).then(
      (images) => {
        console.log(images);
        if (images.photos.length <= 0) {
          $(".images-container").html(
            `<h1>"${$(
              "input"
            ).val()}"</h1> <h2>didn't return any results. Check your spelling and try again.</h2>`
          );
        } else {
          for (let i = 0; i < 30; i++) {
            //creates and appends image(s)

            //creates the image
            const $imgSrc = images.photos[i].src.large2x;

            const $imageContainer = $("<div>")
              .addClass("image-container")
              .css("background-image", `url(${$imgSrc})`)
              .appendTo($(".images-container"));
            //
            // const $image = $("<img>")
            //   .attr("src", $imgSrc)
            //   .appendTo($imageContainer);

            //creates link back to photographer
            const $photographerLink = $('<a target="_blank">')
              .addClass("photographer")
              .text(images.photos[i].photographer)
              .attr("href", images.photos[i].photographer_url)
              .appendTo($imageContainer);

            //creates imgOptions div to store user options
            const $imgOptions = $("<div>")
              .addClass("img-options")

              .appendTo($imageContainer);

            //creates the imgLink icon
            const $imgLinkIcon = $("<ion-icon>")
              .attr("name", "link-outline")
              .appendTo($imgOptions)
              .on("click", () => {
                let $tempForCopy = $("<input>").appendTo($("body"));
                $tempForCopy.val($imgSrc).select();
                document.execCommand("copy");
                $tempForCopy.remove();
              });

            //imgTag
            const $imgTag = $("<div>")
              .html(`<img src="${$imgSrc}">`)
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
          }
        }
        $("input").val("");
      },
      (error) => {
        $(".images-container").html("<h1>Why????? Why??????</h1>");
      }
    );
  };

  //Handles the copying of either the img tag or the link to the user clipboard. Heavily inspired by this blog post: https://www.isquaretechnologies.com/jquery-click-copy-clipboard/. The name of my function is the ssame as articles as it is the most semanctic name for the function.

  $("form").on("submit", (e) => {
    getImages();
    e.preventDefault();
  });

  getImages();
  // getImages();

  //end before
});
// Object.entries(images)[3][1][3].src.original
