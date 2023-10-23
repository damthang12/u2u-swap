import React, { useMemo, useState } from 'react';


interface Props {
    tokenName: string,
    tokenPrice: string,
    // value: string | undefined,

    // Ở đây onChange là từ input, mình chỉ cần lưu value change vào state của component, khi nào dùng đến (VD: click buy)
    // Thì mới gọi cái value từ state đấy ra. Nên ko nên viết xử lý onChange từ input thế này
    // onChange: (e: any) => void;
    
    // Mình ko cần cái params của click event nên hàm onClick chỉ cần define 1 cái function chung chung là đc
    // Cũng ko nên dùng reserved keywords (vd ở đây là onclick) để đặt tên, mình nên đặt tên hàm theo công dụng của nó
    // VD ở dưới onClick đổi thành onBuyToken
    // 'onBuyToken?: () => void' thay cho 'onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined'
    // Ở đây a sửa lại thêm chút, onBuyToken sẽ lấy value từ input form, mình sẽ lưu trong state của component
    onBuyToken?: (value: string) => void
    // onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    disabled?: boolean;
    // error: boolean;
}


// Props của component viết như thế này
export default function BuyTokens({ tokenName, tokenPrice, onBuyToken = () => {}, disabled = false }: Props) {
// export default function BuyTokens(props: Props) {

    // const {
    //     tokenName, value, tokenPrice, error,
    //     onClick = () => {
    //     },
    //     onChange,
    //     disabled = false,
    // } = props;

    // disabled là value có thể thay đổi nên phải dùng useMemo để update lại value nếu nó change. Viết như thế này thì nó chỉ nhận giá trị truyền vào lúc đầu thôi
    // Nếu value có update thì cái disabledClass nó ko update đâu
    // const disabledClass = disabled
    //     ? "bg-grey-version-3 hover:bg-grey-version-3 cursor-not-allowed text-[#BBBBBA] hover:text-[#BBBBBA]"
    //     : "";
    const disabledClass = useMemo(() => {
        return disabled
          ? "bg-grey-version-3 hover:bg-grey-version-3 cursor-not-allowed text-[#BBBBBA] hover:text-[#BBBBBA]"
          : "";
    }, [disabled])

    // Xử lý handle Input như này
    const [price, setPrice] = useState('')
    const handlePriceInput = (value: string) => setPrice(value)

    // Sau đó khi user click buy thì mới gọi hàm buy. Còn nếu e gọi hàm buy ngay trong onChange thì ko hợp lý.
    // Vì nếu user chưa type xong, VD: user muốn nhập số 1000, mà mới type số 1 em đã gọi hàm buy thì nó đã gửi tx lên metamask rồi
    // Xong nếu gõ tiếp số 0, thì mỗi 1 lần gõ thêm là lại gửi 1 tx.
    // Nên chỉ cần viết 1 hàm xử lý lúc user click buy
    const handleBuyToken = () => {
        onBuyToken(price)
    }

    // Xử lý error bằng useMemo dựa trên input value, chứ ko cần set state. Cái gì compute đc dựa trên value khác thì dùng useMemo
    // Hạn chế sử dụng setState nó sẽ render lại UI => nhiều lỗi có thể xảy ra
    const error = useMemo(() => {
        return !price.trim() || Number(price) <= 0
    }, [price])
    
    return (

        <div
            className="min-w-[500px] flex border rounded-xl bg-white shadow-xl">
            <div className="p-4 w-full">
                <div className=" flex justify-between pb-6">
                    <text className="font-bold">{tokenName}</text>
                </div>
                <div className="border rounded-xl shadow-inner bg-[#F3F3F3] p-4">
                    <div className="flex pb-2 justify-between">
                        <span>Token Price:</span>
                        <span> {tokenPrice}</span>
                    </div>
                    <div>
                        <div className="flex justify-between items-end">
                            <div className="">
                                <span>Token number:</span>
                            </div>

                            <div className="">
                                <label htmlFor="number"
                                       className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"></label>
                                <input type="text"
                                       className={`bg-[#F3F3F3] text-right  block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 ${error ? 'border-red-500' : ''}`}
                                       placeholder="0.0"
                                       id="number"
                                       name="number"
                                       onChange={(event) => handlePriceInput(event.target.value)}
                                       value={price}
                                       required
                                />
                                {error &&
                                    <div className="text-red-500 font-medium  pt-[5px] pl-[13px] text-sm">Please input
                                        amount.</div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-full mt-4">
                        <button type="submit"
                                className={`"border w-full font-bold rounded-lg py-[7px] px-4 hover:bg-[linear-gradient(73.28deg,#20b486,#035663)] text-white bg-[linear-gradient(90deg,#3c9,#035663)] cursor-pointer ${disabledClass} `}
                                onClick={handleBuyToken}
                                disabled={disabled}
                        >BUY
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}


