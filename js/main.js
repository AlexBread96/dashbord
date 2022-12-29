document.addEventListener("DOMContentLoaded", function () {
  const $testResult = document.querySelector(".test-result");
  const $buttonToDashboard = document.querySelector(
    ".button.button--dashboard"
  );
  const link = location.href;
  let maxScores = [7, 21, 11, 9, 7];
  let btnLink, score, percantage, curentValue; 
  function parceLink() {
    curentValue = link.slice(link.indexOf("last") + 5).split("&")[0];
    score = link
      .slice(link.indexOf("score") + 6)
      .split("&")[0]
      .split("_")
      .filter((el) => el !== "")
      .map((el, idx) => (+el > maxScores[idx] ? maxScores[idx] : +el))
      .filter((el, idx) => idx === (curentValue > 5 ? 4 : curentValue - 1));
    maxScores = maxScores.filter(
      (el, idx) => idx === (curentValue > 5 ? 4 : curentValue - 1)
    );
    btnLink = `?${link.slice(link.indexOf("fi")).split("&")[0]}&${
      link.slice(link.indexOf("score")).split("&")[0]
    }`;
    percantage = score.map((element, i) =>
      Math.round(((100 / maxScores[i]) * element).toFixed(2))
    );
  }

  function createResult(items) {
    let item;
    items.forEach((el, i) => {
      item = `
      <div class="test-diagram" style="--percentage:  ${
        percantage[i]
      }; --diagram-color:${getColor(i, percantage)};;"></div>
      <div class="test-diagram__description">
        <p class="test-diagram__number">${el}/${maxScores[i]}</p>
        <p class="test-diagram__percent">${
          percantage[i]
        }% respuestas correctas</p>
      </div>
      `;
    });
    $testResult.innerHTML = item;
    $buttonToDashboard.setAttribute(
      "href",
      location.origin + "/" + "dashboard.html" + btnLink
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
});
