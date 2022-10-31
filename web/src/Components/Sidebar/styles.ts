import styled from "styled-components";

interface SidebarContainerProps{
  isOpen: boolean;
}

export const SidebarContainer = styled.aside<SidebarContainerProps>`
  background-color: rgba(87,74,226, 0.7);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 1rem;
  height: 100vh;
  
  transform: ${(props) => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  animation: ${(props) => props.isOpen ? 'slideRight' : 'slideLeft'} 0.5s ease-in-out;

  @keyframes slideRight{
    from{
      transform: translateX(-100%);
    }
    to{
      transform: translateX(0);
    }
  }

  @keyframes slideLeft{
    from{
      transform: translateX(0);
    }
    to{
      transform: translateX(-100%);
    }
  }

  strong{
    color: ${(props) => props.theme['gray-200']};
    font-weight: bold;
  }

  nav{
    ul{
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      li{
        a{
          svg{
            color: ${(props) => props.theme['gray-100']};
            width: 1.75rem;
            height: 1.75rem;
            transition: color 0.3s ease;

            &:hover{
              color: ${(props) => props.theme['red-200']};
            }

            &.active{
              color: ${(props) => props.theme['red-200']};
            }
          }
        }
      }
    }
  }
`;

export const ToggleButton = styled.button`
  position: absolute;
  top: 1rem;
  right: -2rem;
  display: inline-flex;
  border: none;
  border-bottom-right-radius: 50%;
  border-top-right-radius: 50%;
  background-color: rgba(87,74,226, 0.7);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  padding: 0.25rem;
  padding-left: 0;
  cursor: pointer;
  
  svg{
    width: 1.75rem;
    height: 1.75rem;
    color: ${(props) => props.theme['gray-100']};
    transition: color 0.3s ease;

    &:hover{
      color: ${(props) => props.theme['red-200']};
    }
  }
`;