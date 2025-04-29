
# Website Rating Chrome Extension

This Chrome extension allows users to rate websites and view ratings from other users. It provides an easy-to-use interface to give a rating from 1 to 5 stars and shows the average rating for the current website. Additionally, it displays visual bars representing the ratings for each star category, giving a clear overview of how a website is rated.

## Features

- **Rate websites**: Easily give a rating from 1 to 5 stars to any website.
- **View average rating**: See the average rating for the website.
- **Interactive star rating**: Hover over and click stars to rate a website.
- **Rating visualization**: View the distribution of ratings using progress bars for each star category.
- **Persistent data**: Ratings are saved and persisted using `chrome.storage.sync`, so your ratings will be available across sessions.

## Installation

1. Clone or download the repository:
   ```bash
   git clone https://github.com/zahntheo/website-rating-extension.git
   ```

2. Go to `chrome://extensions/` in your Chrome browser.

3. Enable **Developer mode** by toggling the switch in the top right corner.

4. Click on the **Load unpacked** button.

5. Select the folder where you cloned or downloaded the repository.

6. The extension will now be installed and ready to use!

## Usage

- Once installed, click the extension icon to open the popup.
- You will see the current website's rating displayed with an option to rate it.
- Use the star system to rate the website.
- The average rating and the breakdown of ratings will be updated dynamically.

## How It Works

1. **Rating System**: The extension uses a 5-star rating system. You can rate the current website with a value between 1 and 5.
   
2. **Saving Ratings**: When you rate a website, the rating is saved in `chrome.storage.sync` under the website's domain. This ensures that the data is persistent and synced across sessions.

3. **Displaying Ratings**: The extension will show the average rating and the distribution of ratings across the 5-star scale, visually represented by colored progress bars.

## Contributing

If you'd like to contribute to the project, feel free to open an issue or submit a pull request. Here are a few ways you can help:

- Report bugs or suggest features.
- Improve the user interface and design.
- Add more functionality (e.g., sorting ratings, filtering by date).

### How to contribute

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, feel free to contact me at [theozahn2021@gmail.com].

