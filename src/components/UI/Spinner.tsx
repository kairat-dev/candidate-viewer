export function Spinner() {
  return (
    <div className="flex justify-center items-center py-20">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"
        role="status"
        aria-label="Загрузка"
      />
    </div>
  );
}
