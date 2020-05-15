$(() => {
  let counter = 0;

  //carousel event handler
  const carouselNext = (e) => {
    $(".image-container").eq(counter).css("display", "none");
    if (counter < $(".image-container").length - 1) {
      counter++;
    } else {
      counter = 0;
    }
    $(".image-container").eq(counter).css("display", "block");
  };

  //event listeners
  $("#next-btn").on("click", carouselNext);
  $("#prev-btn").on("click", carouselPrev);
});
