$(() => {
  let counter = 0;

  //carousel event handler
  const carouselNext = (e) => {
    let $indexMax = $(".image-container").length - 1;
    $(".image-container").eq(counter).css("display", "none");
    if (counter < $indexMax) {
      counter++;
    } else {
      counter = 0;
    }
    $(".image-container").eq(counter).css("display", "block");
  };

  const carouselPrev = () => {
    let $indexMax = $(".image-container").length - 1;
    $(".image-container").eq(counter).css("display", "none");

    if (counter > 0) {
      counter--;
    } else {
      counter = $indexMax;
    }
    $(".image-container").eq(counter).css("display", "block");
  };

  //event listeners
  $("#next-btn").on("click", carouselNext);
  $("#prev-btn").on("click", carouselPrev);
});
