const checkbox1 = document.querySelector("#invoiceData1");
const checkbox2 = document.querySelector("#invoiceData2");
const invoiceFields = document.querySelector("#invoiceFields");
const invoiceFields2 = document.querySelector("#invoiceFields2");

function validate() {
  let email1 = document.querySelector("#email1").value;
  let emailConfirm1 = document.querySelector("#emailConfirm1").value;

  if (email1 === emailConfirm1) {
    return;
  } else {
    alert("Maile nie są takie same.");
  }
}
function validate2() {
  let email2 = document.querySelector("#email2").value;
  let emailConfirm2 = document.querySelector("#emailConfirm2").value;
  if (email2 === emailConfirm2) {
    return;
  } else {
    alert("Maile nie są takie same.");
  }
}

checkbox1.checked = false;
checkbox2.checked = false;
const form1 = document.querySelector("#form1");
form1.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("modal1");
  validate();
});
const form2 = document.querySelector("#form2");
form2.addEventListener("submit", (e) => {
  e.preventDefault();
  validate2();
});

const toggleFields1 = (e) => {
  if (invoiceFields.classList.contains("show")) {
    invoiceFields.classList.remove("show");
  } else {
    invoiceFields.classList.add("show");
  }
};

const toggleFields2 = (e) => {
  if (invoiceFields2.classList.contains("show")) {
    invoiceFields2.classList.remove("show");
  } else {
    invoiceFields2.classList.add("show");
  }
};
checkbox1.addEventListener("change", (e) => toggleFields1(e));
checkbox2.addEventListener("change", (e) => toggleFields2(e));

if (checkbox1.checked) {
  invoiceFields.classList.add("show");
} else {
  invoiceFields.classList.remove("show");
}
if (checkbox2.checked) {
  invoiceFields2.classList.add("show");
} else {
  invoiceFields2.classList.remove("show");
}

const url = "https://mailer.jellydev.pl/growe/send-contact";
const formModal1 = document.getElementById("form1");
const formModal2 = document.getElementById("form2");

const buttonHandle = (form, message) => {
  let submitBtn = form.querySelector("button");
  if (submitBtn.classList.contains("btn-secondary")) {
    submitBtn.innerText = message;
  }
};

const sendForm = (e) => {
  e.preventDefault();
  const thisForm = e.target;
  let inputs = thisForm.getElementsByTagName("input");
  let formData = new FormData();
  inputs = [...inputs];
  inputs.forEach((input) => {
    if (input.type !== "radio") {
      formData.append(input.name, input.value);
    } else {
      input.checked && formData.append(input.name, input.value);
    }
  });
  fetch(url, {
    method: "post",
    body: formData,
  })
    .then((res) => {
      buttonHandle(thisForm, "Wysyłanie...");
      if (res.status === 200) {
        buttonHandle(thisForm, "Zamówienie zostało złożnone");
        thisForm.reset();
        checkbox1.checked
          ? (checkbox1.checked = false)
          : (checkbox1.checked = false);
        checkbox2.checked
          ? (checkbox2.checked = false)
          : (checkbox2.checked = false);
      } else {
        buttonHandle(thisForm, "Spróbuj ponownie");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

formModal1.addEventListener("submit", sendForm);
formModal2.addEventListener("submit", sendForm);
