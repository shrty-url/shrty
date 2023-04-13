[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">
  <a href="https://github.com/shrty-url/shrty">
    <img src="./public/favicon.png" alt="Logo" width="160">
  </a>

<h3 align="center">Shrty - URL Shortener</h3>

  <p align="center">
    Free and Open Source URL Shortener, self-hosted and on the ☁️
    <br />
    <a href="https://docs.shrty.it"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://shrty.it">View Demo</a>
    ·
    <a href="https://github.com/shrty-url/shrty/issues">Report Bug</a>
    ·
    <a href="https://github.com/shrty-url/shrty/issues">Request Feature</a>
  </p>
</div>

- [Features](#features)
- [Analytics](#analytics)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

Shrty is a free and open source URL shortener that allows users to shorten long URLs into short, easy-to-remember links. It's a lightweight and fast application that can be easily deployed on any server or cloud service.

## Features

- Shorten long URLs into short, easy-to-remember links
- Customizable URL aliases for easy recognition
- Track the number of clicks on each shortened URL
- REST API for programmatic access
- Simple and easy-to-use web interface
- Built with modern technologies for high performance and scalability

## Analytics

Shrty provides you with the ability to track the number of clicks on each shortened URL. This feature allows you to analyze the effectiveness of their marketing campaigns, measure traffic to your website, and gain insights into user behavior.

To access the analytics, simply log in to the web interface and navigate to the "Analytics" section. Here, you can view the number of clicks on each shortened URL, as well as a graph of clicks over time. You can also filter the data by date range and URL alias.

Additionally, you can access the analytics data programmatically through the REST API. Simply send a GET request to `/api/analytics` with the URL alias as a parameter. The API will return a JSON object containing the number of clicks and a list of timestamps for each click. This data can be used to build custom dashboards and reports.

With analytics in Shrty, you can gain valuable insights into your audience and optimize your online presence.

## Usage

To use Shrty, simply open the [web interface](https://shrty.it) and paste the long URL you wish to shorten. You can also choose a custom alias for your shortened URL to make it more recognizable.

To access the REST API, send a GET request to `/api/shorten` with the long URL as a parameter. The API will return a JSON object containing the shortened URL and its click count.

## Roadmap

- [ ] User Accounts and registration
- [ ] Fully featured Analytics Dashboard
- [ ] API Access for everyone

See the [open issues](https://github.com/shrty-url/shrty/issues) for a full list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Shrty is released under the MIT License. See the LICENSE file for more information.


[contributors-shield]: https://img.shields.io/github/contributors/shrty-url/shrty.svg?style=for-the-badge
[contributors-url]: https://github.com/shrty-url/shrty/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/shrty-url/shrty.svg?style=for-the-badge
[forks-url]: https://github.com/shrty-url/shrty/network/members
[stars-shield]: https://img.shields.io/github/stars/shrty-url/shrty.svg?style=for-the-badge
[stars-url]: https://github.com/shrty-url/shrty/stargazers
[issues-shield]: https://img.shields.io/github/issues/shrty-url/shrty.svg?style=for-the-badge
[issues-url]: https://github.com/shrty-url/shrty/issues
[license-shield]: https://img.shields.io/github/license/shrty-url/shrty.svg?style=for-the-badge
[license-url]: https://github.com/shrty-url/shrty/blob/master/LICENSE.txt