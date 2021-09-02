import { isEmpty, isString } from "lodash";
import { MouseEvent } from 'react'
import { withRouter } from "react-router";

import { MainHeaderProps } from '../../interfaces/main-header'

function Header({ children, back, title, lastPage }: MainHeaderProps): JSX.Element {
  const isValidValue: boolean = isString(back) && !isEmpty(back);
  const backAction = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();

    if (isValidValue) {
      window.location.href = back as string;
    }
  }
      
    return(
        <div className="wrapper-header flex flex-col md:flex-row items-center md:items-start">
        <div className="wrapper-header-content flex flex-col md:flex-row items-center md:items-start">
          {back && (
            <a href={isValidValue ? back : '/#'} className="text-lg font-bold dark-text opacity-70" onClick={backAction}>
              { lastPage } <i className="fas fa-angle-right mx-2"></i>
            </a>
          )}
          <div className="main-header">
            <h1 className=" text-lg font-bold dark-text">{ title }</h1>
          </div>
        </div>
        {children}
      </div>  
    )
}

export default withRouter(Header);