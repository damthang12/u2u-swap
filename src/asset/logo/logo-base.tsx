import React from 'react';

type Props = {
    width?: number;
    height?: number;
};

const LogoBase = ({width, height}: Props) => {
    return (
        <div>

            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width={width} height={height} viewBox="0 0 42 50" enableBackground="new 0 0 42 50" xmlSpace="preserve">  <image id="image0" width="42" height="50" x="0" y="0"
                                                                                                                                                                                                                                                         href="data:image/png;base64,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
OjA0KzAwOjAwSt1XEwAAAABJRU5ErkJggg==" />
</svg>


        </div>
    );
};

export default LogoBase;
