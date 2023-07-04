import { useState, useEffect } from 'react';

interface OPLogoProps {
  width: number | string;
  height: number | string;
  color?: 'oppurple' | 'oplightpurple' | 'opwhite' | undefined;
}

export const OPLogo = ({ width, height, color }: OPLogoProps) => {
  const [logoColor, setlogoColor] = useState<'#25064C' | '#7F7EFF' | '#F8F7FF' | undefined>(undefined);

  useEffect(() => {
    color === undefined && setlogoColor('#25064C');
    color === 'oppurple' && setlogoColor('#25064C');
    color === 'oplightpurple' && setlogoColor('#7F7EFF');
    color === 'opwhite' && setlogoColor('#F8F7FF');
  }, [color]);

  return (
    <svg width={width} height={height} viewBox="0 0 147 138" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M95.277 7.7905C95.277 3.78187 98.5271 0.532227 102.536 0.532227C103.899 0.532227 105.512 0.864986 106.591 1.10304C107.932 1.39866 109.547 1.80992 111.31 2.29887C114.845 3.27912 119.198 4.63244 123.544 6.1595C127.867 7.67798 132.336 9.42134 136.042 11.1962C137.888 12.0803 139.684 13.0382 141.228 14.0503C142.598 14.9481 144.485 16.3393 145.78 18.2809C148.004 21.6163 147.103 26.1227 143.767 28.3463C141.768 29.6785 135.053 35.464 129.371 42.2204C126.558 45.5662 124.31 48.7892 123.022 51.4998C121.843 53.9816 121.979 54.9329 121.962 54.9514C123.455 58.6083 121.745 62.8005 118.1 64.3626C114.415 65.9417 110.147 64.2349 108.568 60.5503C106.198 55.0212 108.014 49.2582 109.908 45.2718C111.955 40.9624 115.083 36.6549 118.259 32.8785C118.755 32.2879 119.261 31.7014 119.772 31.1209C94.4116 35.199 75.3521 46.8209 62.7033 60.3083C63.2516 60.4961 63.8002 60.6974 64.3491 60.9121C71.8576 63.8498 77.3378 70.4504 80.7961 77.4148C84.3125 84.4963 86.2419 92.9146 85.9729 100.917C85.706 108.855 83.213 117.274 76.8297 123.152C70.2239 129.234 60.824 131.353 49.4872 129.244C49.1592 129.183 48.8357 129.1 48.5192 128.994C35.6871 124.717 29.8854 113.25 29.6014 100.781C29.4644 94.7656 30.5572 88.3132 32.7646 81.7712C30.096 84.5259 27.5685 87.8782 25.2507 91.7753C18.501 103.124 14.5186 117.587 14.5185 130.274C14.5185 134.283 11.2684 137.532 7.25924 137.532C3.25005 137.532 -1.73074e-05 134.283 0 130.274C6.6201e-05 114.921 4.71526 97.902 12.7719 84.3556C20.1031 72.029 31.0732 61.2413 45.0475 58.8065C58.7613 40.4203 81.4246 23.9798 112.3 17.7259C110.555 17.1824 108.906 16.6966 107.43 16.2875C105.819 15.8408 104.471 15.5008 103.465 15.2789C102.627 15.0943 102.292 15.0532 102.293 15.0465C102.293 15.0465 102.301 15.0453 102.316 15.0455C98.4088 14.9292 95.277 11.7255 95.277 7.7905ZM52.9784 72.917C46.7317 82.9712 43.9422 92.8101 44.1162 100.45C44.2986 108.457 47.517 113.155 52.6665 115.066C60.5009 116.413 64.6905 114.595 66.9946 112.473C69.5719 110.1 71.2757 105.988 71.4625 100.43C71.6472 94.9366 70.2873 88.8952 67.7921 83.8703C65.2387 78.7282 61.9852 75.5756 59.0585 74.4305C56.9283 73.5971 54.9035 73.1141 52.9784 72.917Z"
        fill={logoColor}
      />
    </svg>
  );
};
