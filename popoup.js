document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['ratings'], function (result) {
        const ratings = result.ratings || {};
        // set website name
        const rawUrl = window.location.href;
        const domain = rawUrl.match(/^https?:\/\/(?:www\.)?([^\/?#]+)/i)[1];
        document.getElementById("website_name").textContent = domain;

        // set avg
        const avg = calcAvg(ratings);
        document.getElementById("user_avg_rating").textContent = avg.toString();

        // set rating graph
        const ratingSummary = calcRatings(ratings);
        setRating(ratingSummary);
        setBar(ratingSummary, Object.entries(ratings).length);


    });

    // this function calculates the avg of all websites
    function calcAvg(ratings) {
        let completeRating = 0;
        for (const [domain, value] of Object.entries(ratings)) {
            completeRating += value;
        };

        return completeRating / Object.entries(ratings).length;
    }

    // this function extracts all ratings 
    function calcRatings(ratings) {
        let dic = {};
        Object.assign(dic, { "star1": 0, "star2": 0, "star3": 0, "star4": 0, "star5": 0 });
        for (const [domain, value] of Object.entries(ratings)) {
            const key = `star${value}`;
            if (dic[key] !== undefined) {
                dic[key]++;
            }
        }
        return dic;
    }

    // set the rating amounts
    function setRating(ratingDic) {
        for (let i = 1; i <= 5; i++) {
            const key = `star${i}`;
            const ratingElem = document.getElementById(`${i}Star_rating`);
            if (ratingElem) {
                ratingElem.textContent = ratingDic[key];
            }
        }
    }

    // set bar width
    function setBar(ratingDic, numberOfRatings) {
        for (let i = 1; i <= 5; i++) {
            const key = `star${i}`;
            const width = (ratingDic[key] / numberOfRatings) * 100;
            const bar = document.getElementById(`bar-star${i}`);
            if (bar) {
                bar.style.width = `${width}%`;
            }
        }
    }




});
