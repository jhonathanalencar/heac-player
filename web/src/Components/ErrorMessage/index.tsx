import { ErrorMessageContainer } from './styles';

interface ErrorMessageProps{
  message?: string;
}

export function ErrorMessage({ message = 'Something went wrong. Please try again.' }: ErrorMessageProps){
  return(
    <ErrorMessageContainer>
      <h1>{message}</h1>
    </ErrorMessageContainer>
  )
}