import type { FC } from "react";
import Button from "./Button";
import InputField from "./InputField";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const CreateParty: FC<Props> = ({isOpen,onClose}) => {
    if (!isOpen) return null;
    return(
        <div className="fixed z-50 inset-0 flex justify-center items-center bg-black bg-opacity-30 p-12 ">

            {/* card */}
            <div className=" bg-white flex flex-col w-10/12 md:w-1/2 justify-between opacity-100 rounded-md">

                {/* หัว */}
                <div className="w-full flex justify-center font-bold text-xl bg-red-600 rounded-md ">
                    <p className="text-white p-4 ">
                        Create Party
                    </p>
                </div>

                {/* form */}
                <div className="flex flex-col bg-white w-full p-10 ">
                    <form>
                        <InputField
                            id="partyname"
                            htmlFor="partyname"
                            name = "partyname"
                            type= "text"
                            placeholder="กรอกชื่อปาร์ตี้"
                       >
                        ชื่อปาร์ตี้
                        </InputField>
                        <InputField
                            id="partyname"
                            htmlFor="partyname"
                            name = "partyname"
                            type= "text"
                            placeholder="กรอกชื่อปาร์ตี้"
                       >
                        ชื่อปาร์ตี้
                        </InputField>
                        <InputField
                            id="partyname"
                            htmlFor="partyname"
                            name = "partyname"
                            type= "text"
                            placeholder="กรอกชื่อปาร์ตี้"
                       >
                        ชื่อปาร์ตี้
                        </InputField>
                   
                    </form>
                </div>
                <div className="flex w-full justify-evenly gap-6 mb-6">
                    <button onClick={onClose} className="text-gray-400" >cancle</button>
                    <Button size="lg" >create</Button>
                </div>
                
            </div>
        </div>
    )
}
export default CreateParty;