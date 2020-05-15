$(() => {
  //start after
  //lets call the pexels api

  const key = "563492ad6f9170000100000127c6c722c0654acb97540fefc7b78d86";

  $.ajax({
    method: "GET",
    beforeSend: function (auth) {
      auth.setRequestHeader("Authorization", key);
    },
    url: `https://api.pexels.com/v1/search?query=tiger&per_page=5&page=1`,
  }).then(
    (data) => {
      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );

  //end before
});
