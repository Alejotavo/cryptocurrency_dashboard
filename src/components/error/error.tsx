
type ErrorComponentProps = {
  message: string;
};

function ErrorComponent({ message }: ErrorComponentProps) {

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
      <p>{message}</p>
    </div>
  );
}
export default ErrorComponent;