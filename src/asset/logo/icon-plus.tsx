import React from 'react';

type Props = {
    width?: number;
    height?: number;
};

const Plus = ({width, height}: Props) => {
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>

        </div>
    );
};

export default Plus;
