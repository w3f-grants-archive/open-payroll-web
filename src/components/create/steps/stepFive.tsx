import React, { useEffect, useState, useContext } from 'react';

import Button from '../../generals/button';
import Text from '../../generals/text';

import { Podkova } from 'next/font/google';
import { CreateContext } from '@/context/create';
import { DappContext } from '@/context';
import {
  asContractInstantiatedEvent,
  formatEventName,
  isContractInstantiatedEvent,
  isExtrinsicFailedEvent,
} from 'useink/utils';
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
    check,
    deploy,
    C,
    D,
    S,
    M,
  } = createContext;
  const { chainSymbol } = context;

  //---------------------------------UI---------------------------------
  return (
    <div className="flex flex-col gap-[40px]">
      <div className="flex flex-col gap-[20px]">
        <div className="flex justify-between items-baseline">
          <Text type="h2" text="Confirm the contract" />
          <Text type="h6" text="final" />
        </div>
        <div className="">
          <Text type="" text="Make sure that all the data you entered is correct to finish." />
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-[40px]">
          {/* ---------------------------------Contract--------------------------------- */}
          <div className="flex flex-col gap-[20px] md:order-1">
            <Text type="h4" text="Contract" />
            <div className="flex flex-col w-full justify-between gap-[20px]">
              <div className="flex flex-col gap-[10px] w-full">
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
              <div className="flex flex-col gap-[10px] w-full">
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
              <div className="flex flex-col gap-[10px] w-full">
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
                <Text type="h6" text="Periodicity" />
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

          {/* ---------------------------------Multipliers--------------------------------- */}
          <div className="flex flex-col gap-[20px] md:order-3">
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
                  <Button type="text" text="" icon="delete" action={() => handleRemoveInitialBaseMultiplier(i)} />
                </div>
              </div>
            ))}
          </div>

          {/* ---------------------------------Funds--------------------------------- */}
          <div className="flex flex-col gap-[20px] md:border-l-2 md:border-oppurple md:pl-[40px] md:order-2">
            <Text type="h4" text="Funds" />
            <div className="flex flex-col gap-[20px]">
              <Text type="h6" text={`Minimum funds necesaries: ${totalToPay} DOT`} />
              <Button type="active" text="add funds" icon="add" action />
            </div>
          </div>
          {/* ---------------------------------Beneficiaries--------------------------------- */}
          <div className="flex flex-col gap-[20px] md:order-4 col-span-2">
            <Text type="h4" text="Beneficiaries" />
            <div className="flex flex-col gap-[10px] overflow-x-auto">
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
              <div className="flex flex-col gap-[5px] pb-1">
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
                  </div>
                ))}
              </div>
            </div>
            <hr className="border rounded my-[10px] w-full"></hr>
            <div className="flex justify-between">
              <Text type="h4" text="Total pay" />
              <Text type="h4" text={`${totalToPay} ${chainSymbol}`} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex flex-col items-center justify-center">
          <div className="rounded-lg bg-white/5 p-4 mt-6 w-full">
            <h3 className="uppercase font-semibold font-xs">Dry Run Results</h3>

            {D.contractAddress && (
              <hgroup>
                <h4 className="test-xs">Contract Address</h4>
                <h3 className="test-sm">{D.contractAddress}</h3>
              </hgroup>
            )}
            <div className="mt-6">
              <div>M.error: {M.error}</div>
            </div>
            {D.gasConsumed && (
              <div className="mt-6">
                <h3 className="test-xs uppercase font-semibold">Gas Consumed</h3>
                <ul className="p-0 list-none">
                  <li>refTime: {D.gasConsumed.refTime.toString()}</li>
                  <li>proof size: {D.gasConsumed.proofSize.toString()}</li>
                </ul>
              </div>
            )}

            {D.gasRequired && (
              <div className="mt-6">
                <h3 className="test-xs uppercase font-semibold">Gas Required</h3>
                <ul className="p-0 list-none">
                  <li>refTime: {D.gasRequired.refTime.toString()}</li>
                  <li>proof size: {D.gasRequired.proofSize.toString()}</li>
                </ul>
              </div>
            )}

            {D.storageDeposit && (
              <div className="mt-6">
                <ul className="p-0 list-none">
                  <li>Storage Deposit: {D.storageDeposit.toString()}</li>
                </ul>
              </div>
            )}

            {D.error && <p className="text-md text-error-500 text-center mx-auto mt-6">{D.error}</p>}

            {D.events?.length > 0 && (
              <div className="mt-6 w-full">
                <h3 className="text-sm">Events</h3>
                <ul>
                  {D.events.map((event: any) => (
                    <li key={event.toString()} className="bg-oplightpurple">
                      {isContractInstantiatedEvent(event) ? (
                        <div>
                          <h4 className="font-bold">{formatEventName(event)}</h4>
                          <h4>Deployer: {asContractInstantiatedEvent(event)?.deployer}</h4>

                          <h4>Contract Address: {asContractInstantiatedEvent(event)?.contractAddress}</h4>
                        </div>
                      ) : (
                        formatEventName(event)
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button type="button" onClick={() => check()} className="flex items-center w-full ">
            Check
          </button>
          <button type="button" onClick={() => deploy()} className="flex items-center w-full ">
            Deploy
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepFive;
