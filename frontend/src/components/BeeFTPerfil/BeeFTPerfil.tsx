import {JSX} from "react";
import IBeeFTPerfil from "./IBeeFTPerfil";
import styles from './BeeFTPerfil.module.css';

export default function BeeFTPerfil(props: IBeeFTPerfil): JSX.Element{
        const {name,time,image} = props;
        return (
            <>
            <div className={styles.profileContainer}>
                <div className={styles.hexagon}>
                    <img src={image} alt="Imagem de usuário"></img>
                </div>
                <div className="user-info">
                    <span className={styles.name}>{name}</span>
                    <span className={styles.span}> • {time}h atrás </span>
                </div>
            </div>
            </>
        )

}