(function($) {
  var specialCharacters = ["'","~","#","%","&","*","{","}","\\" + "\\",":","<",">","?","/","+","|",".",",",'"',"’","\\!","\\@","\\$","\\^","\\(","\\)","\\-","\\_","\\=","\\;","`", "\\" + "[", "\\" + "]"];
  var validationMessage = "Letters and numbers. Special characters are not allowed.";

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
    var $fdControl = $input.closest('.fd_control');
    var isValidationVisible = $fdControl.find('.custom-validator').length;

    if (!isValid) {
      //removeSpecialCharacters($input);
      if (!isValidationVisible) 
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
  var validationTemplate = function(msg) {
    return [
      '<span class="ms-formvalidation custom-validator">',
        '<span role="alert">' + msg + '</span>',
        '<br />',
      '</span>'
    ].join("");
  };

  $(document).on('blur', '[fd_name="FileLeafRef"]', onBlur);
})(jQuery);