import React from "react";
import "./styles.scss";

export function PokemonBox(props) {
  const backgroundType = `box-container ${props.type}`;
  const type1 = `type-${props.type} type`;
  const type2 = `type-${props.type2} type`;

  return props.type2 === undefined ? (
    <div className={backgroundType}>
      <p>#0{props.id}</p>
      <strong>{props.name}</strong>
      <img src={props.image} alt={props.name} />
      <p className={type1}>{props.type}</p>
    </div>
  ) : (
    <div className={backgroundType}>
      <p>#0{props.id}</p>
      <strong>{props.name}</strong>
      <img src={props.image} alt={props.name} />
      <div className="aligner">
        <p className={type1}>{props.type}</p>
        <p className={type2}>{props.type2}</p>
      </div>
    </div>
  );
}
