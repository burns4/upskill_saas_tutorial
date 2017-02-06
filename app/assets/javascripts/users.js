/* global $, Stripe */
//Document ready.
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
 var sumbmitBtn  = $('#form-submit-btn');

  //Set our Stripe public key.
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
    //When user clicks form submit btn,
   submitBn.click(function(event){
   

    //prevent the default submission behavior.
      event.preventDefault();
      submitBn.val("Processing").prop('disabled', true);
          
          // Collect the credit card fields
         var ccNum = $('#card_number').val(),
             cvcNumb= $('#card_code').val(),
             expMonth = $('#card_month').val(),
             expYear = $('#card_year').val();
             
             // Use stripe JS library to check for card errors.
             var error = false;
             
             
             // Validate card number.
             if(!Stripe.card.validateCardNumber(ccNum)) {
               error = true;
               alert('The credit card number appears to be invalid');
             }
             
             // Validate CVC number.
             if(!Stripe.card.validateCVC(cvcNum)) {
               error = true;
               alert('The CVC number appears to be invalid');
             }
             
             // Validate expiration  number.
             if(!Stripe.card.validateExpiry(expMonth, expYear)) {
               error = true;
               alert('The expiration date seems to be invalid');
             }
             
             
             
             
             if (error) {
             // If there are card errors, don't send to Stripe
             submitBn.prop('disabled', false).val("Sign Up")
             } else {
                 //Send the card info to stripe fields
                  Stripe.createToken({
                    number: ccNum,
                    cvc: cvcNum,
                    exp_month: expMonth,
                    exp_year = expYear
                  }, stripeResponseHandler);
             }
             
             
             
      
          
          return false;
});
    
        //Stripe will return the card token
        function stripeResponseHandler(status, response) {
        // get token from response
        var token =  response.id;
        
          
          // Inject the card token in a hidden field
          theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
          //Submit form to our Rails app.
          theForm.get(0)submit();

        }
    });