import { useSelector } from "react-redux";

import { selectMultiFormState } from "../../../../redux/features/multiForm/multiFormSlice";

import { VideoInput } from "../VideoInput";
import { TitleInput } from "../TitleInput";
import { ImageInput } from "../ImageInput";

export function FormInputs(){
  const { page } = useSelector(selectMultiFormState);

  const inputs: { [key: number]: JSX.Element } = {
    0: <VideoInput />,
    1: <TitleInput />,
    2: <ImageInput />
  }

  const content = inputs[page];

  return(
    content
  )
}