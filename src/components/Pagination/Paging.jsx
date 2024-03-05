// Paging.jsx
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const Paging = ({ pageCount, onPageChange, onPageSizeChange, totalItems }) => {
  const [inputPage, setInputPage] = useState(1);
  const [pageSize, setPageSize] = useState(1); // Default page size

  useEffect(() => {
    setInputPage(1); // Reset inputPage when totalItems changes
  }, [totalItems]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    console.log("Input value:", inputValue);
    setInputPage(inputValue);
  };

  const handlePageSubmit = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(inputPage, 10);
    console.log("Page submitted:", pageNumber);
    if (pageNumber >= 1 && pageNumber <= pageCount) {
      onPageChange({ selected: pageNumber - 1 });
    }
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    console.log("Page size changed:", newSize);
    setPageSize(newSize);
    onPageSizeChange(newSize);
  };

  const handlePageChange = (selected) => {
    onPageChange(selected);
  };

  return (
    <div className="cx_paging d-flex justify-content-between align-items-center">
      <div className="col-auto">
        Total: <b>{totalItems}</b>
      </div>
      <form onSubmit={handlePageSubmit} className="col align-self-end">
        <div className="row">
          <div className="col-12">
            <div className="row flex-nowrap justify-content-end align-items-center">
              <div className="col-auto">
                <div className="input-group input-group-sm align-items-center">
                  <label className="me-2">Go to</label>
                  <input
                    min="1"
                    max={pageCount}
                    value={inputPage}
                    onChange={handleInputChange}
                    className="form-control col-fixed-w30 rounded-start border-end-0 pe-0"
                  />
                  <label className="input-group-text rounded-end bg-white border-start-0 ps-0">/{pageCount} </label>
                  <button
                    type="submit"
                    className="btn btn-light border rounded ms-1"
                  >
                    Go
                  </button>
                </div>
              </div>
              <div className="col-auto pe-0">
                <div className="input-group input-group-sm align-items-center gap-1">
                  <label>View</label>
                  <select
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className="form-select col-fixed-w90 rounded"
                  >
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              </div>
              <div className="col-auto">
                <ReactPaginate
                  // pageCount={pageCount}
                  pageCount={0}
                  pageRangeDisplayed={0}
                  marginPagesDisplayed={0}
                  onPageChange={handlePageChange}
                  containerClassName={"pagination pagination-sm mb-0 d-none d-lg-flex"}
                  activeClassName={"active"}
                  previousLabel={<IconChevronLeft size={18} />}
                  nextLabel={<IconChevronRight size={18} />}
                  previousClassName={"page-item"} // Add your custom class for Previous button
                  nextClassName={"page-item"} // Add your custom class for Next button
                  previousLinkClassName={"page-link"} // Add your custom class for Previous button link
                  nextLinkClassName={"page-link"} // Add your custom class for Next button link
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Paging;
