document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['ratings'], function (result) {
      const ratings = result.ratings || {}; 
      // set website name
      const rawUrl = window.location.href;
      const domain = rawUrl.match(/^https?:\/\/(?:www\.)?([^\/?#]+)/i)[1]; 
      document.getElementById("website_name").textContent =  domain.toString();
    
      // set avg
      const avg = calcAvg(ratings);
      document.getElementById("user_avg_rating").textContent =  avg.toString();

      // set ratings
        setRating(calcRatings());
    });
    
    // this function calculates the avg of all websites
    function calcAvg(ratings){
        let complete_rating = 0;
        for (const [domain, value] of Object.entries(ratings)) {
            complete_rating += value;
        };
        
        return complete_rating / Object.entries(ratings).length;
    }

    // this function extracts all ratings 
    function calcRatings(ratings){
        let dic = {};
        Object.assign(dic, {"star1": 0, "start2": 1, "start3": 2, "start4": 3, "start5": 4});
        for (const rating of Object.entries(ratings)){
            dic[rating] += 1;
        }

        return dic;
    }

    // set the rating amounts
    function setRating(ratingDic){
        document.getElementById("1Star_rating").textContent = ratingDic["star1"];
        document.getElementById("2Star_rating").textContent = ratingDic["star2"];
        document.getElementById("3Star_rating").textContent = ratingDic["star3"];
        document.getElementById("4Star_rating").textContent = ratingDic["star4"];
        document.getElementById("5Star_rating").textContent = ratingDic["star5"];
    }

    

  });
  