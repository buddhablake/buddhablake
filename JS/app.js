$(() => {
  //start after

  //height of window to be used dynamic element sizing.
  let $height = $(window).innerHeight();

  //Onload sets the height of the header to the height of the window.
  $("header").css("height", `${$height}px`);

  //lets call the pexels api
  const getImages = (e) => {
    //API Key
    const key = "563492ad6f9170000100000127c6c722c0654acb97540fefc7b78d86";

    //user search query
    const userQuery = $("input").val();

    //Cleans up the body to make way for search results
    $(".spell-check-container").remove();
    $(".images-container").empty();
    $(".pexels-link").remove();

    //Begin API call
    $.ajax({
      method: "GET",
      beforeSend: function (auth) {
        auth.setRequestHeader("Authorization", key);
      },
      url: `https://api.pexels.com/v1/search?query=${userQuery}&per_page=30&page=1`,
    }).then(
      (images) => {
        //Moves header to top of page and adds required styling
        $("header")
          .animate({ height: $height * 0.15 }, 200)
          .attr("id", "small")
          .addClass("secondary-header");

        //Repositions logo and search inout
        $(".background-filter").addClass("secondary-filter");
        //Resizes searhc input
        $("input").addClass("secondary-input");
        //removes tagline
        $(".h1-header").remove();

        //Checks to make sure user query returned at least one image. If not spellcheck function is called
        if (images.photos.length <= 0) {
          spellCheck();
        } else {
          //creates slideshow of images
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
                //Handles the copying of either the img tag or the link to the user clipboard. Heavily inspired by this blog post: https://www.isquaretechnologies.com/jquery-click-copy-clipboard/. The name of my function is the ssame as articles as it is the most semanctic name for the function.
                let $tempForCopy = $("<input>").appendTo($("body"));
                $tempForCopy.val($imgSrc).select();
                document.execCommand("copy");
                $tempForCopy.remove();

                c2cSuccessMsg();
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
                //Handles the copying of either the img tag or the link to the user clipboard. Heavily inspired by this blog post: https://www.isquaretechnologies.com/jquery-click-copy-clipboard/. The name of my function is the ssame as articles as it is the most semanctic name for the function.
                let $tempForCopy = $("<input>").appendTo($("body"));
                $tempForCopy.val($imgTag.html()).select();
                document.execCommand("copy");
                $tempForCopy.remove();

                c2cSuccessMsg();
              });

            //create the expand icon and link
            const $imgDownloadIcon = $(`<a href="${$imgSrc}" target="_blank">`)
              .html(`<ion-icon name="expand-outline"></ion-icon>`)
              .appendTo($imgOptions);
          }
        }
        //resets the search input value
        $("input").val("");
      },
      (error) => {
        spellCheck();
      }
    );
  };

  //Displays "copid to clipboard" message
  const c2cSuccessMsg = () => {
    let $c2cSuccess = $("<div>")
      .addClass("c2c-success")
      .text("Copied to clipboard!")
      .appendTo($(".images-container"));

    setTimeout(() => {
      $c2cSuccess.hide();
    }, 800);
  };

  //Provides error message when no images math user query, typically the result of spelling error
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

  //Dynamically resizes page elements in realtime whenever the window changes size.
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

  //invokes the resize Elems fucntion
  $(window).resize(resizeElems);

  //event listener for search input submissions
  $("form").on("submit", (e) => {
    getImages();
    e.preventDefault();
  });

  //end before
});
