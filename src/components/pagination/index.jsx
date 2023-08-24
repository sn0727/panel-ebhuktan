/*
 * @Author: Devesh Agnihotri
 * @Date: 2019-09-19 18:45:29
 * @Last Modified by: Devesh Agnihotri
 * @Last Modified time: 2019-09-25 18:18:29
 */

import React, { useState, useEffect } from 'react';

import DropDown from './dropdown';

function App() {
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState();
  const [perPage, setPerPage] = useState();
  const [dropDown, setDropDown] = useState(2);

  async function fetchData(page, dropDownValue) {
    const apiData = await fetch(
      `https://reqres.in/api/users?page=${page}&per_page=${dropDownValue}`
    );
    apiData
      .json()
      .then(
        value => (
          setPage(page),
          setTableData(value.data),
          setCurrentPage(value.page),
          setTotal(value.total),
          setPerPage(value.per_page),
          setDropDown(dropDownValue)
        )
      );
  }
  useEffect(() => {
    fetchData();
  }, []);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  const handlePagination = (id, limit) => {
    if (id !== len || id !== 0) {
      setCurrentPage(id);
      fetchData(id, limit);
    } else {
      setCurrentPage(currentPage);
    }
  };

  const renderPageNumbers = pageNumbers.map(id => {
    let limit = dropDown;
    return (
      <span key={id} onClick={() => handlePagination(id, limit)}>
        {id}
      </span>
    );
  });

  let len = renderPageNumbers.length;
  const handleNextClick = (currentPage, dropDown) => {
    if (currentPage <= renderPageNumbers.length) {
      setCurrentPage(currentPage);
      fetchData(currentPage, dropDown);
    }
  };

  return (
    <div className="App">
      <header className="App-header">React Pagination</header>
      <div className="App-dropDown">
        <DropDown
          className="dropDown-Item"
          fetchData={dropdownValue => {
            fetchData(page, Number(dropdownValue));
          }}
        />
      </div>
      <div className="App-table">
        <table className="table-container">
          <thead>
            <tr>
              <th>
                <h5>Id </h5>
              </th>
              <th>
                <h5>E-mail</h5>
              </th>
              <th>
                <h5>First Name</h5>
              </th>
              <th>
                <h5>Last Name</h5>
              </th>
              <th>
                <h5>Images</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.length !== 0 ? (
              tableData.map(value => (
                <tr>
                  <td>{value.id}</td>
                  <td>{value.email}</td>
                  <td>{value.first_name}</td>
                  <td>{value.last_name}</td>
                  <td style={{ height: 40, width: 30 }}>
                    <img src={value.avatar} height={50} width={50} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No More Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div id="pagination">
        <span onClick={() => handleNextClick(currentPage - 1, dropDown)}>
          &laquo;
        </span>
        {renderPageNumbers}
        <span onClick={() => handleNextClick(currentPage + 1, dropDown, len)}>
          &raquo;
        </span>
      </div>
    </div>
  );
}

export default App;
