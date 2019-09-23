"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _child_process = require("child_process");

var _fs = _interopRequireDefault(require("fs"));

var _text = require("./text");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getYear = () => {
  var dt = new Date();
  dt.setTime(dt.getTime() + 1000 * 60 * 60 * 9);
  var year = dt.getFullYear();
  return year;
};

_commander.default.usage('-o ./dist/licenses.html').option('-o, --out <value>', 'filepath of generated file', String, './licenses.html').usage('-n your productname').option('-n, --pacakagename <value>', 'your product name', String, process.env.npm_package_name).usage('-l licensetype').option('-l, --license <value>', 'your product license', String, process.env.npm_package_license).usage('-a authorname').option('-a, --author <value>', 'author name', String, process.env.npm_package_author).usage('-y year').option('-y, --year <value>', 'year', String, `${getYear()}`).parse(process.argv);

const outputFilePath = _commander.default.out;
const pacakagename = _commander.default.pacakagename;
const license = _commander.default.license;
const author = _commander.default.author;
const year = _commander.default.year;
(0, _child_process.exec)('yarn licenses generate-disclaimer --ignore-platform  --ignore-optional --ignore-engines', {
  maxBuffer: 1024 * 1024
}, (err, stdout, stderr) => {
  if (err || stderr) {
    console.log('exec error');
    throw err || stderr;
  }

  const softwares = 'THE FOLLOWING SETS FORTH ATTRIBUTION NOTICES FOR THIRD PARTY SOFTWARE THAT MAY BE CONTAINED IN PORTIONS OF THIS PRODUCT.';
  const software = 'The following software may be included in this product: ';
  const software2 = 'This software contains the following license and notice below:';
  const copyof = 'A copy of the source code may be downloaded from';
  const licenses = stdout.replace(softwares, `<div class="c1">${softwares}.</div>`).split(software).map(text => `<div class="c0">` + text.trim().replace(copyof, `\n</div><div class="c1">${copyof}`).replace(/\r?\n/g, '<br>').replace(/\r?\n/g, '<br>').replace(software2, `<br>This software may be included in this product contains the following license and notice below:</div><div class="c2">`) + '</div>').join('');
  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8" />
<title>THIRD PARTY SOFTWARE LICENSES</title>
<style>
body		{ text-align:center; background-color: #f9f9f9; font-family: 'Segoe UI','メイリオ','Meiryo','ヒラギノ角ゴ Pro W3','Hiragino Kaku Gothic Pro','Osaka','ＭＳ Ｐゴシック','MS PGothic','Arial',sans-serif; }
h2			{ color: #333333; font-size: 28px; }
h3			{ color: #333333; font-size: 24px; }
div			{ font-size: 14px; line-height: 2; word-wrap: break-word; }
div.c0		{ color: #333333; font-size: 20px; }
div.c1		{ padding-bottom: 8px; color: #555555; font-size: 12px; }
div.c2		{ padding-bottom: 24px; color: #888888; font-size: 9px; }
</style>
</head>
<body>

<h3>Licenses</h3>
  <div class="c0">
    ${pacakagename}
  </div>

  <div class="c1">
    ${license}
    <br>
    Copyright (c) ${year} ${author}
  </div>
  <div class="c2">
    ${license === 'MIT' ? _text.MIT.replace(/\r?\n/g, '<br>') : null}
    ${license === 'Apache-2.0' ? _text.Apache2.replace(/\r?\n/g, '<br>') : null}
  </div>
  ${licenses}
</body>
</html>`;

  _fs.default.writeFile(outputFilePath, html, err => {
    if (err) {
      console.log('write error');
      throw err;
    } else {
      console.log('done.');
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saWNlbnNlLWxpc3QtaHRtbC50cyJdLCJuYW1lcyI6WyJnZXRZZWFyIiwiZHQiLCJEYXRlIiwic2V0VGltZSIsImdldFRpbWUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJjb21tYW5kZXIiLCJ1c2FnZSIsIm9wdGlvbiIsIlN0cmluZyIsInByb2Nlc3MiLCJlbnYiLCJucG1fcGFja2FnZV9uYW1lIiwibnBtX3BhY2thZ2VfbGljZW5zZSIsIm5wbV9wYWNrYWdlX2F1dGhvciIsInBhcnNlIiwiYXJndiIsIm91dHB1dEZpbGVQYXRoIiwib3V0IiwicGFjYWthZ2VuYW1lIiwibGljZW5zZSIsImF1dGhvciIsIm1heEJ1ZmZlciIsImVyciIsInN0ZG91dCIsInN0ZGVyciIsImNvbnNvbGUiLCJsb2ciLCJzb2Z0d2FyZXMiLCJzb2Z0d2FyZSIsInNvZnR3YXJlMiIsImNvcHlvZiIsImxpY2Vuc2VzIiwicmVwbGFjZSIsInNwbGl0IiwibWFwIiwidGV4dCIsInRyaW0iLCJqb2luIiwiaHRtbCIsIk1JVCIsIkFwYWNoZTIiLCJmcyIsIndyaXRlRmlsZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU1BLE9BQU8sR0FBRyxNQUFNO0FBQ3BCLE1BQUlDLEVBQUUsR0FBTSxJQUFJQyxJQUFKLEVBQVo7QUFDQUQsRUFBQUEsRUFBRSxDQUFDRSxPQUFILENBQVdGLEVBQUUsQ0FBQ0csT0FBSCxLQUFnQixPQUFPLEVBQVAsR0FBWSxFQUFaLEdBQWlCLENBQTVDO0FBQ0EsTUFBSUMsSUFBSSxHQUFJSixFQUFFLENBQUNLLFdBQUgsRUFBWjtBQUNBLFNBQU9ELElBQVA7QUFDRCxDQUxEOztBQU1BRSxtQkFDR0MsS0FESCxDQUNTLHlCQURULEVBRUdDLE1BRkgsQ0FFVSxtQkFGVixFQUUrQiw0QkFGL0IsRUFFNkRDLE1BRjdELEVBRXFFLGlCQUZyRSxFQUdHRixLQUhILENBR1MscUJBSFQsRUFJR0MsTUFKSCxDQUlVLDRCQUpWLEVBSXdDLG1CQUp4QyxFQUk2REMsTUFKN0QsRUFJcUVDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxnQkFKakYsRUFLR0wsS0FMSCxDQUtTLGdCQUxULEVBTUdDLE1BTkgsQ0FNVSx1QkFOVixFQU1tQyxzQkFObkMsRUFNMkRDLE1BTjNELEVBTW1FQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUUsbUJBTi9FLEVBT0dOLEtBUEgsQ0FPUyxlQVBULEVBUUdDLE1BUkgsQ0FRVSxzQkFSVixFQVFrQyxhQVJsQyxFQVFpREMsTUFSakQsRUFReURDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRyxrQkFSckUsRUFTR1AsS0FUSCxDQVNTLFNBVFQsRUFVR0MsTUFWSCxDQVVVLG9CQVZWLEVBVWdDLE1BVmhDLEVBVXdDQyxNQVZ4QyxFQVVpRCxHQUFFVixPQUFPLEVBQUcsRUFWN0QsRUFXR2dCLEtBWEgsQ0FXU0wsT0FBTyxDQUFDTSxJQVhqQjs7QUFhQSxNQUFNQyxjQUFzQixHQUFHWCxtQkFBVVksR0FBekM7QUFDQSxNQUFNQyxZQUFvQixHQUFHYixtQkFBVWEsWUFBdkM7QUFDQSxNQUFNQyxPQUFlLEdBQUdkLG1CQUFVYyxPQUFsQztBQUNBLE1BQU1DLE1BQWMsR0FBR2YsbUJBQVVlLE1BQWpDO0FBQ0EsTUFBTWpCLElBQVksR0FBR0UsbUJBQVVGLElBQS9CO0FBRUEseUJBQ0UseUZBREYsRUFFRTtBQUFFa0IsRUFBQUEsU0FBUyxFQUFFLE9BQU87QUFBcEIsQ0FGRixFQUdFLENBQUNDLEdBQUQsRUFBV0MsTUFBWCxFQUF3QkMsTUFBeEIsS0FBd0M7QUFDdEMsTUFBSUYsR0FBRyxJQUFJRSxNQUFYLEVBQW1CO0FBQ2pCQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxZQUFaO0FBQ0EsVUFBTUosR0FBRyxJQUFJRSxNQUFiO0FBQ0Q7O0FBQ0QsUUFBTUcsU0FBUyxHQUFHLDBIQUFsQjtBQUNBLFFBQU1DLFFBQVEsR0FBRywwREFBakI7QUFDQSxRQUFNQyxTQUFTLEdBQUcsZ0VBQWxCO0FBQ0EsUUFBTUMsTUFBTSxHQUFHLGtEQUFmO0FBQ0EsUUFBTUMsUUFBUSxHQUFHUixNQUFNLENBQ3BCUyxPQURjLENBQ05MLFNBRE0sRUFDTSxtQkFBa0JBLFNBQVUsU0FEbEMsRUFFZE0sS0FGYyxDQUVSTCxRQUZRLEVBR2RNLEdBSGMsQ0FHVEMsSUFBRCxJQUNKLGtCQUFELEdBQXFCQSxJQUFJLENBQ3BCQyxJQURnQixHQUVoQkosT0FGZ0IsQ0FFUkYsTUFGUSxFQUVDLDJCQUEwQkEsTUFBTyxFQUZsQyxFQUdoQkUsT0FIZ0IsQ0FHUixRQUhRLEVBR0UsTUFIRixFQUloQkEsT0FKZ0IsQ0FJUixRQUpRLEVBSUUsTUFKRixFQUtoQkEsT0FMZ0IsQ0FNZkgsU0FOZSxFQU9kLDBIQVBjLENBQXJCLEdBUVEsUUFaTyxFQWNkUSxJQWRjLENBY1QsRUFkUyxDQUFqQjtBQWVBLFFBQU1DLElBQUksR0FBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQW1CWnBCLFlBQWE7Ozs7TUFJYkMsT0FBUTs7b0JBRU1oQixJQUFLLElBQUdpQixNQUFPOzs7TUFHN0JELE9BQU8sS0FBRyxLQUFWLEdBQWtCb0IsVUFBSVAsT0FBSixDQUFZLFFBQVosRUFBc0IsTUFBdEIsQ0FBbEIsR0FBZ0QsSUFBSztNQUNyRGIsT0FBTyxLQUFHLFlBQVYsR0FBeUJxQixjQUFRUixPQUFSLENBQWdCLFFBQWhCLEVBQTBCLE1BQTFCLENBQXpCLEdBQTJELElBQUs7O0lBRWxFRCxRQUFTOztRQS9CVDs7QUFrQ0FVLGNBQUdDLFNBQUgsQ0FBYTFCLGNBQWIsRUFBNkJzQixJQUE3QixFQUFvQ2hCLEdBQUQsSUFBYztBQUMvQyxRQUFJQSxHQUFKLEVBQVM7QUFDUEcsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksYUFBWjtBQUNBLFlBQU1KLEdBQU47QUFDRCxLQUhELE1BR087QUFDTEcsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksT0FBWjtBQUNEO0FBQ0YsR0FQRDtBQVFELENBckVIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbW1hbmRlciBmcm9tICdjb21tYW5kZXInO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IE1JVCwgQXBhY2hlMiB9IGZyb20gJy4vdGV4dCc7XG5cbmNvbnN0IGdldFllYXIgPSAoKSA9PiB7XG4gIHZhciBkdCAgICA9IG5ldyBEYXRlKCk7XG4gIGR0LnNldFRpbWUoZHQuZ2V0VGltZSgpICsgIDEwMDAgKiA2MCAqIDYwICogOSk7XG4gIHZhciB5ZWFyICA9IGR0LmdldEZ1bGxZZWFyKCk7XG4gIHJldHVybiB5ZWFyO1xufTtcbmNvbW1hbmRlclxuICAudXNhZ2UoJy1vIC4vZGlzdC9saWNlbnNlcy5odG1sJylcbiAgLm9wdGlvbignLW8sIC0tb3V0IDx2YWx1ZT4nLCAnZmlsZXBhdGggb2YgZ2VuZXJhdGVkIGZpbGUnLCBTdHJpbmcsICcuL2xpY2Vuc2VzLmh0bWwnKVxuICAudXNhZ2UoJy1uIHlvdXIgcHJvZHVjdG5hbWUnKVxuICAub3B0aW9uKCctbiwgLS1wYWNha2FnZW5hbWUgPHZhbHVlPicsICd5b3VyIHByb2R1Y3QgbmFtZScsIFN0cmluZywgcHJvY2Vzcy5lbnYubnBtX3BhY2thZ2VfbmFtZSlcbiAgLnVzYWdlKCctbCBsaWNlbnNldHlwZScpXG4gIC5vcHRpb24oJy1sLCAtLWxpY2Vuc2UgPHZhbHVlPicsICd5b3VyIHByb2R1Y3QgbGljZW5zZScsIFN0cmluZywgcHJvY2Vzcy5lbnYubnBtX3BhY2thZ2VfbGljZW5zZSlcbiAgLnVzYWdlKCctYSBhdXRob3JuYW1lJylcbiAgLm9wdGlvbignLWEsIC0tYXV0aG9yIDx2YWx1ZT4nLCAnYXV0aG9yIG5hbWUnLCBTdHJpbmcsIHByb2Nlc3MuZW52Lm5wbV9wYWNrYWdlX2F1dGhvcilcbiAgLnVzYWdlKCcteSB5ZWFyJylcbiAgLm9wdGlvbignLXksIC0teWVhciA8dmFsdWU+JywgJ3llYXInLCBTdHJpbmcsIGAke2dldFllYXIoKX1gKVxuICAucGFyc2UocHJvY2Vzcy5hcmd2KVxuXG5jb25zdCBvdXRwdXRGaWxlUGF0aDogc3RyaW5nID0gY29tbWFuZGVyLm91dDtcbmNvbnN0IHBhY2FrYWdlbmFtZTogc3RyaW5nID0gY29tbWFuZGVyLnBhY2FrYWdlbmFtZTtcbmNvbnN0IGxpY2Vuc2U6IHN0cmluZyA9IGNvbW1hbmRlci5saWNlbnNlO1xuY29uc3QgYXV0aG9yOiBzdHJpbmcgPSBjb21tYW5kZXIuYXV0aG9yO1xuY29uc3QgeWVhcjogc3RyaW5nID0gY29tbWFuZGVyLnllYXI7XG5cbmV4ZWMoXG4gICd5YXJuIGxpY2Vuc2VzIGdlbmVyYXRlLWRpc2NsYWltZXIgLS1pZ25vcmUtcGxhdGZvcm0gIC0taWdub3JlLW9wdGlvbmFsIC0taWdub3JlLWVuZ2luZXMnLFxuICB7IG1heEJ1ZmZlcjogMTAyNCAqIDEwMjQgfSxcbiAgKGVycjogYW55LCBzdGRvdXQ6IGFueSwgc3RkZXJyOiBhbnkpID0+IHtcbiAgICBpZiAoZXJyIHx8IHN0ZGVycikge1xuICAgICAgY29uc29sZS5sb2coJ2V4ZWMgZXJyb3InKTtcbiAgICAgIHRocm93IGVyciB8fCBzdGRlcnI7XG4gICAgfVxuICAgIGNvbnN0IHNvZnR3YXJlcyA9ICdUSEUgRk9MTE9XSU5HIFNFVFMgRk9SVEggQVRUUklCVVRJT04gTk9USUNFUyBGT1IgVEhJUkQgUEFSVFkgU09GVFdBUkUgVEhBVCBNQVkgQkUgQ09OVEFJTkVEIElOIFBPUlRJT05TIE9GIFRISVMgUFJPRFVDVC4nO1xuICAgIGNvbnN0IHNvZnR3YXJlID0gJ1RoZSBmb2xsb3dpbmcgc29mdHdhcmUgbWF5IGJlIGluY2x1ZGVkIGluIHRoaXMgcHJvZHVjdDogJztcbiAgICBjb25zdCBzb2Z0d2FyZTIgPSAnVGhpcyBzb2Z0d2FyZSBjb250YWlucyB0aGUgZm9sbG93aW5nIGxpY2Vuc2UgYW5kIG5vdGljZSBiZWxvdzonO1xuICAgIGNvbnN0IGNvcHlvZiA9ICdBIGNvcHkgb2YgdGhlIHNvdXJjZSBjb2RlIG1heSBiZSBkb3dubG9hZGVkIGZyb20nO1xuICAgIGNvbnN0IGxpY2Vuc2VzID0gc3Rkb3V0XG4gICAgICAucmVwbGFjZShzb2Z0d2FyZXMsIGA8ZGl2IGNsYXNzPVwiYzFcIj4ke3NvZnR3YXJlc30uPC9kaXY+YClcbiAgICAgIC5zcGxpdChzb2Z0d2FyZSlcbiAgICAgIC5tYXAoKHRleHQ6IHN0cmluZykgPT5cbiAgICAgIGA8ZGl2IGNsYXNzPVwiYzBcIj5gICsgdGV4dFxuICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAucmVwbGFjZShjb3B5b2YsIGBcXG48L2Rpdj48ZGl2IGNsYXNzPVwiYzFcIj4ke2NvcHlvZn1gKVxuICAgICAgICAgIC5yZXBsYWNlKC9cXHI/XFxuL2csICc8YnI+JylcbiAgICAgICAgICAucmVwbGFjZSgvXFxyP1xcbi9nLCAnPGJyPicpXG4gICAgICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgICBzb2Z0d2FyZTIsXG4gICAgICAgICAgICBgPGJyPlRoaXMgc29mdHdhcmUgbWF5IGJlIGluY2x1ZGVkIGluIHRoaXMgcHJvZHVjdCBjb250YWlucyB0aGUgZm9sbG93aW5nIGxpY2Vuc2UgYW5kIG5vdGljZSBiZWxvdzo8L2Rpdj48ZGl2IGNsYXNzPVwiYzJcIj5gXG4gICAgICAgICAgKSArICc8L2Rpdj4nXG4gICAgICApXG4gICAgICAuam9pbignJyk7XG4gICAgY29uc3QgaHRtbCA9IGA8IURPQ1RZUEUgaHRtbD5cbjxodG1sIGxhbmc9XCJqYVwiPlxuPGhlYWQ+XG48bWV0YSBjaGFyc2V0PVwiVVRGLThcIiAvPlxuPHRpdGxlPlRISVJEIFBBUlRZIFNPRlRXQVJFIExJQ0VOU0VTPC90aXRsZT5cbjxzdHlsZT5cbmJvZHlcdFx0eyB0ZXh0LWFsaWduOmNlbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTsgZm9udC1mYW1pbHk6ICdTZWdvZSBVSScsJ+ODoeOCpOODquOCqicsJ01laXJ5bycsJ+ODkuODqeOCruODjuinkuOCtCBQcm8gVzMnLCdIaXJhZ2lubyBLYWt1IEdvdGhpYyBQcm8nLCdPc2FrYScsJ++8re+8syDvvLDjgrTjgrfjg4Pjgq8nLCdNUyBQR290aGljJywnQXJpYWwnLHNhbnMtc2VyaWY7IH1cbmgyXHRcdFx0eyBjb2xvcjogIzMzMzMzMzsgZm9udC1zaXplOiAyOHB4OyB9XG5oM1x0XHRcdHsgY29sb3I6ICMzMzMzMzM7IGZvbnQtc2l6ZTogMjRweDsgfVxuZGl2XHRcdFx0eyBmb250LXNpemU6IDE0cHg7IGxpbmUtaGVpZ2h0OiAyOyB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7IH1cbmRpdi5jMFx0XHR7IGNvbG9yOiAjMzMzMzMzOyBmb250LXNpemU6IDIwcHg7IH1cbmRpdi5jMVx0XHR7IHBhZGRpbmctYm90dG9tOiA4cHg7IGNvbG9yOiAjNTU1NTU1OyBmb250LXNpemU6IDEycHg7IH1cbmRpdi5jMlx0XHR7IHBhZGRpbmctYm90dG9tOiAyNHB4OyBjb2xvcjogIzg4ODg4ODsgZm9udC1zaXplOiA5cHg7IH1cbjwvc3R5bGU+XG48L2hlYWQ+XG48Ym9keT5cblxuPGgzPkxpY2Vuc2VzPC9oMz5cbiAgPGRpdiBjbGFzcz1cImMwXCI+XG4gICAgJHtwYWNha2FnZW5hbWV9XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJjMVwiPlxuICAgICR7bGljZW5zZX1cbiAgICA8YnI+XG4gICAgQ29weXJpZ2h0IChjKSAke3llYXJ9ICR7YXV0aG9yfVxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImMyXCI+XG4gICAgJHtsaWNlbnNlPT09J01JVCcgPyBNSVQucmVwbGFjZSgvXFxyP1xcbi9nLCAnPGJyPicpOm51bGx9XG4gICAgJHtsaWNlbnNlPT09J0FwYWNoZS0yLjAnID8gQXBhY2hlMi5yZXBsYWNlKC9cXHI/XFxuL2csICc8YnI+Jyk6bnVsbH1cbiAgPC9kaXY+XG4gICR7bGljZW5zZXN9XG48L2JvZHk+XG48L2h0bWw+YDtcbiAgICBmcy53cml0ZUZpbGUob3V0cHV0RmlsZVBhdGgsIGh0bWwsIChlcnI6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnd3JpdGUgZXJyb3InKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2RvbmUuJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbik7XG4iXX0=