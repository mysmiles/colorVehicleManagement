const fs = require('fs');
const xlsx = require('node-xlsx')

// excel数据
const excelData = xlsx.parse('../public/demo.xlsx');
// 最终数据
let finalArr = [];

function handelExcel() {
  // excel的第一个sheet
  const excelSheet = excelData[0].data;
  // 表内容
  const jsonData = excelSheet.slice(5);
  jsonData.forEach((lineItem, sheetIndex) => {
    if (sheetIndex > 180) {
      return
    }

    let villageIndex = finalArr.findIndex(finalItem => finalItem.villageName === lineItem[3])

    if (villageIndex !== -1) {
      finalArr[villageIndex].children = concatArr(lineItem, finalArr[villageIndex].children)
    } else {
      let arrItem = {
        villageName: lineItem[3],
        children: [
          {
            BasicGridName: lineItem[4],
            // 基层网格长名字
            BasicGridManager: lineItem[5],
            // 网格员
            BasicGridAdmin: [lineItem[8]],
            // 户数
            count: lineItem[11]
          }
        ]
      }
      finalArr.push(arrItem);
    }
  })
};

handelExcel();
generatJSON('../public/data.json', JSON.stringify(finalArr, null , '\t'))


/**
 * 生成JSON文件
 * @param {*} fileName
 * @param {*} data
 */
function generatJSON(fileName, data) {
  fs.writeFile(fileName, data, 'utf-8', function (err) {
    if (err) {
      console.log('errr', err);
    } else {
      console.log('success');
    }
  })
}

function concatArr(tableArr, orignArr = []) {
  let index = orignArr.findIndex(finalItem => finalItem.BasicGridManager === tableArr[5])
  if (index !== -1) {
    orignArr[index] = {
      // 网格名
      BasicGridName: orignArr[index].BasicGridName === tableArr[4] ? orignArr[index].BasicGridName : `${orignArr[index].BasicGridName}，${tableArr[4]}`,
      // 基层网格长名字
      BasicGridManager: tableArr[5],
      // 网格员
      BasicGridAdmin: [...orignArr[index].BasicGridAdmin, tableArr[8]],
      // 户数
      count: Number(orignArr[index].count) + Number(tableArr[11])
    }
  } else {
    let arrItem = {}
    arrItem = {
      // 网格名
      BasicGridName: tableArr[4],
      // 基层网格长名字
      BasicGridManager: tableArr[5],
      // 网格员
      BasicGridAdmin: [tableArr[8]],
      // 户数
      count: tableArr[11]
    }
    orignArr.push(arrItem)
  }
  return orignArr
}
