$(() => {
  let dictionary = words.concat(names);
  $("#dictionaryWords").html(`Containing ${dictionary.length} words, t`);

  if (!window.crypto && !window.msCrypto) {
    $("#cryptoStatus").html("(not available for your browser)");
  } else {
    $("#useCrypto").attr("disabled", false);
    $("#useCrypto").prop("checked", true);
  }

  $("#useUncommon").change(function() {
    if (this.checked) {
      if ($("#useNames").prop("checked")) {
        dictionary = words.concat(names);
      } else {
        dictionary = words;
      }
    } else {
      if ($("#useNames").prop("checked")) {
        dictionary = words.slice(0, Math.round(words.length * 0.5)).concat(names);
      } else {
        dictionary = words.slice(0, Math.round(words.length * 0.5));
      }
    }
    $("#dictionaryWords").html(`Containing ${dictionary.length} words, t`);
  });

  $("#useNames").change(function() {
    if ($("#useUncommon").prop("checked")) {
      if (this.checked) {
        dictionary = words.concat(names);
      } else {
        dictionary = words;
      }
    } else {
      if (this.checked) {
        dictionary = words.slice(0, Math.round(words.length * 0.5)).concat(names);
      } else {
        dictionary = words.slice(0, Math.round(words.length * 0.5));
      }
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
    let randomSortedDictionary = shuffleArray(dictionary.map((a) => a));
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
        password.push(`<span class="${i === wordNumber - 1 ? "" : "words"}">${randomSortedDictionary[randomInt(0, randomSortedDictionary.length - 1)]}</span>`);
      }
      let combinations = Math.pow(dictionary.length, wordNumber);
      let trillionAttempts = displayTime(combinations / 2e+12);
      let billionAttempts = displayTime(combinations / 2e+9);
      let millionAttempts = displayTime(combinations / 2e+6);
      let thousandAttempts = displayTime(combinations / 2000);
      $("#generatedPassword").html(password.join(""));
      if (combinations > Math.pow(2, 100)) {
        $("#generatedPassword").addClass("alert-success");
        $("#generatedPassword").removeClass("alert-warning");
        $("#generatedPassword").removeClass("alert-danger");
        $("#estimatedYears").html(`
          <p>Overkill. On average, this password will be cracked after…</p>
          <ul>
            <li>${trillionAttempts} with a trillion attempts per second.</li>
            <li>${billionAttempts} with a billion attempts per second.</li>
            <li>${millionAttempts} with a million attempts per second.</li>
            <li>${thousandAttempts} with a thousand attempts per second.</li>
          </ul>
          `);
      } else if (combinations > Math.pow(2, 65)) {
        $("#generatedPassword").addClass("alert-success");
        $("#generatedPassword").removeClass("alert-warning");
        $("#generatedPassword").removeClass("alert-danger");
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
        $("#generatedPassword").removeClass("alert-success");
        $("#generatedPassword").addClass("alert-warning");
        $("#generatedPassword").removeClass("alert-danger");
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
        $("#generatedPassword").removeClass("alert-success");
        $("#generatedPassword").removeClass("alert-warning");
        $("#generatedPassword").addClass("alert-danger");
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
      return `way too long`
    }
  }

  function randomInt(min, max) {
    if ($("#useCrypto").prop("checked")) {
      let browserCrypto = window.crypto || window.msCrypto;
      let array = new Uint32Array(1);
      browserCrypto.getRandomValues(array);
      if (array[0] >= Math.floor(Math.pow(2, 32) / (max - min + 1)) * (max - min + 1)) {
        return randomInt(min, max);
      } else {
        return min + array[0] % (max - min + 1);
      }
    } else {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let random = randomInt(0, i);
      [array[i], array[random]] = [array[random], array[i]];
    }
    return array;
  }
});
