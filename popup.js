document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['ratings'], function (result) {
        const ratings = result.ratings || {};
        SetStarForWebsite();
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const url = tabs[0].url;
            const domain = url.match(/^https?:\/\/(?:www\.)?([^\/?#]+)/i)[1];
            document.getElementById("website_name").textContent = domain;

            const avg = calcAvg(ratings);
            document.getElementById("user_avg_rating").textContent = avg.toFixed(2);

            const ratingSummary = calcRatings(ratings);
            setRating(ratingSummary);
            setBar(ratingSummary, Object.entries(ratings).length);
        });
    });

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
            ratingDisplay.textContent = `Rate: ${selectedRating} Stars`;
            saveRating(selectedRating);
        });
    });

    function highlightStars(rating) {
        stars.forEach(star => {
            const value = parseInt(star.getAttribute('data-value'), 10);
            if (value <= rating) {
                star.classList.add('filled');
            } else {
                star.classList.remove('filled');
            }
        });
    }

    function saveRating(rating) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const url = tabs[0].url;
            const domain = url.match(/^https?:\/\/(?:www\.)?([^\/?#]+)/i)[1];

            chrome.storage.sync.get(['ratings'], function (result) {
                let ratings = result.ratings || {};
                ratings[domain] = parseInt(rating, 10);
                chrome.storage.sync.set({ 'ratings': ratings }, function () {
                    console.log(`Bewertung für ${domain} gespeichert: ${rating} Sterne`);
                });
            });
        });
    }


    function calcAvg(ratings) {
        if (!ratings || Object.keys(ratings).length === 0) {
            return 0;
        }
        let completeRating = 0;
        for (const value of Object.values(ratings)) {
            completeRating += value;
        }
        return completeRating / Object.keys(ratings).length;
    }


    function calcRatings(ratings) {
        let dic = { "star1": 0, "star2": 0, "star3": 0, "star4": 0, "star5": 0 };
        for (const value of Object.values(ratings)) {
            const key = `star${value}`;
            if (dic[key] !== undefined) {
                dic[key]++;
            }
        }
        return dic;
    }

    function setRating(ratingDic) {
        for (let i = 1; i <= 5; i++) {
            const key = `star${i}`;
            const ratingElem = document.getElementById(`${i}Star_rating`);
            if (ratingElem) {
                ratingElem.textContent = ratingDic[key];
            }
        }
    }

    function setBar(ratingDic, numberOfRatings) {
        for (let i = 1; i <= 5; i++) {
            const key = `star${i}`;
            const widthB = ratingDic[key]
            if (widthB == 0) {
                const bar = document.getElementById(`bar-star${i}`);
                if (bar) {
                    bar.style.width = `$0%`;
                }
            } else {
                const width = (widthB / numberOfRatings) * 100;
                const bar = document.getElementById(`bar-star${i}`);

                if (bar) {
                    bar.style.width = `${width}%`;
                }
            }

        }
    }


    function SetStarForWebsite() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const url = tabs[0].url;
            const domain = url.match(/^https?:\/\/(?:www\.)?([^\/?#]+)/i)[1];

            chrome.storage.sync.get(['ratings'], function (result) {
                const ratings = result.ratings || {};
                const domainRating = ratings[domain] || 0;

                const container = document.getElementById("website_rating");

                for (let i = 0; i < domainRating; i++) {
                    container.innerHTML += '<span class="fa fa-star checked"></span>';
                }

                for (let i = 0; i < 5 - domainRating; i++) {
                    container.innerHTML += '<span class="fa fa-star"></span>';
                }
            });
        });
    }

});
