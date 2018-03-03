$(() => {
  $("#dictionaryWords").html(` and contains ${words.length} words`);

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
      let billionAttempts = displayTime(combinations / 2e+9);
      let millionAttempts = displayTime(combinations / 2e+6);
      let thousandAttempts = displayTime(combinations / 2000);
      $("#generatedPassword").html(password.join(" "));
      if (combinations >= Math.pow(2, 100)) {
        $("#generatedPassword").addClass("text-success");
        $("#generatedPassword").removeClass("text-warning");
        $("#generatedPassword").removeClass("text-danger");
        $("#estimatedYears").html(`Overkill.
          <ul>
            <li>Assuming a billion attempts per second and knowledge of the generating method, your password will take ${billionAttempts} to crack.</li>
            <li>Assuming a million attempts per second and knowledge of the generating method, your password will take ${millionAttempts} to crack.</li>
            <li>Assuming a thousand attempts per second and knowledge of the generating method, your password will take ${thousandAttempts} to crack.</li>
          </ul>
          `);
      } else if (combinations >= Math.pow(2, 60)) {
        $("#generatedPassword").addClass("text-success");
        $("#generatedPassword").removeClass("text-warning");
        $("#generatedPassword").removeClass("text-danger");
        $("#estimatedYears").html(`Strong.
          <ul>
            <li>Assuming a billion attempts per second and knowledge of the generating method, your password will take ${billionAttempts} to crack.</li>
            <li>Assuming a million attempts per second and knowledge of the generating method, your password will take ${millionAttempts} to crack.</li>
            <li>Assuming a thousand attempts per second and knowledge of the generating method, your password will take ${thousandAttempts} to crack.</li>
          </ul>
          `);
      } else if (combinations >= Math.pow(2, 40)) {
        $("#generatedPassword").removeClass("text-success");
        $("#generatedPassword").addClass("text-warning");
        $("#generatedPassword").removeClass("text-danger");
        $("#estimatedYears").html(`Reasonable.
          <ul>
            <li>Assuming a billion attempts per second and knowledge of the generating method, your password will take ${billionAttempts} to crack.</li>
            <li>Assuming a million attempts per second and knowledge of the generating method, your password will take ${millionAttempts} to crack.</li>
            <li>Assuming a thousand attempts per second and knowledge of the generating method, your password will take ${thousandAttempts} to crack.</li>
          </ul>
          `);
      } else {
        $("#generatedPassword").removeClass("text-success");
        $("#generatedPassword").removeClass("text-warning");
        $("#generatedPassword").addClass("text-danger");
        $("#estimatedYears").html(`Weak.
          <ul>
            <li>Assuming a billion attempts per second and knowledge of the generating method, your password will take ${billionAttempts} to crack.</li>
            <li>Assuming a million attempts per second and knowledge of the generating method, your password will take ${millionAttempts} to crack.</li>
            <li>Assuming a thousand attempts per second and knowledge of the generating method, your password will take ${thousandAttempts} to crack.</li>
          </ul>
          `);
      }
    }
  });

  function displayTime(seconds) {
    if (seconds < 1) {
      return "less than a second"
    } else if (Math.round(seconds) < 60) {
      let s = Math.round(seconds);
      return `${s} second${s === 1 ? "" : "s"}`;
    } else if (Math.round(seconds / 60) < 60) {
      let s = Math.round(seconds / 60);
      return `${s} minute${s === 1 ? "" : "s"}`;
    } else if (Math.round(seconds / 3600) < 24) {
      let s = Math.round(seconds / 3600);
      return `${s} hour${s === 1 ? "" : "s"}`;
    } else if (Math.round(seconds / 86400) < 365) {
      let s = Math.round(seconds / 86400);
      return `${s} day${s === 1 ? "" : "s"}`;
    } else if (Math.round(seconds / 31536000) < 1000) {
      let s = Math.round(seconds / 31536000);
      return `${s} year${s === 1 ? "" : "s"}`;
    } else if (Math.round(seconds / 31536e+6) < 1000) {
      let s = Math.round(seconds / 31536e+6);
      return `${s} thousand years`;
    } else if (Math.round(seconds / 31536e+9) < 1000) {
      let s = Math.round(seconds / 31536e+9);
      return `${s} million years`;
    } else if (Math.round(seconds / 31536e+12) < 1000) {
      let s = Math.round(seconds / 31536e+12);
      return `${s} billion years`;
    } else {
      return `way too long`;
    }
  }
});
