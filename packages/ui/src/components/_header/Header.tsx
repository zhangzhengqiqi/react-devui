import type { DButtonProps } from '../button';

import React, { useState } from 'react';

import { CloseOutlined } from '@react-devui/icons';
import { getClassName } from '@react-devui/utils';

import { DButton } from '../button';
import { usePrefixConfig, useTranslation } from '../root';

export interface DHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  dClassNamePrefix: string;
  dActions: React.ReactNode[];
  dCloseProps: DButtonProps | undefined;
  dAriaLabelledby: string | undefined;
  onCloseClick: (() => void | false | Promise<void | false>) | undefined;
  onClose: (() => void) | undefined;
}

export function DHeader(props: DHeaderProps): JSX.Element | null {
  const {
    children,
    dClassNamePrefix,
    dActions,
    dCloseProps,
    dAriaLabelledby,
    onCloseClick,
    onClose,

    ...restProps
  } = props;

  //#region Context
  const dPrefix = usePrefixConfig();
  //#endregion

  const prefix = `${dPrefix}${dClassNamePrefix}`;

  const [t] = useTranslation();

  const [closeLoading, setCloseLoading] = useState(false);

  const closeProps: DHeaderProps['dCloseProps'] = {
    ...dCloseProps,
    dLoading: dCloseProps?.dLoading || closeLoading,
    onClick: () => {
      const shouldClose = onCloseClick?.();
      if (shouldClose instanceof Promise) {
        setCloseLoading(true);
        shouldClose.then((val) => {
          setCloseLoading(false);
          if (val !== false) {
            onClose?.();
          }
        });
      } else if (shouldClose !== false) {
        onClose?.();
      }
    },
  };

  return (
    <div {...restProps} className={getClassName(restProps.className, `${prefix}__header`)}>
      <div id={dAriaLabelledby} className={`${prefix}__header-title`}>
        {children}
      </div>
      <div className={`${prefix}__header-actions`}>
        {React.Children.map(dActions, (action) =>
          action === 'close' ? (
            <DButton
              {...closeProps}
              key="$$close"
              aria-label={closeProps['aria-label'] ?? t('Close')}
              dType={closeProps.dType ?? 'text'}
              dIcon={closeProps.dIcon ?? <CloseOutlined />}
            ></DButton>
          ) : (
            action
          )
        )}
      </div>
    </div>
  );
}
