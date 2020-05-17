$(() => {
  //start after
  //lets call the pexels api
  let $height = $(window).innerHeight();
  console.log($height);
  $("header").css("height", `${$height}px`);

  const getImages = (e) => {
    $(".spell-check-container").remove();
    $(".images-container").empty();

    const key = "563492ad6f9170000100000127c6c722c0654acb97540fefc7b78d86";
    const userQuery = $("input").val();

    $.ajax({
      method: "GET",
      beforeSend: function (auth) {
        auth.setRequestHeader("Authorization", key);
      },
      url: `https://api.pexels.com/v1/search?query=${userQuery}&per_page=30&page=1`,
    }).then(
      (images) => {
        console.log(images);

        $("header")
          .animate({ height: $height * 0.15 }, 200)
          .attr("id", "small")
          .addClass("secondary-header");

        $(".background-filter").addClass("secondary-filter");

        $("input").addClass("secondary-input");

        $(".h1-header").remove();
        // $(".logo").remove();

        if (images.photos.length <= 0) {
          spellCheck();
        } else {
          for (let i = 0; i < 30; i++) {
            $(".images-container")
              .css("height", $height * 0.75)
              .show();
            $(".controls")
              .css("display", "flex")
              .css("height", $height * 0.1)
              .show();
            //creates and appends image(s)

            //creates the image
            const $imgSrc = images.photos[i].src.large2x;

            const $imageContainer = $("<div>")
              .addClass("image-container")
              .css("height", $height * 0.75)
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

            //creates the imgLink icon and c2c functionality
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

            //creates the imgTag Icon and c2c functionality
            const $imgTagIcon = $("<ion-icon>")
              .attr("name", "code-slash-outline")
              .appendTo($imgOptions)
              .on("click", () => {
                let $tempForCopy = $("<input>").appendTo($("body"));
                $tempForCopy.val($imgTag.html()).select();
                document.execCommand("copy");
                $tempForCopy.remove();
              });

            //create the expand icon and c2c functionality
            const $imgDownloadIcon = $(`<a href="${$imgSrc}" target="_blank">`)
              .html(`<ion-icon name="expand-outline"></ion-icon>`)
              .appendTo($imgOptions);
          }
        }
        $("input").val("");
      },
      (error) => {
        $(".images-container").html("<h1>Why????? Why??????</h1>");
      }
    );
  };

  const spellCheck = () => {
    $(".images-container").hide();
    $(".controls").hide();
    const $spellCheckMsg = $("<div>")
      .addClass("spell-check-container")
      .html(
        `<div class="spell-check-msg"><h1>"${$(
          "input"
        ).val()}"</h1> <h2>didn't return any results. Check your spelling and try again.</h2></div>`
      )
      .appendTo($("body"));
  };

  const resizeElems = () => {
    $height = $(window).innerHeight();
    setTimeout(() => {
      if ($("header").attr("id") === "small") {
        $("header").css("height", $height * 0.15);

        $(".images-container").css("height", $height * 0.75);

        $(".image-container").css("height", $height * 0.75);

        $(".controls").css("height", $height * 0.1);
      } else {
        $("header").css("height", $height);
      }
    }, 300);
  };

  //Handles the copying of either the img tag or the link to the user clipboard. Heavily inspired by this blog post: https://www.isquaretechnologies.com/jquery-click-copy-clipboard/. The name of my function is the ssame as articles as it is the most semanctic name for the function.

  $(window).resize(resizeElems);

  $("form").on("submit", (e) => {
    getImages();
    e.preventDefault();
  });

  //end before
});
