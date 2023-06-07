import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Text from "../generals/text";

import { AiOutlineLoading } from "react-icons/ai";

import { Archivo } from "next/font/google";
const archivo = Archivo({ subsets: ["latin"] });

import { useApi, useBlockHeader, useCall, useContract } from "useink";

import metadata from "@/contract/open_payroll.json";
import { pickDecoded } from "useink/utils";

interface BeneficiarieRowProps {
  i: number;
  b: string;
}

const BeneficiarieRow = ({ i, b }: BeneficiarieRowProps) => {
  //---------------------------------Get contract address---------------------------------
  const router = useRouter();
  const {
    query: { contract },
  } = router;

  //---------------------------------Connect to contract---------------------------------
  const blockHeader = useBlockHeader();
  const _contract = useContract(contract, metadata, "rococo-contracts-testnet");
  //---------------------------------Api---------------------------------
  const api = useApi("rococo-contracts-testnet");
  const chainInfo = api?.api.registry.getChainProperties().toHuman();
  //api.rpc.system.chain

  //---------------------------------UseStates---------------------------------
  const [loading, setLoading] = useState<"loading" | "done" | "error">("done");
  const [basePayment, setBasePayment] = useState<any | null>(null);
  const [beneficiary, setBeneficiary] = useState<any | null>(null);
  const [sumMultipiers, setSumMultipliers] = useState<any | null>(null);

  //---------------------------------Get from contract---------------------------------
  const getBeneficiary = useCall<any | undefined>(
    _contract?.contract,
    "getBeneficiary"
  );

  // 💰 Get base payment from contract
  const getBasePayment = useCall<any | undefined>(
    _contract?.contract,
    "getBasePayment"
  );

  const seeBeneficiary = async () =>
    setBeneficiary(pickDecoded(await getBeneficiary.send([b])));

  const seeBasePayment = async () => {
    const basePayment = pickDecoded(await getBasePayment.send());
    basePayment !== undefined &&
      setBasePayment(parseInt(basePayment.replace(/,/g, "")));
  };
  //---------------------------------Calculate total multipliers---------------------------------

  const getTotalMultipliers = (mult: number[]) => {
    if (mult.length === 0) {
      setSumMultipliers(1);
    } else {
      const totalMult = mult.reduce(
        (accumulator, currentMultiplier) => accumulator + currentMultiplier,
        0
      );
      setSumMultipliers(totalMult);
    }
  };
  //---------------------------------Truncate numbers---------------------------------
  function trunc(x: number, p = 0) {
    var s = x.toString();
    var l = s.length;
    var decimalLength = s.indexOf(".") + 1;
    var numStr = s.substr(0, decimalLength + p);
    return Number(numStr);
  }

  //---------------------------------Initialize functions---------------------------------

  useEffect(() => {
    if (blockHeader?.blockNumber && _contract?.contract !== undefined)
      seeBeneficiary();
    if (blockHeader?.blockNumber && _contract?.contract !== undefined)
      seeBasePayment();
  }, [blockHeader?.blockNumber]);

  useEffect(() => {
    console.log("Beneficiary:", b);
    beneficiary !== null &&
      getTotalMultipliers(Object.values(beneficiary.Ok.multipliers));
    beneficiary !== null && console.log("Beneficiary BC:", beneficiary.Ok);
  }, [b, beneficiary]);

  return loading === "done" ? (
    <tr
      className={
        i % 2 === 0
          ? `flex gap-[50px] text-[14px] items-center h-11 px-2 font-normal text-black tracking-[0.25px] ${archivo.className}`
          : `flex gap-[50px] text-[14px] items-center h-11 px-2 bg-[#ECECEC] font-normal text-black tracking-[0.25px] ${archivo.className}`
      }
    >
      <td className="w-[150px]">
        <p>Name</p>
      </td>
      <td className="w-[150px]">
        <p>
          {b.slice(0, 5)}...
          {b.slice(b.length - 5, b.length)}
        </p>
      </td>
      {/* MULTIPLIERS.MAP */}
      {/* MULTIPLIERS.MAP */}
      <td className="w-[100px]">
        <p>
          {trunc(sumMultipiers * basePayment, 2)} {chainInfo?.tokenSymbol}
        </p>
      </td>
      <td className="w-[100px]">
        <Text type="" text="state" />
      </td>
      <td className="w-[100px]">
        <Text type="" text="state" />
      </td>
      <td className="w-[100px]">
        <Text type="" text="state" />
      </td>
      <td className="w-[100px]">
        <Text type="" text="state" />
      </td>
    </tr>
  ) : (
    <div className="flex items-center w-full">
      <AiOutlineLoading className="w-5 h-5 animate-spin mx-auto my-2" />
    </div>
  );
};

export default BeneficiarieRow;
