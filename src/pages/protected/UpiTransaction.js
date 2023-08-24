import React from 'react';
import UpiTransactionContent from '../../features/upi/UpiTransactionContent';
import DynamicTitle from '../../components/dynamic_title';

const UpiTransaction = () => {
  return (
    <>
    <DynamicTitle pageTitle={"Send Via Upi"} />
        <UpiTransactionContent />
    </>
  )
}

export default UpiTransaction