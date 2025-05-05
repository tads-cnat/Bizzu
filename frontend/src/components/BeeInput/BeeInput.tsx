import {JSX} from "react";
import IBeeInput from "./IBeeInput";

export default function BeeInput(props: IBeeInput): JSX.Element{
        const {label, placeholder, image, type} = props;
        return (
                <>
                <div className="input-container">
                        <label  className="label">{label}</label>
                        <input type={type} className="input" placeholder={placeholder} />

                </div>
                
                </>

                
        );

}
