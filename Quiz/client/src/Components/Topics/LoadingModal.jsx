const LoadingModal = ({ loading, message }) => {
  return (
    <div>
      <dialog
        id="loadModal"
        className="modal modal-middle"
        open={loading || !!message}
      >
        <div className="modal-box">
          {loading ? (
            <div className="flex flex-col justify-center items-center mt-10">
              <span className="loading loading-bars loading-lg text-blue-500"></span>
              <h2 className="text-lg font-semibold mt-4 text-gray-700">
                Our AI is making your content...
              </h2>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Please wait while we process your request. This may take a moment.
              </p>
            </div>
          ) : (
            <div className="text-center">
              <h4 className="text-lg py-4 text-green-600 font-semibold">
                {message}
              </h4>
              <p className="text-sm text-gray-500 mb-4">
                Thank you for your patience. Your content is ready!
              </p>
              <div className="modal-action">
                <button
                  className="btn btn-primary"
                  onClick={() => window.location.reload()}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};


export default LoadingModal;