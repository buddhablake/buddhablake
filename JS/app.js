$(() => {
  //start after
  //lets call the pexels api
  let $height = $(window).innerHeight();
  console.log($height);
  $("header").css("height", `${$height}px`);

  const getImages = (e) => {
    $(".spell-check").remove();
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
          .animate({ height: $height * 0.2 }, 200)
          .attr("id", "small");

        if (images.photos.length <= 0) {
          spellCheck();
        } else {
          for (let i = 0; i < 30; i++) {
            $(".images-container")
              .css("height", $height * 0.7)
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
              .css("height", $height * 0.7)
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

  const spellCheck = () => {
    const $spellCheckMsg = $("<div>")
      .addClass("spell-check")
      .html(
        `<h1>"${$(
          "input"
        ).val()}"</h1> <h2>didn't return any results. Check your spelling and try again.</h2>`
      )
      .appendTo($("body"));

    const $spellCheckImg = $("<img>")
      .attr("src", "images/ask-blackboard-chalk-board-chalkboard-356079.jpg")
      .appendTo($spellCheckMsg);
  };

  const resizeElems = () => {
    $height = $(window).innerHeight();
    setTimeout(() => {
      if ($("header").attr("id") === "small") {
        $("header").css("height", $height * 0.2);

        $(".images-container").css("height", $height * 0.7);

        $(".image-container").css("height", $height * 0.7);

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
