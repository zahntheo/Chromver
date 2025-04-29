document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['ratings'], function (result) {
        const ratings = result.ratings || {};
        // set website name
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const url = tabs[0].url;
            const domain = url.match(/^https?:\/\/(?:www\.)?([^\/?#]+)/i)[1];
            document.getElementById("website_name").textContent = domain;
        
            chrome.storage.sync.get(['ratings'], function (result) {
                const ratings = result.ratings || {};
                const avg = calcAvg(ratings);
                document.getElementById("user_avg_rating").textContent = avg.toFixed(2);
        
                const ratingSummary = calcRatings(ratings);
                setRating(ratingSummary);
                setBar(ratingSummary, Object.entries(ratings).length);
            });
        });
        
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

        if (completeRating = 0){
            return 0
        }
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

   
    const stars = document.querySelectorAll('.star');
    const ratingDisplay = document.getElementById('selected-rating');
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const value = star.getAttribute('data-value');
            highlightStars(value);
        });

        star.addEventListener('mouseout', () => {
            highlightStars(selectedRating);
        });

        star.addEventListener('click', () => {
            selectedRating = star.getAttribute('data-value');
            ratingDisplay.textContent = `Bewertung: ${selectedRating} Sterne`;
        });
    });

    function highlightStars(rating) {
        stars.forEach(star => {
            const value = star.getAttribute('data-value');
            if (value <= rating) {
                star.classList.add('filled');
            } else {
                star.classList.remove('filled');
            }
        });
    }

});
