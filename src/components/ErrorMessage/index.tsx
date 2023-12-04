interface Props {
  message: string;
}
const ErrorMessage: React.FC<Props> = ({ message }) => {
  return <p className="text-red-500">{message}</p>;
};

export default ErrorMessage;
