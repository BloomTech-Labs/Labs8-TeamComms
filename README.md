# Team Communicator [![Build Status](https://travis-ci.com/Lambda-School-Labs/Labs8-TeamComms.svg?branch=master)](https://travis-ci.com/Lambda-School-Labs/Labs8-TeamComms) <a href="https://david-dm.org/Lambda-School-Labs/Labs8-TeamComms.svg">

Click <a href="https://team-comm.netlify.com">here</a> to visit the app.

<img src="https://i.imgur.com/OaSnajI.png" title="Team Communicator" width="100%">

# Table of Contents

- [Team Communicator]()
  - [A web app that helps distributed or remote teams communicate questions and stay in sync.]()
    - [PROBLEM:]()
    - [SOLUTION:]()
  - [Dependencies]()
  - [Installation]()
  - [Usage]()
    - [IMPORTANT: You will need to make a .env file in the base repo directory with your own environment variables setup...here are the current environment variables you will need to generate:]()
    - [yarn start]()
    - [yarn test]()
    - [yarn build]()
    - [node server.js]()
  - [User API Documenation]()
    - [Register User]()
      - [Success Response]()
      - [Error Response]()
    - [Login User]()
      - [Success Response]()
      - [Error Response]()
    - [Update User]()
      - [Success Response]()
      - [Error Response]()
    - [Delete/Inactivate User]()
  - [Zoom API]()
    - [Zoom api from Postman]()
    - [Create meeting schema]()
    - [Create zoom jwt token online <a href="https://jwt.io/" rel="nofollow">https://jwt.io/</a>](https://jwt.io/)
    - [zoom enterprise accounts breakdown]()
    - [API Intro]()
    - [Webhooks]()
    - [Developer site]()
    - [Zoom Sample App]()
  - [How to test the software]()
  - [Known issues]()
  - [Getting involved]()
- [Contributing to Team Communicator]()
  - [Bug reports]()
  - [Feature requests]()
  - [Pull requests]()
- [Collaborating guidelines]()

# Team Communicator

## A web app that helps distributed or remote teams communicate questions and stay in sync.

### PROBLEM:

Educational content is lost from zoom during remote calls that could be saved and reused. What if we could transcribe and save all student/attendee questions during online lectures/brown bags?

### SOLUTION:

Our goal is to create an app that works in sync with Zoom calls to fix an internal problem at Lambda School - Content is lost from Zoom calls that could be saved and reused from each cohort. What if we could transcribe and save all student questions during lecture and brown bags? Our goal is to give back to Lambda with our labs project by creating an app that takes content creation to a whole new level. Questions are no longer lost during lecture - each question is timestamped (when answered) for transcription. Instructors can choose to answer or punt questions. The major feature of our app is recording and pushing zoom calls directly to Youtube, transcribing the calls and pushing transcribed information to a GitHub Wiki page (in this case, it would be a test repo until permissions were granted to update the Lambda School wiki). This allows every lambda lecture to be searchable based on transcription results, editable by students and open source for all cohorts to come.

---

**Technology stack**:
MongodB
Express
React
NodeJS

**Status**: Initial build in progress.

**Links to production or demo instances**:
Server - https://teamcomm2.herokuapp.com
Client - https://team-comm.netlify.com/

**Screenshots**:

## Dependencies

**Front-End**
Styled-Components
Redux
React-Redux
Redux-Thunk
ESLint
React-Router-DOM
Prettier
Exact-Prettier

**Back-End**
CORS
Mongoose
SendGrid
Socket.io

## Installation

1. Make sure that you have Node.js v10.13.0 installed.

2. Clone this repo using `git clone https://github.com/Lambda-School-Labs/Labs8-TeamComms.git`
3. Move to the front-end directory: cd Labs8-TeamComms
4. Run `yarn install` to install front-end dependencies.
5. Move to the server directory: cd server
6. Run `yarn install` to install server dependencies.

## Usage

### IMPORTANT: You will need to make a .env file in the base repo directory with your own environment variables setup...here are the current environment variables you will need to generate:

```
SECRET_KEY="your secret key"
SKIP_PREFLIGHT_CHECK=true
MONGOLAB_URL="mongodb://your hosted mongodb url"
CLIENT_ID="google client id"
CLIENT_SECRET="google client secret"
STRIPE_PLAN_ID=stripeplanid
STRIPE_SECRET_KEY=stripesecretkey
ZOOM_KEY = "zoomkey"
ZOOM_SECRET = "zoomsecret"
SENDGRID_KEY = "sendgridkey"
```

In the **base project** directory, you can run:

### `yarn start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

In the **server** directory, you can run:

### `node server.js`

Runs the server in development mode.

Open [http://localhost:3300](http://localhost:3300) to view it in the browser.

---

## User API Documenation

### Register User

Register a User if the username does not already exist. Usernames must be unique.

_URL_ : `https://teamcomm2.herokuapp.com/api/users/register`

_Method_ : `POST`

_Data example_ All fields must be sent.

```json
{
    *Required
    "username": "jerry",
    "password": "password123",
    "phone_number": 1234567890,
    "email": "testemail@email.com",
    *Optional
    "organization": "Organization LLC",
    "premium": false
}
```

#### Success Response

_Condition_ : If everything is OK and a User didn't exist.

_Code_ : 200

_Content example_ 👍

```
{
    "token": 123aBc456DfG123aBc456DfG123aBc456DfG123aBc456DfG123aBc456DfG,
    "user": {
        "username": "jerry",
        "email": "testemail@email.com",
        "phone_number": 1234567890,
        "organization": "Organization LLC",
        "premium": false,
        "is_active": true
}
```

#### Error Response

_Condition_ : If fields are missed.

_Code_ : 400 BAD REQUEST

---

### Login User

Login a User and returns a token for User.

_URL_ : `https://teamcomm2.herokuapp.com/api/users/login`

_Method_ : `POST`

_Data example_ All fields must be sent.

```json
{
  "username": "jerry",
  "password": "password123"
}
```

#### Success Response

_Condition_ : If everything is OK and a User didn't exist.

_Code_ : 200

_Content example_ 👍

```
{
    "token": 123aBc456DfG123aBc456DfG123aBc456DfG123aBc456DfG123aBc456DfG,
    "user": {
        "username": "jerry",
        "email": "testemail@email.com",
        "phone_number": 1234567890,
        "organization": "Organization LLC",
        "premium": false,
        "is_active": true
}
```

#### Error Response

_Condition_ : If 'username' and 'password' combination is wrong.

_Code_ : 401

---

### Update User

Update a User if a User is logged in and authenticated with token.

_URL_ : `https://teamcomm2.herokuapp.com/api/users/edit`

_Method_ : `PUT`

_Data example_ All fields are optional.

```json
{
  "username": "jerry",
  "password": "password123",
  "phone_number": 1234567890,
  "email": "testemail@email.com",
  "organization": "Organization LLC",
  "is_active": true
}
```

_Header_ : Pass token in header with a key of "auth"

#### Success Response

_Condition_ : If user is authenticated and everything is updated successfully.

_Code_ : 200

_Content example_ 👍

```
{
    "user": {
        "username": "jerry",
        "email": "testemail@email.com",
        "phone_number": 1234567890,
        "organization": "Organization LLC",
        "premium": false,
        "is_active": true
}
```

#### Error Response

_Condition_ : If error updating or authenticating User.

_Code_ : 401

---

### Delete/Inactivate User

To delete a User, use the above `Edit User` endpoint and change `active: false`.

---

## Zoom API

### Zoom api from Postman

https://medium.com/zoom-developer-blog/using-zoom-apis-version-2-with-postman-3fba79dcdf2e

### Create meeting schema

https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate

### Create zoom jwt token online https://jwt.io/

![Alt text](.\public\images\createZoomJwtOnline.png)

### zoom enterprise accounts breakdown

https://developer.zoom.us/blog/a-brief-look-at-zoom-account-structures/

### API Intro

https://zoom.github.io/api/?shell#introduction

### Webhooks

https://developer.zoom.us/docs/webhooks/

### Developer site

https://developer.zoom.us/

### Zoom Sample App

https://github.com/zoom/data-visualization-sample-app

---

## How to test the software

## Known issues

Please see the open issues in our issue tracker. If you have questions, concerns, bug reports, etc, please file an issue.
[Our Issue Tracker](https://github.com/Lambda-School-Labs/Labs8-TeamComms/issues)

## Getting involved

# Contributing to Team Communicator

Love Team Communicator and want to help? Thanks so much, there's something to do for everybody!

Please take a moment to review this document in order to make the contribution process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue or assessing patches and features.

## Bug reports

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful - thank you!

Guidelines for bug reports:

1.  **Use the GitHub issue search** &mdash; check if the issue has already been reported.

2.  **Check if the issue has been fixed** &mdash; try to reproduce it using the latest `master` or development branch in the repository.

3.  **Isolate the problem** &mdash; ideally create a [reduced test case](https://css-tricks.com/reduced-test-cases/) and a live example.

A good bug report shouldn't leave others needing to chase you up for more information. Please try to be as detailed as possible in your report. What is your environment? What steps will reproduce the issue? What browser(s) and OS
experience the problem? What would you expect to be the outcome? All these details will help people to fix any potential bugs.

Example:

> Short and descriptive example bug report title
>
> A summary of the issue and the browser/OS environment in which it occurs. If
> suitable, include the steps required to reproduce the bug.
>
> 1.  This is the first step
> 2.  This is the second step
> 3.  Further steps, etc.
>
> `<url>` - a link to the reduced test case
>
> Any other information you want to share that is relevant to the issue being
> reported. This might include the lines of code that you have identified as
> causing the bug, and potential solutions (and your opinions on their
> merits).

<a name="features"></a>

## Feature requests

Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and aims of the project. It's up to _you_ to make a strong case to convince the project's developers of the merits of this feature. Please provide as much detail and context as possible.

<a name="pull-requests"></a>

## Pull requests

Good pull requests - patches, improvements, new features - are a fantastic
help. They should remain focused in scope and avoid containing unrelated
commits.

**Please ask first** before embarking on any significant pull request (e.g.
implementing features, refactoring code, porting to a different language),
otherwise you risk spending a lot of time working on something that the
project's developers might not want to merge into the project.

Please adhere to the coding conventions used throughout a project (indentation,
accurate comments, etc.) and any other requirements (such as test coverage).

Since the `master` branch is what people actually use in production, we have a
`dev` branch that unstable changes get merged into first. Only when we
consider that stable we merge it into the `master` branch and release the
changes for real.

Adhering to the following process is the best way to get your work
included in the project:

1.  [Fork](https://help.github.com/articles/fork-a-repo/) the project, clone your fork, and configure the remotes:

    ```bash
    # Clone your fork of the repo into the current directory
    git clone https://github.com/<your-username>/Labs8-TeamComms.git
    # Navigate to the newly cloned directory
    cd Labs8-TeamComms
    # Assign the original repo to a remote called "upstream"
    git remote add upstream https://github.com/<your-username>/Labs8-TeamComms.git
    ```

2.  If you cloned a while ago, get the latest changes from upstream:

    ```bash
    git checkout dev
    git pull upstream dev
    ```

3.  Create a new topic branch (off the `dev` branch) to contain your feature, change, or fix:

    ```bash
    git checkout -b <topic-branch-name>
    ```

4.  Commit your changes in logical chunks. Please adhere to these [git commit message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) or your code is unlikely be merged into the main project. Use Git's [interactive rebase](https://help.github.com/articles/about-git-rebase/) feature to tidy up your commits before making them public.

5.  Locally merge (or rebase) the upstream dev branch into your topic branch:

    ```bash
    git pull [--rebase] upstream dev
    ```

6.  Push your topic branch up to your fork:

    ```bash
    git push origin <topic-branch-name>
    ```

7.  [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description.

**IMPORTANT**: By submitting a patch, you agree to allow the project
owners to license your work under the terms of the [MIT License](https://github.com/Lambda-School-Labs/Labs8-TeamComms/blob/master/LICENSE.md).

# Collaborating guidelines

There are few basic rules to ensure high quality of the repo:

- Before merging, a PR requires at least two approvals from the collaborators unless it's an architectural change, a large feature, etc. If it is, then at least 50% of the core team have to agree to merge it, with every team member having a full veto right. (i.e. every single one can block any PR)
- A PR should remain open for at least two days before merging (does not apply for trivial contributions like fixing a typo). This way everyone has enough time to look into it.

You are always welcome to discuss and propose improvements to this guideline.
