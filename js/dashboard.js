document.addEventListener("DOMContentLoaded", function () {
  $testsList = document.querySelector(".tests-list");

  const link = location.href;
  const maxScores = [7, 21, 11, 9, 7];

  let testsItems = [];
  let score, percantage;

  function parseLink(link) {
    score = link
      .slice(link.indexOf("score") + 6)
      .split("_")
      .filter((el) => el !== "")
      .map((el, idx) => (+el > maxScores[idx] ? maxScores[idx] : +el));
    fillArr(score);
    percantage = score.map((element, idx) =>
      Math.round(((100 / maxScores[idx]) * element).toFixed(2))
    );
  }
  function createTestItem(items) {
    items.forEach((el, i) => {
      testsItems.push(`<li class="test ${
        el === maxScores[i] ? "test--disable" : ""
      }">
          <section class="test-result ${el === 0 ? "test-result--new" : ""}">
              <div class="test-diagram test-diagram--small" style="--percentage:${
                percantage[i]
              }; --diagram-color:${getColor(i, percantage)};"></div>
              <div class="test-diagram__description test-diagram__description--small">
                 <p class="test-diagram__number test-diagram__number--small">${el}/${
        maxScores[i]
      }</p>
              </div>
          </section>
          <section class="test__description">
              <p class="test__header">${getDsc(i, score)}</p>
              <a class="button ${getBtn(i, score).class}" href="${
        refLenks[i]
      }"> ${getBtn(i, score).text}</a>
          
          </section>
      </li>`);
      $testsList.innerHTML += testsItems[i];
    });
  }
  parseLink(link);
  if (link.indexOf("score") !== -1) {
    createTestItem(score);
    score.forEach((el, i) => {
      [...$testsList.querySelectorAll(".button").setAttribute()];
    });
  }
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
  function getDsc(idx, array) {
    let val = array[idx];
    if (val === 0) {
      return dsc.none;
    } else if (val >= 1 && val <= 3) {
      return dsc.postNone;
    } else if (val >= 4 && val <= 5) {
      return dsc.middle;
    } else if (val === 6) {
      return dsc.predone;
    } else {
      return dsc.done;
    }
  }
  function getBtn(idx, array) {
    let val = array[idx];
    if (val === maxScores[idx]) {
      return btns.done;
    } else if (val > 0) {
      return btns.restart;
    } else if (
      val === 0 &&
      (array[idx - 1] > 0 || array[idx - 1] === undefined)
    ) {
      return btns.start;
    } else {
      return btns.none;
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
