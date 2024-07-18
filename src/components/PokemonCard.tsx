import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
} from "reactstrap";
import { Pokemon } from "../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { name, image, type, base } = pokemon;

  return (
    <Card style={{ margin: "10px", width: "18rem" }}>
      <CardImg
        top
        width="100%"
        src={image}
        alt={name}
      />
      <CardBody className="text-center">
        <CardTitle tag="h5">
          <span id="name">{name}</span>
        </CardTitle>
        <CardText>
          <strong>Type:</strong> {type.join(", ")}
          <br />
          <strong>HP:</strong> {base.hp}
          <br />
          <strong>Attack:</strong> {base.attack} / {base.special_attack}
          <br />
          <strong>Defense:</strong> {base.defense} / {base.special_defense}
          <br />
          <strong>Speed:</strong> {base.speed}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default PokemonCard;
