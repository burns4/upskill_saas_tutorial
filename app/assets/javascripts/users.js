/* global $, Stripe */
//Document ready.
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
 var sumbmitBtn  = $('#form-submit-btn');

  //Set our Stripe public key.
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
   
    //When user clicks form submit btn,
   submitBn.click(function(event){
   
   });
    //prevent the default submission behavior.
      event.preventDefault();
          
          // Collect the credit card fields
         var ccNum = $('#card_number').val(),
             cvcNumb= $('#card_code').val(),
             expMonth = $('#card_month').val(),
             expYear = $('#card_year').val();
         
          //Send the card info to stripe.fields
          Stripe.createToken({
            number: ccNum,
            cvc: cvcNum,
            exp_month: expMonth,
            exp_year = expYear
          }, stripeResponseHandler);
});
    
    

    //Stripe will return the card token
    //Inject card token as hidden field into form.
    //Submit form to our Rails app.
    });