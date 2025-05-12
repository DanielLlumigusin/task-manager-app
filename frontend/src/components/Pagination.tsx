type Props = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, setCurrentPage }: Props) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-6">
      <button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 text-sm rounded ${
            currentPage === i + 1
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
