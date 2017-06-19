(function($) {
  var specialCharacters = ["'","~","#","%","&","*","{","}","\\" + "\\",":","<",">","?","/","+","|",".",",",'"',"’","\\!","\\@","\\$","\\^","\\(","\\)","\\-","\\_","\\=","\\;","`", "\\" + "[", "\\" + "]"];

  var hasSpecialCharacter = function(str) {
    var pattern = new RegExp("[" + specialCharacters.join("") + "]", 'g');
    return pattern.test(str); 
  };
  var isNameValid = function($input) {
    var name = $input.val();
    return !hasSpecialCharacter(name);
  };
  var onBlur = function(e) {
    var $this = $(e.currentTarget);
    var $input = $this.find('input[type="text"]');
    var isValid = isNameValid($input);
    var $fdControl = $this.closest('.fd_control');

    if (!isValid) {
      removeSpecialCharacters($input);
      $fdControl.append(validationTemplate(validationMessage));
    }
    else {
      $fdControl.find('.custom-validator').remove();
    }
  };
  var removeSpecialCharacters = function($input) {
    var textInput = $input.val();
    var pattern = new RegExp("[" + specialCharacters.join("") + "]", "g");

    $input.val(textInput.replace(pattern, ""));
  };
  var triggerKeyup = function(e) {
    setTimeout(function() {
      $(e.currentTarget).find('input').trigger('keyup');  
    }, 250);
  };
  var validationMessage = "The following characters are not permitted: " + specialCharacters.join(" ").replace(/\\/g, '') + " \\";
  var validationTemplate = function(msg) {
    return [
      '<span class="ms-formvalidation custom-name-validator">',
        '<span role="alert">' + msg + '</span>',
        '<br />',
      '</span>'
    ].join("");
  };

  //$(document).on('paste', '[fd_name="FileLeafRef"]', triggerKeyup);
  $(document).on('blur', '[fd_name="FileLeafRef"]', onBlur);
})(jQuery);