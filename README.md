<!-- PROJECT LOGO -->
<br />
<p align="center">
  <img src="https://i.ibb.co/NjCg8H8/background111-1.jpg"  alt="Mockup"  width="900">
  <h3 align="center">MySensor App</h3>

  <p align="center">
    An app for connecting to Bluetooth Low Energy devices in React-Native.
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<p align="center">
  <img src="https://i.ibb.co/56MFD6j/background1111.jpg"  alt="Mockup" width="500">
</p>

This app was created to be the base prototype app for a companies BLE sensor device which reads data about your enviornment like air quality, temperature, humidity etc.

This base app is meant to cover the following features:
* `All Things BLE:` scanning, connection, reading and writing aswell as controlling the device bluetooth scanner
* `Background Jobs:` every 15 minutes even when the app is closed
* `Timer Jobs:` a job that can run periodically when the app is open, even if its in the fore-ground or back-ground
* `Local Notifications:` the app has to be able to notify the user
* `Authentication:` the app allows users to create accounts, login with third party vendors and reset passwords via email
* `Cloud Data:` the app can read and write to the cloud via a cloud provider
* `Local Data:` the app can store some data in local storage that persist even if the app is closed
* `A Prototype React-Native UI:` for how the app will look and feel and integrate all the above features

This app is a prototype and many of the UI components are using dummy data at the moment, however the app still has the code and functionality in place for doing all of the above.

### Built With

The following open source packages make this project possible! Check them out for how to use them and to understand how they are used in the project.
* [React-Navigation](https://reactnavigation.org/)
  * This is an incredible package that allows for various types of navigation in a mobile app like stacks, drawers and tab navigation
  * It is super well documented and very customizable
* [React-Native-Background-Fetch](https://www.npmjs.com/package/react-native-background-fetch)
  * This is a great free package from transistorsoftware that allows for you to set up background jobs that can run when an app is closed
* [React-Native-Background-Timer](https://github.com/ocetnik/react-native-background-timer)
  * This package allows for a similar function to traditional setInterval, however it persists even when the app is minimized!
  * `NOTE: this package only works with class functions and cannot access hook useState!`
* [React-Native-BLE-PLX](https://polidea.github.io/react-native-ble-plx/)
  * Extreemly well documented package which handles all BLE aspects including being able to turn on the device bluetooth scanner
  * `NOTE: this package returns alot of cyclic objects so if you try to print them out directly you may get un-expected outputs as console.log cyclic objects can be a bit wonky, as a hack, if you want to print them you can wrap them in a array`
* [React-Native-Push-Notifications](https://www.npmjs.com/package/react-native-push-notification)
  * Very simple and easy to use package that allows for local push notifications
* [React-Native-Firebase](https://rnfirebase.io/)
  * Amazing service from firebase that covers the authentication, cloud and analytical aspect of a mobile application
  * Well documented, very generous free tier for testing/building


<!-- GETTING STARTED -->
## Getting Started

Since this app uses features like bluetooth it is required to use this app on a real device to be able to test all the features.

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/dolivej/MySensor.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<!-- USAGE -->
## Usage/Testing
1. Set Up X-Code or Android Studio for your development OS and target OS
   ```sh
   https://reactnative.dev/docs/environment-setup
   ```
2. Set Up USB Debugging
   ```sh
   https://reactnative.dev/docs/running-on-device
   ```
4. If on Mac Provide Access to Gradlew
   ```sh
   chmod 755 android/gradlew 
   ```
5. Build The Project via USB
   ```sh
   npm run android
   ```
   ```sh
   npm run ios
   ```
5. Set Up Wireless Debugging
   ```sh
   https://reactnative.dev/docs/running-on-device
   ```

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

If you have any features/improvements you want to make, feel free to open a pull request, all contributions are appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

Feel free to use any code from this repo in your own projects.

