// Input Usuario

import {JSX} from "react";
import IBeeInput from "./IBeeInput";
import styles from './BeeInputIcones.module.css'; // Caso queira mudar o tamanho do input basta ir nesse arquivo e em input mudar o height
import cadeado from "/User.svg"

export default function BeeInputUsuario(props: IBeeInput): JSX.Element{
        const {label, placeholder,type} = props;
        return (
                <>
                <div className={styles.inputcontainer}>
                        <label  className={styles.label}>{label}</label> 
                        <img src={cadeado} className={styles.icones} alt="icone usuario"></img>
                        <input type={type} className={styles.input} placeholder={placeholder} />
                </div>
                </>

                
        );

}
