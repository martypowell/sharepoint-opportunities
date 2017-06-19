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
  var removeSpecialCharacters = function($input) {
    var textInput = $input.val();
    var pattern = new RegExp("[" + specialCharacters.join("") + "]", "g");

    $input.val(textInput.replace(pattern, ""));
  };
  $(document).on('paste', '[fd_name="FileLeafRef"]', function(e) {
    setTimeout(function() {
      $(e.currentTarget).find('input').trigger('keyup');  
    }, 250);
  });
  $(document).on('keyup', '[fd_name="FileLeafRef"]', function(e) {
    var $input = $(e.currentTarget).find('input[type="text"]');
    var isValid = isNameValid($input);
    
    if (!isValid) {
      removeSpecialCharacters($input);
      alert('Special Characters are not allowed in this field' + "\n\n The following characters are not permitted: \n\n" + specialCharacters.join(" ").replace(/\\/g, '') + " \\");
    }
  });
})(jQuery);