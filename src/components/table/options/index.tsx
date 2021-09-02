import { isBoolean, isFunction, isEmpty } from 'lodash';
import { MouseEvent } from 'react';
import { Link } from "react-router-dom";




export default function Options({ data }:any): JSX.Element | null {
    if(isEmpty(data)) {
        return null;
    }
    return (
        <div className="flex">
            { data.map(( item: any, index: number ): JSX.Element => (
                <Link 
                    to={item.link}
                    key={index}
                    className="mr-2"
                    onClick={(event: MouseEvent<HTMLAnchorElement>): void => {
                        if (isBoolean(item.preventDefault) && item.preventDefault === true) {
                        event.preventDefault();
                        }
        
                        if (isFunction(item.callback)) {
                        item.callback(item);
                        }
                    }}
                >
                    <i className={` ${item.icon} text-lg`}></i>
                </Link>     
            ))}
            {/* <button className="mr-3"><i className="far fa-edit"></i> Editar </button>
            <button><i className="far fa-trash-alt"></i> Eliminar</button> */}
        </div>
    );
    
}