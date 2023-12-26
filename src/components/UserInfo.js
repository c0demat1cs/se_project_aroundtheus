export class UserInfo {
  // pass in selector's as arguments
  constructor(profileTitleSelector, profileDescriptionSelector) {
    // use query selector to get elements and assign to this
    this._profileTitleElement = document.querySelector(profileTitleSelector);
    this._profileDescriptionElement = document.querySelector(
      profileDescriptionSelector
    );
  }

  getUserInfo() {
    // return object containing the text content of the profile elements
    return {
      title: this._profileTitleElement.textContent,
      description: this._profileDescriptionElement.textContent,
    };
  }

  // pass in the values from the form submission
  setUserInfo(title, description) {
    this._profileTitleElement.textContent = title;
    this._profileDescriptionElement.textContent = description;
    // similarly for the other element
  }
}

export default UserInfo;
