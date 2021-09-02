
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { isFunction } from 'lodash';
import { MouseEvent } from 'react';

import { ModalContextType, ModalData, ModalDataProps } from '../../interfaces/providers/dom/modal';

import { useModal } from '../../providers/dom/modal';

import './modal.scss';

// -----------------------------------------------------------------------------
//   Component
// -----------------------------------------------------------------------------

export default function Modal({ active, info }: ModalDataProps): JSX.Element {
  const getModal: ModalContextType = useModal();
  const actionConfirmNo = async (event: MouseEvent<HTMLAnchorElement>): Promise<void> => {
    event.preventDefault();

    try {
      if (isFunction(info?.cancel)) {
        await info?.cancel(getModal?.data as ModalData);
      }
    } catch (error) {
      getModal?.hide(getModal?.data);
    }
  };
  const actionConfirmYes = async (event: MouseEvent<HTMLAnchorElement>): Promise<void> => {
    event.preventDefault();

    try {
      if (isFunction(info?.done)) {
        await info?.done(getModal?.data as ModalData);
      }
    } catch (error) {
      getModal?.hide(getModal?.data);
    }
  };
  const actionAgree = async (event: MouseEvent<HTMLAnchorElement>): Promise<void> => {
    event.preventDefault();

    try {
      if (isFunction(info?.done)) {
        await info?.done(getModal?.data as ModalData);
      }
    } catch (error) {
      getModal?.hide(getModal?.data);
    }
  };
  const actionClose = async (event: MouseEvent<HTMLDivElement>): Promise<void> => {
    if (event.currentTarget.classList.contains('modal')) {
      getModal?.hide(getModal?.data);
    }
  };

  return (
    <div
      className={`modal flex items-center justify-center${active ? ' active' : ''}`}
      onClick={actionClose}
    >
      <div className="modal-container">
        <div className="modal-content">
          <div className="icon-container text-left">
            
            <h3 className="dark-text text-lg font-bold"> { info.title } </h3>
          </div>
          <div className="text font-semibold mb-9 mt-6 text-left">
            {info?.text}
          </div>
          <div className="actions font-semibold text-center">
            {info?.type === 'confirm' ? (
              <>
                <a href="/#" className="link type-cancel" onClick={actionConfirmNo}>No</a>
                <a href="/#" className="link type-success" onClick={actionConfirmYes}>Si</a>
              </>
            ) : (
              <a href="/#" className="link type-agree" onClick={actionAgree}>Aceptar</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
