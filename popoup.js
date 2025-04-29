document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['ratings'], function (result) {
      const ratings = result.ratings || {};
      const avg = calcaAvg(ratings) 
      // set website name
      const url = window.location.href
      
      document.getElementById("website_name").textContent = 
    });
    

    function calcaAvg(ratings){
        complete_rating = 0;
        for (const [domain, rating] of Object.entries(ratings)){
            complete_rating += rating;
        }
        return complete_rating / Object.entries(ratings).length
    }

    

  });
  