$(() => {
  let dictionary = words.concat(names);
  $("#dictionaryWords").html(`Containing ${dictionary.length} words, t`);

  $("#useNames").change(function() {
    if (this.checked) {
      dictionary = words.concat(names);
    } else {
      dictionary = words;
    }
    $("#dictionaryWords").html(`Containing ${dictionary.length} words, t`);
  });

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
      $("#generatedPassword").hide();
      $("#estimatedYears").hide();
    } else {
      $("#wordNumber").removeClass("is-invalid");
      $("#invalid").hide();
      $("#generatedPassword").show();
      $("#estimatedYears").show();
      let password = [];
      for (let i = 0; i < wordNumber; i++) {
        password.push(`<span class="${i === wordNumber - 1 ? "" : "words"}">${dictionary[Math.floor(dictionary.length * Math.random())]}</span>`);
      }
      let combinations = Math.pow(dictionary.length, wordNumber);
      let trillionAttempts = displayTime(combinations / 2e+12);
      let billionAttempts = displayTime(combinations / 2e+9);
      let millionAttempts = displayTime(combinations / 2e+6);
      let thousandAttempts = displayTime(combinations / 2000);
      $("#generatedPassword").html(password.join(""));
      if (combinations >= Math.pow(2, 100)) {
        $("#generatedPassword").addClass("text-success");
        $("#generatedPassword").removeClass("text-warning");
        $("#generatedPassword").removeClass("text-danger");
        $("#estimatedYears").html(`
          <p>Overkill. On average, this password will be cracked after…</p>
          <ul>
            <li>${trillionAttempts} with a trillion attempts per second.</li>
            <li>${billionAttempts} with a billion attempts per second.</li>
            <li>${millionAttempts} with a million attempts per second.</li>
            <li>${thousandAttempts} with a thousand attempts per second.</li>
          </ul>
          `);
      } else if (combinations >= Math.pow(2, 60)) {
        $("#generatedPassword").addClass("text-success");
        $("#generatedPassword").removeClass("text-warning");
        $("#generatedPassword").removeClass("text-danger");
        $("#estimatedYears").html(`
          <p>Secure. On average, this password will be cracked after…</p>
          <ul>
            <li>${trillionAttempts} with a trillion attempts per second.</li>
            <li>${billionAttempts} with a billion attempts per second.</li>
            <li>${millionAttempts} with a million attempts per second.</li>
            <li>${thousandAttempts} with a thousand attempts per second.</li>
          </ul>
        `);
      } else if (combinations >= Math.pow(2, 40)) {
        $("#generatedPassword").removeClass("text-success");
        $("#generatedPassword").addClass("text-warning");
        $("#generatedPassword").removeClass("text-danger");
        $("#estimatedYears").html(`
          <p>Good. On average, this password will be cracked after…</p>
          <ul>
            <li>${trillionAttempts} with a trillion attempts per second.</li>
            <li>${billionAttempts} with a billion attempts per second.</li>
            <li>${millionAttempts} with a million attempts per second.</li>
            <li>${thousandAttempts} with a thousand attempts per second.</li>
          </ul>
        `);
      } else {
        $("#generatedPassword").removeClass("text-success");
        $("#generatedPassword").removeClass("text-warning");
        $("#generatedPassword").addClass("text-danger");
        $("#estimatedYears").html(`
          <p>Poor. On average, this password will be cracked after…</p>
          <ul>
            <li>${trillionAttempts} with a trillion attempts per second.</li>
            <li>${billionAttempts} with a billion attempts per second.</li>
            <li>${millionAttempts} with a million attempts per second.</li>
            <li>${thousandAttempts} with a thousand attempts per second.</li>
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
    } else if (isFinite(seconds)) {
      return `${`${Math.round(seconds / 31536000).toPrecision(2).replace("e+", "&times;10<sup>")}</sup>`} years`;
    } else {
      return `Way too long`
    }
  }
});
