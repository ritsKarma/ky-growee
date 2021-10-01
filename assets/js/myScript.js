const checkbox1 = document.querySelector("#invoiceData1");
const checkbox2 = document.querySelector("#invoiceData2");
const invoiceFields = document.querySelector("#invoiceFields");
const invoiceFields2 = document.querySelector("#invoiceFields2");

function validate() {
  let email1 = document.querySelector("#email1").value;
  let emailConfirm1 = document.querySelector("#emailConfirm1").value;

  if (email1 === emailConfirm1) {
    alert("Values matched");
  } else {
    alert("Values not matching");
  }
}
function validate2() {
  let email2 = document.querySelector("#email2").value;
  let emailConfirm2 = document.querySelector("#emailConfirm2").value;
  if (email2 === emailConfirm2) {
    alert("Values matched");
  } else {
    alert("Values not matching");
  }
}

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

const toggleFields = (e) => {
  if (invoiceFields.classList.contains("show")) {
    invoiceFields.classList.remove("show");
  } else {
    invoiceFields.classList.add("show");
  }

  if (invoiceFields2.classList.contains("show")) {
    invoiceFields2.classList.remove("show");
  } else {
    invoiceFields2.classList.add("show");
  }
};
checkbox1.addEventListener("change", (e) => toggleFields(e));
checkbox2.addEventListener("change", (e) => toggleFields(e));

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

//after Mateusz code

const url = "https://mailer.jellydev.pl/growe/send-contact";
const formModal1 = document.getElementById("form1");
const formModal2 = document.getElementById("form2");

// const testData = () => {
//     const inputs = document.querySelectorAll(".form-control");
//     inputs.forEach(input => {
//         input.value = "topform-Test@value.pl";
//     });
// }
const sendForm = (e) => {
  e.preventDefault();

  // let formData = new FormData();
  const thisForm = e.target;
  // const inputs = [...thisForm.children];
  let inputs = thisForm.getElementsByTagName("input");

  // const thisForm = e.target;
  let formData = new FormData();
  inputs = [...inputs];
  inputs.forEach((input) => {
    console.log(input.name);
    console.log(input.value);
    // if (input.classList.contains("form-control")) {
    formData.append(input.name, input.value);
    // }
  });
  console.log(inputs);
  // console.log("inputs", formData.entries());
  // for (var pair of formData.entries()) {
  //   console.log(pair[0] + "--> " + pair[1]);
  // }
  fetch(url, {
    method: "post",
    body: formData,
  })
    .then((res) => {
      // buttonHandle(thisForm);

      console.log(res);
      if (res.status === 200) {
        // inputEffects("success");
      } else {
        // inputEffects("error");
      }
    })
    .catch((err) => {
      console.log(err);
      // inputEffects("error");
    });
};

formModal1.addEventListener("submit", sendForm);
formModal2.addEventListener("submit", sendForm);

// formModal1.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const formData = new FormData(formModal1);
//   const formDataSerialized = Object.fromEntries(formData);
//   //   console.log("test");
//   console.log(formDataSerialized, "formDataSerialized");
// });
