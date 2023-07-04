import React, { useEffect, useState, useContext } from 'react';

import Button from '../../generals/button';
import Text from '../../generals/text';

import { Podkova } from 'next/font/google';
import { CreateContext } from '@/context/create';
import { DappContext } from '@/context';
const podkova = Podkova({ subsets: ['latin'] });

const StepFive = () => {
  const [periodicityType, setPeriodicityType] = useState<string>('fixed');
  const context = useContext(DappContext);
  const createContext = useContext(CreateContext);
  if (!context) {
    return null;
  }
  if (!createContext) {
    return null;
  }

  const {
    contractName,
    setContractName,
    ownerEmail,
    setOwnerEmail,
    basePayment,
    setBasePayment,
    setPeriodicity,
    periodicity,
    initialBaseMultipliers,
    handleChangeInitialBaseMultiplier,
    handleRemoveInitialBaseMultiplier,
    initialBeneficiaries,
    addInitialBeneficiary,
    removeInitialBeneficiary,
    handleChangeInitialBeneficiary,
    handleChangeMultiplierInitialBeneficiary,
    getTotalMultiplierByBeneficiary,
    getFinalPayByBeneficiary,
    calculateTotalToPay,
    totalToPay,
  } = createContext;
  const { chainSymbol } = context;

  //---------------------------------UI---------------------------------
  return (
    <div className="">
      <div>
        <div className="flex justify-between items-center">
          <Text type="h2" text="Confirm the contract" />
          <Text type="h6" text="final" />
        </div>
        <div className="">
          <Text type="" text="Make sure that all the data you entered is correct to finish." />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full">
          <form className="flex flex-col gap-[40px]">
            {/* ---------------------------------Contract--------------------------------- */}
            <div className="flex flex-col md:flex-row gap-[30px] md:gap-[20px]">
              <div className="grid grid-cols-1 gap-[10px] w-full md:w-8/12">
                <Text type="h4" text="Contract" />
                <div className="flex flex-col md:flex-row w-full justify-between gap-[15px]">
                  <div className="flex flex-col w-full">
                    <Text type="h6" text="Contract name" />
                    <input
                      value={contractName}
                      type="text"
                      name="contractName"
                      id="contractName"
                      className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                      onChange={(e) => setContractName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <Text type="h6" text="Email" />
                    <input
                      value={ownerEmail}
                      type="email"
                      name="ownerEmail"
                      id="ownerEmail"
                      className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                      onChange={(e) => setOwnerEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row w-full justify-between gap-[15px]">
                  <div className="flex flex-col w-full">
                    <Text type="h6" text="Base payment" />
                    <div className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 flex">
                      <input
                        type="number"
                        name="basePayment"
                        min={0}
                        step={0.01}
                        value={basePayment}
                        id="basePayment"
                        className="bg-opwhite without-ring w-full"
                        onChange={(e) => {
                          setBasePayment(e.target.value);
                        }}
                      />
                      <p className="mx-5">DOT</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[10px] w-full">
                    <div className="flex flex-col gap-[10px]">
                      <Text type="h6" text="Periodicity***" />
                      <div className="flex gap-[10px]">
                        {periodicityType === 'fixed' ? (
                          <Button type="active" text="fixed" action={() => setPeriodicityType('fixed')} />
                        ) : (
                          <Button type="outlined" text="fixed" action={() => setPeriodicityType('fixed')} />
                        )}
                        {periodicityType === 'custom' ? (
                          <Button type="active" text="custom" action={() => setPeriodicityType('custom')} />
                        ) : (
                          <Button type="outlined" text="custom" action={() => setPeriodicityType('custom')} />
                        )}
                      </div>
                      <div className="flex">
                        {periodicityType === 'fixed' ? (
                          <select
                            name="periodicity"
                            onChange={(e) => {
                              setPeriodicity(e.target.value);
                            }}
                            className="w-full bg-opwhite border-2 border-oppurple rounded-[5px] py-2.5 px-1.5 flex"
                          >
                            <option value="7200">Daily</option>
                            {/* x 5 days */}
                            <option value="36000">Weekly</option>
                            {/* x 30 days */}
                            <option value="216000">Monthly</option>
                          </select>
                        ) : (
                          <input
                            value={periodicity}
                            type="number"
                            min={1}
                            step={1}
                            name="periodicity"
                            className="w-full bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 flex"
                            onChange={(e) => {
                              setPeriodicity(e.target.value);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* ---------------------------------Multipliers--------------------------------- */}
                <div className="flex flex-col gap-[10px]">
                  <Text type="h4" text="Multipliers" />
                  {initialBaseMultipliers?.map((multiplier: any, i: number) => (
                    <div key={i} className="flex gap-[10px]">
                      <input
                        type="text"
                        value={multiplier}
                        onChange={(e) => handleChangeInitialBaseMultiplier(i, e.target.value)}
                        className="bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5"
                      />
                      <div>
                        <Button
                          type="outlined"
                          text=""
                          icon="delete"
                          action={() => handleRemoveInitialBaseMultiplier(i)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ---------------------------------Funds--------------------------------- */}
              <div className="flex flex-col gap-[10px] md:border-l-2 md:border-oppurple md:pl-[20px]">
                <Text type="h4" text="Funds" />
                <div className="flex flex-col gap-[20px]">
                  <Text type="h6" text={`Minimum funds necesaries: ${totalToPay} DOT`} />
                  <Button type="outlined" text="add funds" icon="add" action />
                </div>
              </div>
            </div>
            {/* ---------------------------------Beneficiaries--------------------------------- */}
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-[10px]">
                <Text type="h4" text="Beneficiaries" />
                <Text type="h6" text={`Base payment: ${basePayment} ${chainSymbol}`} />
              </div>
              <div className="flex flex-col gap-[10px] overflow-x-auto pb-5">
                {/* Header table row */}
                <div className="flex gap-[20px] text-left w-fit md:w-12/12">
                  <div className="w-[150px]">
                    <Text type="overline" text="name" />
                  </div>
                  <div className="w-[150px]">
                    <Text type="overline" text="address" />
                  </div>
                  {initialBaseMultipliers.map((m: any, i: number) => (
                    <div key={'mh' + i} className="w-[150px]">
                      <Text type="overline" text={m} />
                    </div>
                  ))}
                  <div className="w-[150px]">
                    <Text type="overline" text="total multipliers" />
                  </div>
                  <div className="w-[150px]">
                    <Text type="overline" text="final pay" />
                  </div>
                  <div className="w-[150px]"></div>
                </div>
                {/* Beneficiarie row */}
                <form className="flex flex-col gap-[5px]">
                  {initialBeneficiaries.map((b: any, bIndex: any) => (
                    <div key={'b' + bIndex} className="flex gap-[20px] text-left w-fit items-center">
                      <div className="w-[150px]">
                        <input
                          className="w-full bg-opwhite border-2 rounded-[5px] p-1"
                          type="text"
                          value={initialBeneficiaries[bIndex]?.name!}
                          placeholder="Name"
                          name="name"
                          onChange={(e) => handleChangeInitialBeneficiary(bIndex, e)}
                        />
                      </div>
                      <div className="w-[150px]">
                        <input
                          className="w-full bg-opwhite border-2 rounded-[5px] p-1"
                          type="text"
                          placeholder="Address"
                          value={initialBeneficiaries[bIndex]?.address!}
                          name="address"
                          onChange={(e) => handleChangeInitialBeneficiary(bIndex, e)}
                        />
                      </div>
                      {initialBaseMultipliers.map((bm: any, mIndex: any) => (
                        <div key={'bm' + mIndex} className="w-[150px]">
                          <input
                            className="w-full bg-opwhite border-2 border-oppurple rounded-[5px] p-1"
                            type="number"
                            value={initialBeneficiaries[bIndex]?.multipliers[mIndex][1]!}
                            name={mIndex}
                            onChange={(e) => handleChangeMultiplierInitialBeneficiary(bIndex, mIndex, e)}
                          />
                        </div>
                      ))}
                      <div className="w-[150px]">
                        <p>{getTotalMultiplierByBeneficiary(bIndex)}</p>
                      </div>
                      <div className="w-[150px]">
                        <p>{getFinalPayByBeneficiary(bIndex)}</p>
                      </div>
                      <div className="w-[100px]">
                        <Button type="text" text="" icon="delete" action={() => removeInitialBeneficiary(bIndex)} />
                      </div>
                    </div>
                  ))}
                </form>

                <hr className="border rounded my-[10px] w-full"></hr>
                <div className="flex w-full md:w-9/12 justify-between px-1">
                  <Text type="h4" text="Total pay" />
                  <Text type="h4" text={`${calculateTotalToPay()} ${chainSymbol}`} />
                </div>
                <div className="w-[200px]">
                  <Button type="outlined" text="add other" icon="add" action={() => addInitialBeneficiary()} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StepFive;
