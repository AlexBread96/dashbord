document.addEventListener("DOMContentLoaded", function () {
  const $testResult = document.querySelector(".test-result");
  const $buttonToDashboard = document.querySelector(
    ".button.button--dashboard"
  );
  const link = location.href;
  let maxScore = 7;
  let btnLink, score, percantage, curentValue;
  console.log(link);
  console.log(link.slice(link.indexOf("last") + 5));

  function parceLink() {
    curentValue = link.slice(link.indexOf("last") + 5);
    score = link
      .slice(link.indexOf("score") + 6)
      .split("&")[0]
      .split("_")
      .filter((el) => el !== "")
      .map((el) => (+el > maxScore ? maxScore : +el))
      .filter((el, idx) => idx === (curentValue > 5 ? 4 : curentValue - 1));

    fillArr(score);
    btnLink = `?${link.slice(link.indexOf("fi")).split("&")[0]}&${
      link.slice(link.indexOf("score")).split("&")[0]
    }`;
    percantage = score.map((element) =>
      Math.round(((100 / maxScore) * element).toFixed(2))
    );
    console.log(score);
    console.log(btnLink);
    console.log(curentValue);
    console.log(percantage);
  }

  function createResult(items) {
    let item;
    items.forEach((el, i) => {
      item = `
      <div class="test-diagram" style="--percentage:  ${
        percantage[i]
      }; --diagram-color:${getColor(i, percantage)};;"></div>
      <div class="test-diagram__description">
        <p class="test-diagram__number">${el}/${maxScore}</p>
        <p class="test-diagram__percent">${
          percantage[i]
        }% respuestas correctas</p>
      </div>
      `;
    });
    $testResult.innerHTML = item;
    $buttonToDashboard.setAttribute(
      "href",
      location.origin + "/dashboard.html" + btnLink
    );
  }

  parceLink();
  createResult(score);
  function getColor(idx, array) {
    let val = array[idx];
    if (val === 100) {
      return colors.green;
    } else if (val >= 70 && val <= 99) {
      return colors.yellow;
    } else if (val >= 40 && val <= 69) {
      return colors.blue;
    } else if (val === 0) {
      return colors.transparent;
    } else {
      return colors.red;
    }
  }

  function fillArr(arr) {
    if (arr.length < 5) {
      arr.push(0);
      fillArr(arr);
    } else {
      return;
    }
  }
});
