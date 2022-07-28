const dayT = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];

const monthN = [
  "stycznia",
  "lutego",
  "marca",
  "kwietnia",
  "maja",
  "czerwca",
  "lipca",
  "sierpnia",
  "września",
  "października",
  "listopada",
  "grudnia",
];

function dateFmt(date, formatStr) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  function pf(formatChar, dateFuncName, indexShift = 0) {
    const resultVal = (date["get" + dateFuncName]() + indexShift).toString();
    formatStr = formatStr.replace(
      new RegExp("(^|[^$])(" + formatChar + "+)", "g"),
      (match, p1, p2) =>
        p1 + (p2.replace(/./g, "0") + resultVal).slice(-Math.max(p2.length, resultVal.length))
    );
    return pf;
  }
  pf("R", "FullYear")("M", "Month", 1)("D", "Date")("G", "Hours")("I", "Minutes")("S", "Seconds");
  return formatStr
    .replace(/(^|[^$])(N+)/g, (m, a) => a + monthN[date.getMonth()])
    .replace(/(^|[^$])(T+)/g, (m, a) => a + dayT[date.getDay()])
    .replace(/(\$)([^$])/g, "$2");
}

export { dateFmt };
