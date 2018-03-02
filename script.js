$(() => {
  $("#wordNumber").keyup((e) => {
    if (e.keyCode === 13) {
      $("#generate").click();
    }
  });
  $("#generate").click(() => {
    let wordNumber = parseInt($("#wordNumber").val());
    if (isNaN(wordNumber) || wordNumber < 1) {
      $("#wordNumber").addClass("is-invalid");
      $("#invalid").show();
      $("#generatedPassword").html("");
      $("#estimatedYears").html("");
    } else {
      $("#wordNumber").removeClass("is-invalid");
      $("#invalid").hide();
      let password = [];
      for (let i = 0; i < wordNumber; i++) {
        password.push(words[Math.floor(words.length * Math.random())]);
      }
      let combinations = Math.pow(words.length, wordNumber);
      let billionAttemptsYears = parseFloat((combinations / 6.3072E16).toPrecision(2)) > 100000 ? (combinations / 6.3072E16).toPrecision(2) : parseFloat((combinations / 6.3072E16).toPrecision(2));
      let millionAttemptsYears = parseFloat((combinations / 6.3072E13).toPrecision(2)) > 100000 ? (combinations / 6.3072E13).toPrecision(2) : parseFloat((combinations / 6.3072E13).toPrecision(2));
      let thousandAttemptsYears = parseFloat((combinations / 6.3072E10).toPrecision(2)) > 100000 ? (combinations / 6.3072E10).toPrecision(2) : parseFloat((combinations / 6.3072E10).toPrecision(2));
      $("#generatedPassword").html(password.join(" "));
      if (combinations >= Math.pow(2, 60)) {
        $("#generatedPassword").addClass("text-success");
        $("#generatedPassword").removeClass("text-warning");
        $("#generatedPassword").removeClass("text-danger");
        $("#estimatedYears").html(`Strong.
          <ul>
            <li>Assuming a billion attempts per second and knowledge of the generating method, your password will take approximately ${billionAttemptsYears} years to crack.</li>
            <li>Assuming a million attempts per second and knowledge of the generating method, your password will take approximately ${millionAttemptsYears} years to crack.</li>
            <li>Assuming a thousand attempts per second and knowledge of the generating method, your password will take approximately ${thousandAttemptsYears} years to crack.</li>
          </ul>
          `);
      } else if (combinations >= Math.pow(2, 40)) {
        $("#generatedPassword").removeClass("text-success");
        $("#generatedPassword").addClass("text-warning");
        $("#generatedPassword").removeClass("text-danger");
        $("#estimatedYears").html(`Reasonable.
          <ul>
            <li>Assuming a billion attempts per second and knowledge of the generating method, your password will take approximately ${billionAttemptsYears} years to crack.</li>
            <li>Assuming a million attempts per second and knowledge of the generating method, your password will take approximately ${millionAttemptsYears} years to crack.</li>
            <li>Assuming a thousand attempts per second and knowledge of the generating method, your password will take approximately ${thousandAttemptsYears} years to crack.</li>
          </ul>
          `);
      } else {
        $("#generatedPassword").removeClass("text-success");
        $("#generatedPassword").removeClass("text-warning");
        $("#generatedPassword").addClass("text-danger");
        $("#estimatedYears").html(`Weak.
          <ul>
            <li>Assuming a billion attempts per second and knowledge of the generating method, your password will take approximately ${billionAttemptsYears} years to crack.</li>
            <li>Assuming a million attempts per second and knowledge of the generating method, your password will take approximately ${millionAttemptsYears} years to crack.</li>
            <li>Assuming a thousand attempts per second and knowledge of the generating method, your password will take approximately ${thousandAttemptsYears} years to crack.</li>
          </ul>
          `);
      }
    }
  });
});
