function LoginRequiredError(message) {
  this.name = 'LoginRequiredError';
  this.message = (message || '');
}

LoginRequiredError.prototype = Error.prototype;

function ValidateError(message) {
  this.name = 'ValidateError';
  this.message = (message || '');
}

ValidateError.prototype = Error.prototype;

module.exports.LoginRequiredError = LoginRequiredError;
module.exports.ValidateError = ValidateError;
