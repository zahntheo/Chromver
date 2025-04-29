document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['ratings'], function (result) {
      const ratings = result.ratings || {}; 
      // set website name
      const rawUrl = window.location.href;
      const domain = rawUrl.match(/^https?:\/\/(?:www\.)?([^\/?#]+)/i)[1]; 
      document.getElementById("website_name").textContent =  domain.toString;
    
      // set avg
      const avg = calcaAvg(ratings);
      document.getElementById("user_avg_rating").textContent =  avg.toString;

    });
    
    // this function calculates the avg of all websites
    function calcaAvg(ratings){
        complete_rating = 0;
        for (const rating of Object.entries(ratings)){
            complete_rating += rating;
        };
        return complete_rating / Object.entries(ratings).length;
    }

    // this function extracts all ratings 
    function calcRatings(ratings){
        let dic = {};
        Object.assign(dic, {"star1": 0, "start2": 1, "start3": 2, "start3": 3, "start4": 4, "start5": 5});
        for (const rating of Object.entries(ratings)){
            dic[rating] += 1;
        }
        return dic;
    }

    

  });
  