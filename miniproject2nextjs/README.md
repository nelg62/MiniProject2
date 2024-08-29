<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/nelg62/MiniProject2">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Mini Project 2 User Management system / CRM</h3>

  <p align="center">
   This is the second project I created as part of my course at the Institute of Data (IOD). After learning the fundamentals of backend development, we were tasked with building an app of our choice that combines our knowledge of both front-end and backend development. For this project, we learned about using Express for the backend and React for the front end. I decided to challenge myself by using Next.js for the front end.

This project is a user management system built using Next.js and Material-UI (MUI) for the front end and Express for the backend. The application allows users to log in, view a dashboard, and manage a list of users with functionalities such as adding, viewing, and editing user details.
<br />
<a href="https://github.com/nelg62/MiniProject2"><strong>Explore the docs »</strong></a>
<br />
<br />
<a href="https://github.com/nelg62/MiniProject2">View Demo</a>
·
<a href="https://github.com/nelg62/MiniProject2/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
·
<a href="https://github.com/nelg62/MiniProject2/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>

  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
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
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<h4>Project Overview</h4>
This project is a basic user management application that utilizes Next.js as the frontend framework and Express.js as the backend. It incorporates features such as user authentication, dynamic routing, modals for adding and editing users, and the use of React Context for managing global state. The application demonstrates fundamental concepts like routing, state management, conditional rendering, and the integration of Material-UI components to build a user-friendly and responsive interface.

<h4>Key Features</h4>
<ul>
<li>View a list of users and detailed user information.</li>
<li>Add, edit, and delete users with confirmation modals.</li>
<li>Basic User authentication and protected routes for dashboard access.</li>

<h4>Project Structure Overview</h4>
<h5>Frontend (Next.js):</h5>
<ul>
<li>Dashboard Pages:
<ul>
<li>
dashboard/layout.jsx and dashboard/page.jsx: Layout and main page components for the dashboard.
</li>
</ul>
</li>
</ul>

<ul>
<li>Login Pages:
<ul>
<li>
login/layout.jsx and login/page.jsx: Layout and main page components for user login.
</li>
</ul>
</li>
</ul>

<ul>
<li>User Management:
<ul>
<li>
users/layout.jsx, users/page.jsx, userstable/layout.jsx, and userstable/page.jsx: Components for user listing and table views.
</li>
</ul>
</li>
</ul>

<ul>
<li>Components:
<ul>
<li>
AddUserForm.jsx, AddUserModal.jsx, Alert.jsx, AppBar.jsx, DeleteConfirmation.jsx, EditUserForm.jsx, LoginPage.jsx, Modal.jsx, UserList.jsx, UserTable.jsx, ViewUserInfoCard.jsx: Various reusable components for user forms, modals, alerts, tables, and more.
</li>
</ul>
</li>
</ul>

<ul>
<li>Context:
<ul>
<li>
UserContext.jsx: Handles state management and context for user data.
</li>
</ul>
</li>
</ul>

<ul>
<li>Themes:
<ul>
<li>
makingStyles.jsx: Defines custom styles for the application.
</li>
</ul>
</li>
</ul>

<h5>Backend (Express.js):</h5>

<ul>
<li>Routes:
<ul>
<li>
userDataController.js and userDataRoutes.js: Define routes and controllers for managing user data.
</li>
</ul>
</li>
</ul>

<ul>
<li>Entry Point:
<ul>
<li>
index.js: Main server entry point.
</li>
</ul>
</li>
</ul>

<ul>
<li>Swagger Documentation:
<ul>
<li>
swagger.json: Contains the Swagger documentation for the API.
</li>
</ul>
</li>
</ul>

<!-- <li>Responsive design to work seamlessly on various devices.</li> -->
</ul>

[![Product Name Screen Shot][product-screenshot]](https://miniproject2glenharding.netlify.app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

FrountEnd

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![MUI][mui-shield]][mui-url]

Backend

- [![Express.js][ExpressJs-shield]][ExpressJs-url]
- [![Swagger][Swagger-shield]][Swagger-url]
- [![Node.js][NodeJs-shield]][NodeJs-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/nelg62/MiniProject2.git
   ```

<h3>BackEnd</h3>

2. Change directory of not already there

   ```sh
     cd miniproject2express
   ```

3. Install NPM packages

   ```sh
      npm install
   ```

4. Run project (Back End)

   ```sh
   npm start
   ```

<h3>FrountEnd</h3>

5. Change directory if not already there

   ```sh
    cd miniproject2nextjs
   ```

6. Install NPM packages

   ```sh
     npm install
   ```

7. Run project (Frount End)
   ```sh
   npm run dev
   ```
8. Browse to project
   ```sh
   http://localhost:3000
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

in progress...

<!-- Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_ -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ X ] Host Frount end in cloud (Netlify)
- [ X ] Host Backend in Cloud (Render)
- [ ] Tidy code and make moble responsive
- [ ] change styling to tailwind from MUI for mor customisability
- [ ] add more features sutch as inventory list and linking items to people
- [ ] add databse to store information
- [ ] add user login to manage and see spesific data depending on who loggs in and access depending on who logs in
- [ ] add companies or groups as an access

See the [open issues](https://github.com/nelg62/MiniProject2/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/nelg62/MiniProject2/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nelg62/MiniProject2" alt="contrib.rocks image" />
</a>

<!-- LICENSE -->

<!-- ## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- CONTACT -->

## Contact

Glen Harding - glen.harding.nz@gmail.com

Project Link: [https://github.com/nelg62/MiniProject2](https://github.com/nelg62/MiniProject2)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- []()
- []()
- []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/nelg62/MiniProject2.svg?style=for-the-badge
[contributors-url]: https://github.com/nelg62/MiniProject2/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/nelg62/MiniProject2.svg?style=for-the-badge
[forks-url]: https://github.com/nelg62/MiniProject2/network/members
[stars-shield]: https://img.shields.io/github/stars/nelg62/MiniProject2.svg?style=for-the-badge
[stars-url]: https://github.com/nelg62/MiniProject2/stargazers
[issues-shield]: https://img.shields.io/github/issues/nelg62/MiniProject2.svg?style=for-the-badge
[issues-url]: https://github.com/nelg62/MiniProject2/issues
[license-shield]: https://img.shields.io/github/license/nelg62/MiniProject2.svg?style=for-the-badge
[license-url]: https://github.com/nelg62/MiniProject2/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/glen-harding-5a1317114
[product-screenshot]: /miniproject2nextjs/public/MiniProject2picture.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[mui-url]: https://mui.com/
[mui-shield]: https://img.shields.io/badge/mui-06B6D4?style=for-the-badge&logo=mui&logoColor=white
[ExpressJs-url]: https://expressjs.com/
[ExpressJs-shield]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Swagger-shield]: https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black
[Swagger-url]: https://swagger.io/
[NodeJs-shield]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[NodeJs-url]: https://nodejs.org/
