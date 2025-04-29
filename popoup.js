document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['ratings'], function (result) {
      const ratings = result.ratings || {}; 
      // set website name
      const rawUrl = window.location.href
      const domain = rawUrl.match(/^https?:\/\/(?:www\.)?([^\/?#]+)/i)[1]; 
      document.getElementById("website_name").textContent =  domain.toString
    
      // set avg
      const avg = calcaAvg(ratings) 
      document.getElementById("user_avg_rating").textContent =  avg.toString

    });
    

    function calcaAvg(ratings){
        complete_rating = 0;
        for (const [domain, rating] of Object.entries(ratings)){
            complete_rating += rating;
        }
        return complete_rating / Object.entries(ratings).length
    }

    

  });
  