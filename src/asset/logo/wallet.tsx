import React from 'react';

type Props = {
    width?: number;
    height?: number;
};

const WalletIcon = ({width, height}: Props) => {
    return (
        <div>
            <svg className="fill: white" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="white"><path  d="M16 12h2v4h-2z"></path>
                <path d="M20 7V5c0-1.103-.897-2-2-2H5C3.346 3 2 4.346 2 6v12c0 2.201 1.794 3 3 3h15c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zM5 5h13v2H5a1.001 1.001 0 0 1 0-2zm15 14H5.012C4.55 18.988 4 18.805 4 18V8.815c.314.113.647.185 1 .185h15v10z"></path></svg>
        </div>
    );
};

export default WalletIcon;

