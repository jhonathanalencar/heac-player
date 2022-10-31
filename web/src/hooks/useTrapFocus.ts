import { RefObject, useEffect } from "react";

interface UseTrapFocusProps{
  elementRef: RefObject<HTMLElement>;
  firstElementRef: RefObject<HTMLElement>;
  focusableElementsQuery: string;
}

export function useTrapFocus({ 
  elementRef, 
  firstElementRef,
  focusableElementsQuery,
}: UseTrapFocusProps){

  useEffect(() =>{
    firstElementRef.current?.focus();
  }, []);

  function keyDownHandler(event: KeyboardEvent){
    if(event.key !== 'Tab'){ return; }

    const focusableElements = elementRef.current?.querySelectorAll(focusableElementsQuery);
    
    if(focusableElements){
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if(!event.shiftKey && document.activeElement === lastElement){
        (firstElement as HTMLElement).focus();
        event.preventDefault();
      }

      if(event.shiftKey && document.activeElement === firstElement){
        (lastElement as HTMLElement).focus();
        event.preventDefault();
      }
    }
  }  

  useEffect(() =>{
    elementRef.current?.addEventListener('keydown', keyDownHandler);

    return () =>{
      elementRef.current?.removeEventListener('keydown', keyDownHandler);
    }
  }, []);
}