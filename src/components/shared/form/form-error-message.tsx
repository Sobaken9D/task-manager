interface Props {
  errorMessage: string;
}

export const FormErrorMessage = ({errorMessage}: Props) => {

  return (
    <p className="text-sm font-medium text-center text-red-500 animate-in fade-in-50 duration-200">
      {errorMessage}
    </p>
  );
}