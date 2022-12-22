document.addEventListener("DOMContentLoaded", function () {
  $testsList = document.querySelector(".tests-list");

  const link = location.href;
  const maxScore = 7;
  const colors = {
    red: "#FF6B62",
    green: "#A7E92F",
    yellow: "#FFEB35",
    blue: "#55B8FF",
    transparent: "#ffffff00",
  };

  const dsc = {
    done: "Subida",
    middle: "Antes de empezar el viaje",
    predone: "Conflicto",
    postNone: "Viaje",
    none: "Terminacion del viaje",
  };

  const btns = {
    done: '<a class="button button--done">Puntaje máximo</a>',
    restart: '<a class="button button--restart" href=" ">Reiniciar el caso</a>',
    start: '<a class="button button--new" href=" ">Iniciar el caso</a>',
    none: '<a class="button button--done"> </a>',
  };
  let testsItems = [];
  let score, percantage;

  function parseLink(link) {
    score = link
      .slice(link.indexOf("score") + 6)
      .split("_")
      .filter((el) => el !== "")
      .map((el) => (+el > maxScore ? 7 : +el));
    function fillArr(arr) {
      if (arr.length < 5) {
        arr.push(0);
        fillArr(arr);
      } else {
        return;
      }
    }
    fillArr(score);
    percantage = score.map((element) =>
      Math.round(((100 / maxScore) * element).toFixed(2))
    );
  }
  function createTestItem(items) {
    items.forEach((el, i) => {
      testsItems.push(`<li class="test ${
        el === maxScore ? "test--disable" : ""
      }">
        <section class="test-result ${el === 0 ? "test-result--new" : ""}">
            <div class="test-diagram test-diagram--small" style="--percentage:${
              percantage[i]
            }; --diagram-color:${getColor(i, percantage)};"></div>
            <div class="test-diagram__description test-diagram__description--small">
               <p class="test-diagram__number test-diagram__number--small">${el}/${maxScore}</p>
            </div>
        </section>
        <section class="test__description">
            <p class="test__header">${getDsc(i, score)}</p>
            ${getBtn(i, score)}
        </section>
    </li>`);
      $testsList.innerHTML += testsItems[i];
    });
  }
  parseLink(link);
  if (link.indexOf("score") !== -1) {
    createTestItem(score);
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
    if (val === maxScore) {
      return btns.done;
    } else if (val > 0) {
      return btns.restart;
    } else if (
      val === 0 &&
      (array[idx - 1] > 0 || array[idx - 1] === undefined)
    ) {
      return btns.start;
    } else {
      return "";
    }
  }
});
