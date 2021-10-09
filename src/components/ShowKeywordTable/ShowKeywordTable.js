import React from 'react';
import PropTypes from 'prop-types';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from 'carbon-components-react';

const HEADERS = [
  {
    key: 'keyword',
    header: 'Keyword',
  },
  {
    key: 'text',
    header: 'Text',
  },
  {
    key: 'detectPoint',
    header: 'Detect Point',
  },
  {
    key: 'time',
    header: 'Start from ',
  }
];

const parseTableData = (keywordInfo, transcriptArray) => {
  let res = [];
  
  if((!keywordInfo || !transcriptArray) ||
     (keywordInfo.length === 0 && transcriptArray.length === 0) || 
     (keywordInfo.length !== transcriptArray.length)){
    res.push({
      'keyword' : 'no result.',
      'text' : 'no result.',
      'detectPoint' : 0,
      'time' : '0s'
    });
  } else {
    const keywordObj = keywordInfo.map(obj => {
      return {
        'key'   : Object.keys(obj),
        'value' : Object.values(obj)
      };
    });
    const transcriptObj = transcriptArray.map(obj => {
      return {
        'key'   : Object.keys(obj),
        'value' : Object.values(obj)
      };
    });
  
    keywordObj.map((keywords, i) => {
      const targetScripts = transcriptObj[i];
      keywords.key.map((keyword, j) => {
        let lastIndex = 0;
        keywords.value[j]
          .sort((a,b)=> {return a.start_time - b.start_time})
          .map(info => {
            const sentence = targetScripts.value[2];
            const detectPoint = sentence.indexOf(keyword, lastIndex);
            lastIndex = detectPoint + 1;
            const strPoint = detectPoint - 5 > -1 ? detectPoint - 5 : 0;
            const endPoint = detectPoint + keyword.length + 5;
            const text = sentence.slice(strPoint, endPoint)
            let resultData = {
              'id' : keyword + info.start_time,
              'keyword' : keyword,
              'text' : text,
              'detectPoint' : (detectPoint + 1) + '文字目',
              'time' : info.start_time + 's'
            };
            res.push(resultData);
          });
        });
      });
  }
  return res;
}

export const ShowKeywordTable = ({keywordInfo, transcriptArray}) => {
  
  return (
    <DataTable rows={parseTableData(keywordInfo, transcriptArray)} headers={HEADERS} isSortable>
    {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
      <Table {...getTableProps()}>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableHeader key={index} {...getHeaderProps({ header })}>
                {header.header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} {...getRowProps({ row })}>
              {row.cells.map((cell) => (
                <TableCell key={cell.id}>{cell.value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
  </DataTable>
  );
}

ShowKeywordTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
  keywordInfo: PropTypes.arrayOf(PropTypes.object),
  transcriptArray: PropTypes.arrayOf(PropTypes.object)
};

ShowKeywordTable.defaultProps = {
  headers: [],
  rows: [],
  keywordInfo: [],
  transcriptArray: []
};

export default ShowKeywordTable;