import { useRouteError } from "react-router-dom";
export default function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <div className="d-flex flex-column flex-center flex-column-fluid">
        <div className="d-flex flex-column flex-center text-center p-10">
          <div className="card card-flush w-lg-650px py-5">
            <div className="card-body py-15 py-lg-20">
              <h1 className="fw-bolder fs-2hx text-gray-900 mb-4">Oops!</h1>
              <p>Sorry, an unexpected error has occurred.</p>
              <div className="fw-semibold fs-6 text-gray-500 mb-7">
                {error.statusText || error.message}
              </div>
              <div className="mb-3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
