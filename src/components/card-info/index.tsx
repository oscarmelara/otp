
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { isEmpty, isString } from 'lodash';
import { ReactNode, useMemo } from 'react';

import {
  CardInfoByValuesItem,
  CardInfoDataTypes,
  CardInfoProps,
} from '../../interfaces/card-info';

import './card-info.scss';

// -----------------------------------------------------------------------------
//   Component
// -----------------------------------------------------------------------------

export default function CardInfo({
  data,
  icon,
  title,
  type,
}: CardInfoProps): JSX.Element {
  const cardClasses: string = useMemo((): string => {
    const items: Array<string> = ['card-info'];

    if (!isEmpty(type)) {
      items.push(`type-${type}`);
    }

    return items.join(' ');
  }, [type]);
  const items: Array<ReactNode> = useMemo((): Array<ReactNode> => {
    const innerList: Array<ReactNode> = [];

    if (!isEmpty(data)) {
      data?.forEach((item: CardInfoDataTypes, indexA: number): void => {
        switch (true) {
          case ['big-title', 'title', 'sub-title', 'description'].includes(item.type):
            if (isString(item.value)) {
              const classes: Array<string> = [];

              if (item.type === 'big-title') {
                classes.push('big-title');
                classes.push('font-bold');
              } else if (item.type === 'title') {
                classes.push('title');
                classes.push('font-bold');
              } else if (item.type === 'sub-title') {
                classes.push('sub-title');
              } else if (item.type === 'description') {
                //
              }

              innerList.push((
                <div
                  className={classes.join(' ')}
                  key={`${indexA}`}
                >{item.value}</div>
              ));
            }
            break;
          case item.type === 'list':
            if (!isEmpty(item.value)) {
              const subItems = item.value as Array<string>;

              subItems.forEach((subItem: string, indexB: number): void => {
                innerList.push((
                  <div key={`${indexA}-${indexB}`}>{subItem}</div>
                ));
              });
            }
            break;
          case item.type === 'info':
            if (!isEmpty(item.value)) {
              const subItems = item.value as Array<CardInfoByValuesItem>;

              subItems.forEach((subItem: CardInfoByValuesItem, indexB: number): void => {
                innerList.push((
                  <div key={`${indexA}-${indexB}`}>
                    <span className="font-bold">{subItem.title}:</span> {subItem.value}
                  </div>
                ));
              });
            }
            break;
          default:
        }
      });
    }

    return innerList;
  }, [data]);

  return (
    <div className={cardClasses}>
      <div className="card-info-header flex items-center">
        {(!isEmpty(icon) && isString(icon)) && (
          <div className="icon-container">
            <img src={`/assets/icons/card/${icon}.png`} className="img-icon" alt="Icon" />
          </div>
        )}
        <div className="title font-semibold">{title}</div>
      </div>
      {!isEmpty(items) && (
        <div className="card-info-content">
          {items}
        </div>
      )}
    </div>
  );
}
