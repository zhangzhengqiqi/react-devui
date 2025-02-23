import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { DAlert, DButton, DCard, DTable, DTag } from '@react-devui/ui';

import { useACL } from '../../../../core';
import { AppRouteHeader } from '../../../components';
import styles from './ACL.module.scss';

export default function ACL(): JSX.Element | null {
  const acl = useACL();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <AppRouteHeader>
        <AppRouteHeader.Breadcrumb />
        <AppRouteHeader.Header />
      </AppRouteHeader>
      <div className={styles['app-acl']}>
        <DAlert dTitle={t('routes.test.acl.Switch between different users to compare effects')} dType="info"></DAlert>
        <DTable dBorder>
          <table>
            <caption>{t('routes.test.acl.ACL Data')}</caption>
            <tbody>
              <tr>
                <DTable.Th>Full</DTable.Th>
                <DTable.Td>{String(acl.full)}</DTable.Td>
              </tr>
              <tr>
                <DTable.Th>Controls</DTable.Th>
                <DTable.Td>{acl.controls.join(', ') || '-'}</DTable.Td>
              </tr>
              <tr>
                <DTable.Th>ControlMode</DTable.Th>
                <DTable.Td>{acl.controlMode}</DTable.Td>
              </tr>
            </tbody>
          </table>
        </DTable>
        <DCard>
          <DCard.Content>
            <div className={styles['app-acl__button-container']}>
              {[0, 1].map((control) => (
                <React.Fragment key={control}>{acl.can(control) && <DTag dTheme="primary">control-{control}</DTag>}</React.Fragment>
              ))}
            </div>
          </DCard.Content>
        </DCard>
        <DCard>
          <DCard.Content>
            <DButton
              onClick={() => {
                navigate('/dashboard/amap');
              }}
            >
              {t('routes.test.acl.Test Route Guard')}
            </DButton>
          </DCard.Content>
        </DCard>
      </div>
    </>
  );
}
