import commander from 'commander';
import { exec } from 'child_process';
import fs from 'fs';

const getYear = () => {
  var dt    = new Date();
  dt.setTime(dt.getTime() +  1000 * 60 * 60 * 9);
  var year  = dt.getFullYear();
  return year;
};
commander
  .usage('-o ./dist/licenses.html')
  .option('-o, --out <value>', 'filepath of generated file', String, './licenses.html')
  .usage('-n your productname')
  .option('-n, --pacakagename <value>', 'your product name', String, process.env.npm_package_name)
  .usage('-l licensetype')
  .option('-l, --license <value>', 'your product license', String, process.env.npm_package_license)
  .usage('-a authorname')
  .option('-a, --author <value>', 'author name', String, process.env.npm_package_author)
  .usage('-y year')
  .option('-y, --year <value>', 'year', String, `${getYear()}`)
  .parse(process.argv)

const outputFilePath: string = commander.out;
const pacakagename: string = commander.pacakagename;
const license: string = commander.license;
const author: string = commander.author;
const year: string = commander.year;

exec(
  'yarn licenses generate-disclaimer --ignore-platform  --ignore-optional --ignore-engines',
  { maxBuffer: 1024 * 1024 },
  (err: any, stdout: any, stderr: any) => {
    if (err || stderr) {
      console.log('exec error');
      throw err || stderr;
    }
    const softwares = 'THE FOLLOWING SETS FORTH ATTRIBUTION NOTICES FOR THIRD PARTY SOFTWARE THAT MAY BE CONTAINED IN PORTIONS OF THIS PRODUCT.';
    const software = 'The following software may be included in this product: ';
    const software2 = 'This software contains the following license and notice below:';
    const copyof = 'A copy of the source code may be downloaded from';
    const licenses = stdout
      .replace(softwares, `<div class="c1">${softwares}.</div>`)
      .split(software)
      .map((text: string) =>
      `<div class="c0">` + text
          .trim()
          .replace(copyof, `\n</div><div class="c1">${copyof}`)
          .replace(/\r?\n/g, '<br>')
          .replace(/\r?\n/g, '<br>')
          .replace(
            software2,
            `<br>This software may be included in this product contains the following license and notice below:</div><div class="c2">`
          ) + '</div>'
      )
      .join('');
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

  ${licenses}
</body>
</html>`;
    fs.writeFile(outputFilePath, html, (err: any) => {
      if (err) {
        console.log('write error');
        throw err;
      } else {
        console.log('done.');
      }
    });
  }
);
